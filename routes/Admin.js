const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Cart = require("../models/Cart");
const Order = require('../models/Order');
const router = express.Router();


const checkAdmin=(req, res, next)=> {
    if (!req.session.user_id) {
      res.send('You are not authorized to view this page');
    } else {
        User.findOne({_id: req.session.user_id}, (err, user) => {
            if(user.isAdmin){
                next();
            }else{
                res.send('You are not authorized to view this page');
            }
        });
     
    }
  }


const checkDeliveryGuy=(req, res, next)=> {
    if (!req.session.user_id) {
      res.send('You are not authorized to view this page');
    } else {
        User.findOne({_id: req.session.user_id}, (err, user) => {
            if(user.isDeliveryGuy){
                next();
            }else{
                res.send('You are not authorized to view this page');
            }
        });
     
    }
  }

  const deliveryGuys={
      guy1:"",
      guy2:""
  };

router.post('/assignorder', async (req, res) => {
    const order = req.body._id;
    const deliveryGuy=req.body.deliveryGuy;
    deliveryGuys[deliveryGuy]=order;
    await Order.findOneAndUpdate({_id:order},{status:"Shipped"},{returnOriginal:false});
    res.send(order);
});

router.post('/deliverorder', async (req, res) => {
    const order = req.body._id;
    await Order.findOneAndUpdate({_id:order},{status:"Delivered"},{returnOriginal:false});
    res.send(order);
});

module.exports = router;