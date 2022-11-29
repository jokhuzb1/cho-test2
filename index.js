const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

//ROUTES
const productRoute = require('./routes/products');
const userRoute = require('./routes/users');
const salesRoute = require('./routes/sales');

const validateConnection = (req, res, next) => {
  console.log("checking connection")
  console.log(mongoose.connection.readyState)
  if (mongoose.connection.readyState === 2 || mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    res.send('cannot establish connection to database').status(500);
    next()
  } else {
    console.log('redirecting')
    next()
  }
}

const auth = (req, res, next)=>{
  console.log("authorizing");
  next()
}
// APP CONFIGURATION
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors({origin:"*"}))
app.use(bodyParser.json());
app.use(express.json());
app.use('*', validateConnection);
app.use('*', auth);
app.use('/products', productRoute);
app.use('/users', userRoute);
app.use('/sales', salesRoute);
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000");
})



//DB CONFIGURE
// mongoose.connect(
//     "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=1000&appName=mongosh+1.6.0",
//    ()=>{
//     console.log("db connected")
//    }
//   );
console.log(mongoose.connection.readyState); //logs 0
mongoose.connection.on('connecting', () => {
  console.log('connecting')
  console.log(mongoose.connection.readyState); //logs 2
});
mongoose.connection.on('connected', () => {
  console.log('connected');
  console.log(mongoose.connection.readyState); //logs 1
});
mongoose.connection.on('disconnecting', () => {
  console.log('disconnecting');
  console.log(mongoose.connection.readyState); // logs 3
});
mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
  console.log(mongoose.connection.readyState); //logs 0
});

mongoose.connect('mongodb+srv://johan-admin:1234@cluster0.6jsq53g.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true // Boilerplate for Mongoose 5.x
}).catch(err => console.log('error happened'));
