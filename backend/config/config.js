import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./.env" });

// Constants
export const CONFIG = {
    // Server
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Razorpay
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    RAZORPAY_AMOUNT_MULTIPLIER: 100, // Razorpay expects amount in paise

    // CORS
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : ['http://localhost:5173', 'http://localhost:3000'],

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    RATE_LIMIT_MAX_REQUESTS: 100,
    PAYMENT_RATE_LIMIT_MAX: 10, // More restrictive for payment endpoints

    // Request Body
    MAX_REQUEST_SIZE: '10kb',

    // Test Mode
    TEST_MODE: process.env.TEST_MODE === 'true',

    // Shiprocket
    SHIPROCKET_EMAIL: process.env.SHIPROCKET_EMAIL,
    SHIPROCKET_PASSWORD: process.env.SHIPROCKET_PASSWORD,
};

// Validate required environment variables
export function validateEnvironment() {
    const requiredEnvVars = [
        'RAZORPAY_KEY_ID',
        'RAZORPAY_KEY_SECRET',
    ];

    if (CONFIG.TEST_MODE === false) {
        requiredEnvVars.push('SHIPROCKET_EMAIL', 'SHIPROCKET_PASSWORD');
    }

    const missingEnvVars = requiredEnvVars.filter(
        varName => !process.env[varName]
    );

    if (missingEnvVars.length > 0) {
        const message = `Missing required environment variables: ${missingEnvVars.join(', ')}`;
        console.error('❌ Environment validation failed:', message);
        console.error('💡 Please check your .env file and ensure all required variables are set.');
        throw new Error(message);
    }

    // Log successful validation (without sensitive data)
    if (CONFIG.NODE_ENV === 'development') {
        console.log('✅ Environment variables validated successfully');
        console.log('📋 Configuration loaded:');
        console.log(`   - Node Environment: ${CONFIG.NODE_ENV}`);
        console.log(`   - Port: ${CONFIG.PORT}`);
        console.log(`   - Test Mode: ${CONFIG.TEST_MODE}`);
        console.log(`   - Razorpay Key ID: ${CONFIG.RAZORPAY_KEY_ID ? '✓ Set' : '✗ Missing'}`);
        console.log(`   - Shiprocket: ${CONFIG.SHIPROCKET_EMAIL ? '✓ Configured' : (CONFIG.TEST_MODE ? '⚠ Mock Mode (Not Required)' : '✗ Missing')}`);
    }
}
