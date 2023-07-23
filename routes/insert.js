const Router = require('express');
const router = Router();
const db = require('../database.js');


router.post('/insert',async(req,res)=>{

    const {user_id,subject,detail,date}=req.body;    
    console.log(user_id,subject,detail,date);
    
    let query=`call insert_note(${user_id},'${subject}','${detail}','${date}')`;

    db.query(query, (error, result) => {
        if (error) {
            console.log(error)
        }
        else
         {
            console.log(result)
            res.send(result)
        }
    })
});

module.exports = router;

