const Products = require('../models/Products');
const mongoose = require('mongoose');

//VALIDATING BODY PARAMAS FOR CREATING NEW PRODUCT
const validateNewProductBody = (req,res,next)=>{
    const body = req.body;
    if(body.articul && body.senderId && body.price && body.perBagWeight && body.bagQuantity && body.productType, body.articul){
        next()
    }else{
        res.status(400).send("invalid params").end()
    }
}

// VALIDATING ID FOR DELETING SINGLE PRODUCT
const validateId = async(req, res, next)=>{
    try{
        if(req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const result = await Products.findById({_id:id}).exec(); 
            if(result === null || undefined){
                res.send("Valid ID is required").status(400).end()
            }else{
                next()
            }     
        }else{
            res.send("products ID required").status(404).end()
        }
    }catch(err){
        res.status(300).end(`Cound not find product with ${req.params.id}`)
    }
}
// UPDATE PRODUCT

const updateValidation = (req,res, next)=>{
    if(req.body.articul && req.body.senderId && req.body.perBagWeight && req.body.bagQuantity && req.params.id &&  req.body.productType && req.body.articul){
        console.log('validating update fields')
        next()
    }else{
        res.status(400).send("all fields are expected").end()
    }
}
//VALIDATE REUQIRED PARAMS FOR SWAPPING SORTS
const validateSorts = (req, res, next)=>{
    const body = req.body;
    if(body.fProduct && body.sProduct && body.newProduct && body.fProduct.id && body.fProduct.amount && body.sProduct.id && body.sProduct.amount && body.newProduct.articul &&  body.productType){
        next()
    }else{
        res.send("fill all required params").status(400).end()
    }
}

module.exports = {validateNewProductBody, validateId, validateSorts,updateValidation}