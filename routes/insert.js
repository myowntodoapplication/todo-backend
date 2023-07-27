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


router.post('/update',async(req,res)=>{

    const {user_id,subject,detail,date,note_id}=req.body;    
    console.log(user_id,subject,detail,date,note_id);
    
    let query=`call update_note(${user_id},'${subject}','${detail}','${date}',${note_id})`;

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

router.get('/getNoteDataBasedOnId/:note_id', async (req, res) => {               
    let query=`call todo.getNoteDataBasedOnId(${req.params.note_id});`
    console.log(query)
    const result = await db.promise().query(query)
        .catch(err => {
            console.log(err);                        
        });
    if (result) {        
        res.status(200).send(JSON.stringify(result[0]));
    }
});

module.exports = router;

