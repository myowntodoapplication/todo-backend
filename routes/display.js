const Router = require('express');
const router = Router();
const db = require('../database.js');



router.get('/getnotesuseridbased/:user_id', async (req, res) => {       
        
    const authHeader = req.header('Authorization');
    console.log(authHeader,"authheader")
    
    let query=`call todo.get_notes_userid_based(${req.params.user_id});`
    console.log(query)
    const result = await db.promise().query(query)
        .catch(err => {
            console.log(err);                        
        });
    if (result) {        
        res.status(200).send(JSON.stringify(result[0][0]));
    }
});



router.get('/deleteanote/:note_id', async (req, res) => {       
        
    let query=`call todo.deleteanote(${req.params.note_id});`
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

