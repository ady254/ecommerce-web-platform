
import { CONFIG } from '../config/config.js';
import { logger } from '../config/logger.js';

let authToken = null;
let tokenExpiry = null;

/**
 * Authenticate with Shiprocket API
 */
async function authenticate() {
    if (authToken && tokenExpiry && new Date() < tokenExpiry) {
        return authToken;
    }

    try {
        const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: CONFIG.SHIPROCKET_EMAIL,
                password: CONFIG.SHIPROCKET_PASSWORD
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Authentication failed');
        }

        authToken = data.token;
        // Token is usually valid for 10 days, but let's refresh every 24 hours to be safe
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 24);
        tokenExpiry = expiry;

        logger.info('Shiprocket authenticated successfully');
        return authToken;
    } catch (error) {
        logger.error('Shiprocket auth error:', error);
        throw error;
    }
}

/**
 * Create Order in Shiprocket
 */
export async function createOrder(orderData) {
    try {
        const token = await authenticate();

        // Map internal order structure to Shiprocket payload
        // Note: This mapping depends on your specific order object structure
        const payload = {
            order_id: orderData.order_id,
            order_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            pickup_location: "Primary", // You need to create this in Shiprocket dashboard
            billing_customer_name: orderData.billing_customer_name,
            billing_last_name: "",
            billing_address: orderData.billing_address,
            billing_city: orderData.billing_city,
            billing_pincode: orderData.billing_pincode,
            billing_state: orderData.billing_state,
            billing_country: "India",
            billing_email: orderData.billing_email,
            billing_phone: orderData.billing_phone,
            shipping_is_billing: true,
            order_items: orderData.order_items.map(item => ({
                name: item.name,
                sku: item.sku || "SKU-DEFAULT",
                units: item.units,
                selling_price: item.selling_price
            })),
            payment_method: "Prepaid",
            sub_total: orderData.sub_total,
            length: 10,
            breadth: 10,
            height: 10,
            weight: 0.5
        };

        const response = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // Check for Shiprocket specific error fields (they sometimes return 200 even with errors)
        if (!response.ok || (data.status_code && data.status_code !== 1)) {
            // 200 OK map be returned but data.status_code could catch issues
            // Actually Shiprocket usually returns 200 with status_code 1 for success.
            // If status_code is defined and not 1, it's an error.
            // Or if response.ok is false.
            const msg = data.message || (data.errors ? JSON.stringify(data.errors) : 'Shiprocket order creation failed');
            throw new Error(msg);
        }

        // data.shipment_id, data.awb_code might be available here or in a separate call?
        // Usually adhoc create returns shipment_id and order_id
        // Auto-assign AWB might be a setting. If not, we might need to call 'awb/assign'.
        // For now, let's return what we get.

        return {
            success: true,
            shipment_id: data.shipment_id,
            awb_code: data.awb_code || 'PENDING', // Might need to assign AWB separately
            order_id: data.order_id,
            raw: data
        };

    } catch (error) {
        logger.error('Shiprocket createOrder error:', error);
        throw error;
    }
}

/**
 * Track Shipment
 */
export async function trackShipment(awb) {
    try {
        const token = await authenticate();

        const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Tracking failed');
        }

        // Map response to our simple structure
        // Shiprocket response structure: 
        // { tracking_data: { track_status: 1, ... shipment_track_activities: [...] } }

        const trackingData = data.tracking_data;

        if (!trackingData) {
            throw new Error("No tracking data found");
        }

        return {
            awb: awb,
            current_status: trackingData.track_status === 1 ? 'Active' : 'Unknown', // This is simplified
            updated_on: new Date().toISOString(), // Or from data
            // Flatten activities
            status_history: (trackingData.shipment_track_activities || []).map(a => a.activity || a.status),
            raw: data
        };

    } catch (error) {
        logger.error('Shiprocket trackShipment error:', error);
        throw error;
    }
}
