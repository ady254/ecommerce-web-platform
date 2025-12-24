import { CONFIG } from './config.js';

/**
 * Simple logger utility that respects environment settings
 */
class Logger {
    constructor(env = 'production') {
        this.env = env;
        this.isDevelopment = env === 'development';
    }

    info(message, ...args) {
        console.log(`ℹ️  ${message}`, ...args);
    }

    error(message, error) {
        console.error(`❌ ${message}`);
        if (error) {
            if (this.isDevelopment) {
                console.error(error);
            } else {
                // In production, log error message but not full stack trace to console
                console.error('Error:', error.message);
            }
        }
    }

    warn(message, ...args) {
        console.warn(`⚠️  ${message}`, ...args);
    }

    debug(message, ...args) {
        if (this.isDevelopment) {
            console.log(`🔍 DEBUG: ${message}`, ...args);
        }
    }

    success(message, ...args) {
        console.log(`✅ ${message}`, ...args);
    }
}

// Export singleton instance
export const logger = new Logger(CONFIG.NODE_ENV);
