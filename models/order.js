const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true }, // Snapshotted product name
    price: { type: Number, required: true }, // Snapshotted price at checkout
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const shippingAddressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    trackingNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);