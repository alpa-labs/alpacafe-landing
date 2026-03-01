const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export type RateLimitResult =
  | { allowed: true; remaining: number; resetAt: Date }
  | { allowed: false; remaining: 0; resetAt: Date; error: string };

/**
 * Extracts client IP from request headers (e.g. behind a proxy).
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  if (first) return first;
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

function formatWaitMessage(resetAt: Date): string {
  const minutes = Math.ceil((resetAt.getTime() - Date.now()) / 60000);
  return `Demasiados intentos. Esperá ${minutes} minuto${minutes > 1 ? 's' : ''} antes de intentar nuevamente.`;
}

export function checkRateLimit(
  identifier: string,
  limit = 3,
  windowMs = 60000,
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (record && now > record.resetTime) {
    rateLimitMap.delete(identifier);
  }

  const current = rateLimitMap.get(identifier) || {
    count: 0,
    resetTime: now + windowMs,
  };

  if (current.count >= limit) {
    const resetAt = new Date(current.resetTime);
    return {
      allowed: false,
      remaining: 0,
      resetAt,
      error: formatWaitMessage(resetAt),
    };
  }

  current.count++;
  rateLimitMap.set(identifier, current);

  return {
    allowed: true,
    remaining: limit - current.count,
    resetAt: new Date(current.resetTime),
  };
}

/**
 * Rate limit by client IP from request headers. Returns a result with a ready-to-use
 * error message when not allowed.
 */
export function checkRateLimitFromHeaders(
  headers: Headers,
  limit = 3,
  windowMs = 60000,
): RateLimitResult {
  const clientIp = getClientIp(headers);
  return checkRateLimit(clientIp, limit, windowMs);
}
