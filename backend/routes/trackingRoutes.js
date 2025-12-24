import express from "express";
import { trackShipment } from "../services/shiprocket.js";
import { getMockTrackingStatus } from "../services/mockShiprocket.js";
import { CONFIG } from "../config/config.js";
import { logger } from "../config/logger.js";

const router = express.Router();

/**
 * Validate AWB code format
 */
function validateAwbCode(awb) {
  // AWB should be non-empty string
  return awb && typeof awb === 'string' && awb.trim().length > 0;
}

/**
 * GET /api/tracking/:awb
 * Get tracking status for an AWB code
 */
router.get("/:awb", async (req, res) => {
  const { awb } = req.params;

  // Validate AWB code
  if (!validateAwbCode(awb)) {
    return res.status(400).json({
      success: false,
      error: 'Valid AWB code is required'
    });
  }

  // Test mode: return mock tracking data
  if (CONFIG.TEST_MODE) {
    logger.debug('Mock tracking requested', { awb });
    return res.json(getMockTrackingStatus(awb));
  }

  // Real mode: Shiprocket tracking
  try {
    const data = await trackShipment(awb);
    return res.json(data);
  } catch (err) {
    logger.error('Tracking failed:', err);
    return res.status(500).json({
      success: false,
      error: 'Tracking failed',
      message: err.message
    });
  }
});

export default router;
