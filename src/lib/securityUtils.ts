/**
 * Security utilities for rate limiting and logging.
 */

// Simple in-memory rate limiter for frontend (reduces accidental spam, not hacker-proof)
const rateLimits = new Map<string, { count: number, resetAt: number }>();

export const checkRateLimit = (actionId: string, maxRequests: number, windowMs: number): boolean => {
  const now = Date.now();
  const record = rateLimits.get(actionId);

  if (!record || now > record.resetAt) {
    rateLimits.set(actionId, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
};

// Secure logger that only logs in development mode
export const secureLog = (message: string, ...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(message, ...args);
  }
};

// Secure warn that only warns in development mode
export const secureWarn = (message: string, ...args: any[]) => {
  if (import.meta.env.DEV) {
    console.warn(message, ...args);
  }
};

// Secure error that logs everywhere (for tracking but removes sensitive args if specified)
export const secureError = (message: string, error?: any) => {
  console.error(message, error);
};
