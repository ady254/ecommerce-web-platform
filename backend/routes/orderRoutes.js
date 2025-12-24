import express from "express";
import { createMockOrder } from "../services/mockShiprocket.js";
import { createOrder } from "../services/shiprocket.js";
import { CONFIG } from "../config/config.js";
import { logger } from "../config/logger.js";

const router = express.Router();

/**
 * Validation helpers
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  // Indian phone number: 10 digits
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function validatePincode(pincode) {
  // Indian pincode: 6 digits
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
}

function validateOrderInput(data) {
  const errors = [];
  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    productName,
    productPrice,
    quantity
  } = data;

  // Required fields validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Valid name is required');
  }

  if (!email || typeof email !== 'string' || !validateEmail(email)) {
    errors.push('Valid email address is required');
  }

  if (!phone || typeof phone !== 'string' || !validatePhone(phone)) {
    errors.push('Valid 10-digit phone number is required (must start with 6-9)');
  }

  if (!address || typeof address !== 'string' || address.trim().length === 0) {
    errors.push('Valid address is required');
  }

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    errors.push('Valid city is required');
  }

  if (!state || typeof state !== 'string' || state.trim().length === 0) {
    errors.push('Valid state is required');
  }

  if (!pincode || typeof pincode !== 'string' || !validatePincode(pincode)) {
    errors.push('Valid 6-digit pincode is required');
  }

  if (!productName || typeof productName !== 'string' || productName.trim().length === 0) {
    errors.push('Valid product name is required');
  }

  if (!productPrice || typeof productPrice !== 'number' || productPrice <= 0) {
    errors.push('Product price must be a positive number');
  }

  if (!quantity || typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
    errors.push('Quantity must be a positive integer');
  }

  return errors;
}

/**
 * POST /api/order/create
 * Create a new order
 */
router.post("/create", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      productName,
      productPrice,
      quantity
    } = req.body;

    // Validate input
    const validationErrors = validateOrderInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }

    const orderData = {
      order_id: "ORD-" + Date.now(),
      billing_customer_name: name.trim(),
      billing_email: email.trim().toLowerCase(),
      billing_phone: phone.trim(),
      billing_address: address.trim(),
      billing_city: city.trim(),
      billing_state: state.trim(),
      billing_pincode: pincode.trim(),
      billing_country: "India",
      order_items: [
        {
          name: productName.trim(),
          units: quantity,
          selling_price: productPrice
        }
      ],
      sub_total: productPrice * quantity
    };

    // Test mode: return mock shipping data
    if (CONFIG.TEST_MODE) {
      const mockResponse = createMockOrder(orderData);
      logger.debug('Mock order created', { orderId: orderData.order_id });
      return res.json(mockResponse);
    }

    // Real mode: Shiprocket integration
    try {
      logger.info('Creating Shiprocket order', { orderId: orderData.order_id });
      const shiprocketResponse = await createOrder(orderData);

      return res.json({
        success: true,
        message: 'Order created successfully and pushed to Shiprocket',
        order_id: orderData.order_id, // Our ID
        shiprocket_order_id: shiprocketResponse.order_id,
        shipment_id: shiprocketResponse.shipment_id,
        awb_code: shiprocketResponse.awb_code
      });
    } catch (srError) {
      logger.error('Shiprocket order creation failed', srError);
      // Fallback: We might want to save the order locally anyway and flag it for manual retry.
      // For now, since we don't have a DB, just return error or success with warning?
      // User wants to see it in Shiprocket. If it fails, we should tell them.
      return res.status(502).json({
        success: false,
        error: 'Order created locally but Shiprocket push failed',
        details: srError.message
      });
    }

  } catch (err) {
    logger.error('Order creation failed:', err);
    res.status(500).json({
      success: false,
      error: 'Order creation failed',
      message: CONFIG.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;
