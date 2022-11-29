const router = require('express').Router();
const Users = require('../models/Users');
const
    { validateNewUserParams, validateId }
        = require('../middlewares/users');


// getting all users
router.get("/", async (req, res) => {
    const allUsers = await Users.find()
    res.send(allUsers)
});


//CREATE NEW USER
router.post("/", validateNewUserParams, async (req, res) => {
    try {
        const newUser = await Users.create(req.body);
        res.send(newUser)
    } catch (err) {
        res.send("Unexpected error occured, try again").status(500);
    }
});


// DELETE BY ID
router.delete("/delete/:id", validateId, async(req, res) => {
    try{
        await Users.findOneAndDelete(req.params.id)
        res.send("user is deleted")
    }catch(err){
        res.send(404)
    }
});

// UPDATE A USER
router.put('/updateOne/:id', async(req,res)=>{
    console.log(req.body)
    try{
        const id = req.params.id
        const updatedUser = await Users.findByIdAndUpdate(id, req.body).exec((err, resolved)=>{
            if(err){
                console.log(err)
            }else{
                res.send(updatedUser).status(200)
            }
        })
    }catch(err){
        res.send(err)
    }
})
module.exports = router;