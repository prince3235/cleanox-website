/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * NOTE: this only works within a single server process. Production
 * multi-instance deployments should swap this for a shared store
 * (e.g. Redis) so limits are enforced consistently across instances.
 */
const hits = new Map<string, number[]>();

/**
 * Returns true when `key` has exceeded `limit` events within `windowMs`.
 * Records the current event when the limit has NOT been exceeded.
 */
export function isRateLimited(
  key: string,
  limit = 5,
  windowMs = 60 * 60 * 1000,
): boolean {
  const now = Date.now();

  // Prune expired entries so the Map does not grow unbounded.
  for (const [k, timestamps] of hits) {
    const fresh = timestamps.filter((t) => now - t < windowMs);
    if (fresh.length === 0) hits.delete(k);
    else hits.set(k, fresh);
  }

  const current = hits.get(key) ?? [];
  if (current.length >= limit) return true;

  current.push(now);
  hits.set(key, current);
  return false;
}
