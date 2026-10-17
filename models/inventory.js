const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5, // Triggers low-stock alerts
    },
  },
  { timestamps: true }
);

// Virtual field to calculate total stock (available + reserved)
inventorySchema.virtual('totalStock').get(function () {
  return this.availableQuantity + this.reservedQuantity;
});

module.exports = mongoose.model('Inventory', inventorySchema);