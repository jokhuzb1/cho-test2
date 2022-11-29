const router  = require('express').Router()
const Products = require("../models/Products");
const {validateNewProductBody, validateId, updateValidation,validateSorts }= require('../middlewares/products');


//GETTING ALL PRODUCTS

router.get('/', async(req,res)=>{
    console.log('here')
   try{
    const products = await Products.find({})
    res.send(products);
    
   }catch(err){
    res.send("Something went wrong try again").status(500)
   }
});

// CREATE NEW PRODUCT

router.post('/',validateNewProductBody, async(req,res)=>{
    const date = new Date().getUTCDate()
    console.log(date);
    res.end()
    // try{
    //     const newProduct = await Products.create({...req.body, date:new Date().toISOString()});
    //     res.send(newProduct);
    // }catch(err){    
    //     res.send(err).status(400);
    // }
});

// DELETE BY ID

router.delete('/:id',validateId, async(req,res)=>{
   try{
    const id = req.params.id;
    await Products.findByIdAndRemove(id);
        res.send("Product is deleted").status(200).end()
   }catch(err){
    res.send("unexpected server error").status(200);
   }
});

//UPDATE SINGLE PRODUCT

router.put('/updateOne/:id',updateValidation, async(req,res)=>{
    const id = req.params.id;
    console.log(req.body)
    try{
        await Products.findOneAndUpdate({
            _id:id
        },req.body).exec((err, resolved)=>{
            if(err){
                console.log(err)
            }else{
                res.send("UPDATED").status(200)
            }
        })
    }catch(err){
        res.send('unexpected error occured').status(500);
    }
})

// SWAP SORTS

router.put('/swap',validateSorts, async(req, res)=>{
    const {fProduct, sProduct, newProduct} = req.body;
    const firstProduct = await Products.findById(fProduct.id).exec();
    const secondProduct = await Products.findById(sProduct.id).exec(); 
    
    
    const newSort = {
        articul:newProduct.articul,
        senderId:'custom',

    }
    
    res.status(200).send([secondProduct, firstProduct])
});


module.exports = router;