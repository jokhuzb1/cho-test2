const mongoose = require("mongoose");


const saleSchema = new mongoose.Schema({
   productId: {
      type: String,
      required: true
   },
   articul:{
      type:String,
      required:true
   },
   customerId: {
      type: String,
      required: true
   },
   bagQuantity: {
      type: Number,
      required: true
   },
   bagPrice: {
      type: Number,
      required: true
   },
   perBagWeight: {
      type: Number,
      required: true
   },
   totalPrice: {
      type: Number,
      required: true
   },
   totalPaid: {
      type: Number,
      required: true
   },
   remainingAmount: {
      type: Number,
      required: true
   },
   isPaymentComplete: {
      type: Boolean,
      required: true
   },
   soldAt:{
      required:true,
      type:Number
   },
   date:Date
}, { timestamps: true })

module.exports = mongoose.model("Sale", saleSchema);
