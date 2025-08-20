// Security utilities for Firebase Functions

// Rate limiting configuration
const rateLimitConfig = {
  maxRequests: 10, // Max requests per minute
  windowMs: 60 * 1000 // 1 minute window
};

// IP-based rate limiting storage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting middleware for Cloud Functions
 */
export function rateLimit(request: any): boolean {
  const ip = request.ip || 'unknown';
  const now = Date.now();
  
  // Clean up expired entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
  
  // Check current IP
  const current = rateLimitStore.get(ip);
  
  if (!current) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + rateLimitConfig.windowMs
    });
    return true;
  }
  
  if (now > current.resetTime) {
    // Reset window
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + rateLimitConfig.windowMs
    });
    return true;
  }
  
  if (current.count >= rateLimitConfig.maxRequests) {
    return false; // Rate limit exceeded
  }
  
  current.count++;
  return true;
}

/**
 * Validate and sanitize email addresses
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
}

/**
 * Validate and sanitize phone numbers
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
}

/**
 * Validate ZIP codes
 */
export function validateZipCode(zipCode: string): boolean {
  if (!zipCode || typeof zipCode !== 'string') return false;
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode.trim());
}

/**
 * Sanitize string input to prevent XSS and injection attacks
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 500); // Limit length
}

/**
 * Sanitize object data recursively
 */
export function sanitizeObject(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => 
      typeof item === 'string' ? sanitizeString(item) : sanitizeObject(item)
    );
  }
  
  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Security headers for HTTP functions
 */
export function setSecurityHeaders(response: any): void {
  response.set('X-Content-Type-Options', 'nosniff');
  response.set('X-Frame-Options', 'DENY');
  response.set('X-XSS-Protection', '1; mode=block');
  response.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.set('Content-Security-Policy', "default-src 'self'");
}

/**
 * Log security events
 */
export function logSecurityEvent(event: string, details: any): void {
  console.log(`[SECURITY] ${event}`, {
    timestamp: new Date().toISOString(),
    ...details
  });
  
  // You can extend this to send alerts to monitoring services
}

/**
 * Check for suspicious patterns in form submissions
 */
export function detectSuspiciousActivity(data: any, context: any): boolean {
  const suspicious = [
    // Check for common spam patterns
    data.name && data.name.toLowerCase().includes('test'),
    data.email && data.email.includes('temp'),
    data.message && data.message.length > 5000,
    // Check for too many submissions from same IP
    // (This would require more sophisticated tracking)
  ];
  
  const isSuspicious = suspicious.some(Boolean);
  
  if (isSuspicious) {
    logSecurityEvent('SUSPICIOUS_ACTIVITY_DETECTED', {
      ip: context.rawRequest?.ip,
      userAgent: context.rawRequest?.headers?.['user-agent'],
      data: data
    });
  }
  
  return isSuspicious;
}

/**
 * Validate required fields for lead submissions
 */
export function validateLeadData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required fields validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Valid name is required');
  }
  
  if (!validateEmail(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.phone || !validatePhone(data.phone)) {
    errors.push('Valid phone number is required');
  }
  
  if (data.zipCode && !validateZipCode(data.zipCode)) {
    errors.push('Valid ZIP code is required');
  }
  
  // Business logic validation
  if (data.clientType && !['individual', 'family', 'business', 'agent'].includes(data.clientType)) {
    errors.push('Invalid client type');
  }
  
  if (data.insuranceTypes && (!Array.isArray(data.insuranceTypes) || data.insuranceTypes.length === 0)) {
    errors.push('At least one insurance type must be selected');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
