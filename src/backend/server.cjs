const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: "rzp_test_Sa99sguOTJUBhD",
  key_secret: "31hoQIecGB7Dj5rpcA3g4bHX",
});

// ✅ CREATE ORDER
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    res.json(order);
  } catch (err) {
    res.status(500).send("Error");
  }
});

// ✅ VERIFY PAYMENT
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "31hoQIecGB7Dj5rpcA3g4bHX") // secret
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});