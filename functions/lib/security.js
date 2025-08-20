"use strict";
// Security utilities for Firebase Functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLeadData = exports.detectSuspiciousActivity = exports.logSecurityEvent = exports.setSecurityHeaders = exports.sanitizeObject = exports.sanitizeString = exports.validateZipCode = exports.validatePhone = exports.validateEmail = exports.rateLimit = void 0;
// Rate limiting configuration
const rateLimitConfig = {
    maxRequests: 100,
    windowMs: 60 * 1000 // 1 minute window
};
// IP-based rate limiting storage
const rateLimitStore = new Map();
/**
 * Rate limiting middleware for Cloud Functions
 */
function rateLimit(request) {
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
exports.rateLimit = rateLimit;
/**
 * Validate and sanitize email addresses
 */
function validateEmail(email) {
    if (!email || typeof email !== 'string')
        return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim().toLowerCase());
}
exports.validateEmail = validateEmail;
/**
 * Validate and sanitize phone numbers
 */
function validatePhone(phone) {
    if (!phone || typeof phone !== 'string')
        return false;
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
}
exports.validatePhone = validatePhone;
/**
 * Validate ZIP codes
 */
function validateZipCode(zipCode) {
    if (!zipCode || typeof zipCode !== 'string')
        return false;
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode.trim());
}
exports.validateZipCode = validateZipCode;
/**
 * Sanitize string input to prevent XSS and injection attacks
 */
function sanitizeString(input) {
    if (typeof input !== 'string')
        return '';
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/['"]/g, '') // Remove quotes
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .substring(0, 500); // Limit length
}
exports.sanitizeString = sanitizeString;
/**
 * Sanitize object data recursively
 */
function sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => typeof item === 'string' ? sanitizeString(item) : sanitizeObject(item));
    }
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            sanitized[key] = sanitizeString(value);
        }
        else if (typeof value === 'object') {
            sanitized[key] = sanitizeObject(value);
        }
        else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}
exports.sanitizeObject = sanitizeObject;
/**
 * Security headers for HTTP functions
 */
function setSecurityHeaders(response) {
    response.set('X-Content-Type-Options', 'nosniff');
    response.set('X-Frame-Options', 'DENY');
    response.set('X-XSS-Protection', '1; mode=block');
    response.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.set('Content-Security-Policy', "default-src 'self'");
}
exports.setSecurityHeaders = setSecurityHeaders;
/**
 * Log security events
 */
function logSecurityEvent(event, details) {
    console.log(`[SECURITY] ${event}`, {
        timestamp: new Date().toISOString(),
        ...details
    });
    // You can extend this to send alerts to monitoring services
}
exports.logSecurityEvent = logSecurityEvent;
/**
 * Check for suspicious patterns in form submissions
 */
function detectSuspiciousActivity(data, context) {
    var _a, _b, _c;
    const suspicious = [
        // Check for obvious spam patterns (more lenient for testing)
        data.name && data.name.toLowerCase().match(/^test[0-9]*$/),
        data.email && data.email.match(/^temp[0-9]*@/),
        data.message && data.message.length > 10000,
        data.name && data.name.toLowerCase().includes('spam'),
        data.email && data.email.toLowerCase().includes('spam'),
        // Block obviously fake emails
        data.email && data.email.match(/^(test|fake|spam|dummy)@(test|fake|spam|dummy)\.(com|org|net)$/i),
    ];
    const isSuspicious = suspicious.some(Boolean);
    if (isSuspicious) {
        logSecurityEvent('SUSPICIOUS_ACTIVITY_DETECTED', {
            ip: (_a = context.rawRequest) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_c = (_b = context.rawRequest) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c['user-agent'],
            data: data
        });
    }
    return isSuspicious;
}
exports.detectSuspiciousActivity = detectSuspiciousActivity;
/**
 * Validate required fields for lead submissions
 */
function validateLeadData(data) {
    const errors = [];
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
    // Make zipCode validation more flexible - only validate if provided
    if (data.zipCode && data.zipCode.trim() && !validateZipCode(data.zipCode)) {
        errors.push('Valid ZIP code format required');
    }
    // Business logic validation - make these more flexible
    if (data.clientType && !['individual', 'family', 'business', 'agent'].includes(data.clientType)) {
        errors.push('Invalid client type');
    }
    // Make insurance types optional for contact forms, required for insurance forms
    if (data.insuranceTypes !== undefined) {
        if (!Array.isArray(data.insuranceTypes) || data.insuranceTypes.length === 0) {
            errors.push('At least one insurance type must be selected');
        }
    }
    return {
        valid: errors.length === 0,
        errors
    };
}
exports.validateLeadData = validateLeadData;
//# sourceMappingURL=security.js.map