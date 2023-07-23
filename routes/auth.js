const Router = require('express');
const router = Router();
const db = require('../database.js');
const jwt = require('jsonwebtoken');
const {SECRETKEY}=require("../Configuration/config");

router.post('/login',async(req,res)=>{

    const {email,password}=req.body;    
    let query=`call todo.login_check('${email}','${password}')`;

    db.query(query, (error, result) => {
        if (error) {
            console.log(error)
        }
        else
         {
            const usr=result[0][0]
            const token = jwt.sign({ user: usr },SECRETKEY);
            // console.log(usr)
            // console.log(token,"token")
            res.send([result,token])
        }
    })
});



module.exports = router;
