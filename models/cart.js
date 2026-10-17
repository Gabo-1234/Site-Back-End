const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      default: 1,
    },
    priceAtAddition: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.pre('save', function (next) {
  this.totalAmount = this.items.reduce(
    (acc, item) => acc + item.priceAtAddition * item.quantity,
    0
  );
  next();
});

module.exports = mongoose.model('Cart', cartSchema);