const router = require("express").Router();
const Sales = require('../models/Sales');
const Users = require('../models/Users');

// GET ALL SALES
router.get('/', async (req, res) => {
    try {
        const allSales = await Sales.find()
        res.send(allSales)
    } catch (err) {
        res.send("Unexpedted error occured, please try again").status(500);
    }
})

// FIND BY ID
router.get("/findOne/:id", async (req, res) => {
    try{
        const id  = req.params.id;
        await Sales.find({_id:id}).exec((err,resolved)=>{
            if(err){
                res.send(err.mesasge).status(400)
            }else{
                res.send(resolved).status(200)
            }
        })
    }catch(err){
        res.send(err.message);
    }
});

//DELETE A SALE
router.delete('/deleteOne/:id', async(req, res) => {
  try{
    const id = req.params.id;
    await Sales.findByIdAndDelete(id).exec()
    res.send("product is deleted")
  }catch(err){
    res.send("cant delete a sale")
  }

})

//UPDATE A SALE
router.put('/updateSale/:id', async(req, res) => {
    try{
        const id = req.params.id;
         await Sales.findByIdAndUpdate(id, req.body).exec((err,sale)=>{
            if(err){
                res.send(err.message)
            }else{
                res.send(sale)
            }
        })
    }catch(err){
        res.send(err.message)
    }
})

//CREATE NEW SALE
router.post('/', async (req, res) => {
    try {
        const { productId, customerId, bagQuantity, bagPrice, perBagWeight, totalPaid, articul, soldAt } = req.body;
        const totalPrice = bagQuantity * bagPrice;
        const remainingAmount = totalPrice - totalPaid;
        const isPaymentComplete = remainingAmount > 0 ? false : true;

        const newSale = await Sales.create({
            productId, customerId, bagQuantity,
            bagPrice, perBagWeight,
            totalPaid,
            totalPrice,
            remainingAmount,
            isPaymentComplete,
            articul,
            soldAt,
            date:new Date(
                
            ).toISOString()
        })

        res.send(newSale)
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ADD NEW PAYMENT
router.put('/addNewPayment/:id', async(req,res)=>{
    
    try{
        const id = req.params.id;
        const {newAmount }= req.body;
        const prevSale = await Sales.find({_id:id})
        const {totalPrice, totalPaid,  remainingAmount} = prevSale[0];

        const newTotalPaid = totalPaid + newAmount;
        const newRemainingAmount = totalPrice - newTotalPaid;

        const updatedSale = await Sales.findByIdAndUpdate(id, {$set:{totalPaid:newTotalPaid, remainingAmount:newRemainingAmount, isPaymentComplete:newRemainingAmount > 0 ? false:true}}).exec((err, resolved)=>{
            if(err){
                console.log(err)
            }else{
                res.send(updatedSale).status(200)
            }
        })
    }catch(err){
        res.send(err.message)
    }
});

// FIND BY DATE

router.get("/dateBy", async(req,res)=>{
    const startDate = new Date('2022-11-13').toISOString()
    const endDate = new Date('2022-11-19').toISOString()
    await Sales.find({date:{$gte:startDate, $lte:endDate}}).exec((err,resolved)=>{
        if(err){res.send(err.message)}else{
            res.send(resolved)
        }
    })
})
module.exports = router;
