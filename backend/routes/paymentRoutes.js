import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import { CONFIG } from "../config/config.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: CONFIG.RAZORPAY_KEY_ID,
  key_secret: CONFIG.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // RUPEES → PAISE
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    res.json({ ...order, key: CONFIG.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// VERIFY PAYMENT
router.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", CONFIG.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
