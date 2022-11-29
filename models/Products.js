const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    articul: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
    },
    perBagWeight: {
        type: Number,
        required: true
    },
    bagQuantity: {
        type: Number,
        requried: true
    },
    productType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        rqeuired: true
    },
    packageType:{
        type:String,
        required:true
    },
    date:{
        require:true,
        type:Date
    }
},{timestamp:true})

module.exports = mongoose.model("Product", productSchema);