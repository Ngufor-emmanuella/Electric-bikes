const submissions = new Map<string, { count: number; firstRequest: number }>();

const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour per IP

export function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const record = submissions.get(ip);

  if (!record) {
    submissions.set(ip, { count: 1, firstRequest: now });
    return { allowed: true };
  }

  if (now - record.firstRequest > WINDOW_MS) {
    submissions.set(ip, { count: 1, firstRequest: now });
    return { allowed: true };
  }

  if (record.count >= LIMIT) {
    return { allowed: false };
  }

  record.count += 1;
  return { allowed: true };
}
