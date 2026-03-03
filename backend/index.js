require("dotenv").config();
const express = require ('express');
const pool = require('./db');
const bodyParser = require ('body-parser');
const loginRoutes = require("./login.routes");
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = 3000;
app.use( bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



app.get('/', (req, res) => {
    res.send('<h1>Express Js Api</h1>');
});
app.get('/menu', async (req, res) => {
    try {
        const result = await pool.query('select * from menu');
        res.json ({status:"200",menulist:result.rows});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

app.get('/menuById', async (req, res) => {
    try {
        const  {id} = req.body;
        const result = await pool.query('select * from menu where mid=$1',[id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
app.get('/food_group', async (req, res) => {
    try {
        const result = await pool.query('select * from food_group');
        res.json({status:"200",food_group:result.rows});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

app.get('/qtymast', async (req, res) => {
    try {
        const result = await pool.query('select * from qtymast');
        res.json({status:"200",qtymast:result.rows});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
app.delete(
    '/delmenu',
    [
        body('id')
            .notEmpty()
            .withMessage('id is required')

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.body;

            // Check if menu exists
            const rs = await pool.query('SELECT * FROM menu WHERE mid = $1', [id]);

            if (rs.rows.length > 0) {
                await pool.query('DELETE FROM menu WHERE mid = $1', [id]);
                return res.status(200).json({ status: 200, message: 'Delete successfully' });
            } else {
                return res.status(400).json({ status: 400, message: 'Delete failed - Id not found' });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
app.post('/addmenu', [
    body('menu_name').notEmpty().withMessage('menu_name is required'),
     body('menu_price').notEmpty().withMessage('menu_price is required'),
      body('gid').notEmpty().withMessage('gid is required'),
       body('qid').notEmpty().withMessage('qid is required'),
        body('mid').notEmpty().withMessage('mid is required')
],async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
        const  { menu_name,menu_price,gid,qid } = req.body;
         const result = await pool.query('insert into menu (menu_name,menu_price,gid,qid) values ($1,$2,$3,$4) RETURNING *',
             [menu_name,menu_price,gid,qid]);
              res.send('{status : "200 ",message:"add successfully"}');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
app.put('/updatemenu', [
    body('menu_name').notEmpty().withMessage('menu_name is required'),
    body('menu_price').notEmpty().withMessage('menu_price is required'),
    body('gid').notEmpty().withMessage('gid is required'),
    body('qid').notEmpty().withMessage('qid is required'),
    body('mid').notEmpty().withMessage('mid is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
        const { menu_name, menu_price, gid, qid, mid } = req.body;
        const rs = await pool.query('SELECT * FROM menu WHERE mid = $1', [mid]);
        if (rs.rows.length>0){
            await pool.query('UPDATE menu SET menu_name = $1, menu_price = $2, gid = $3, qid = $4 WHERE mid = $5',
                [menu_name, menu_price, gid, qid, mid]);
            return res.status(200).json({ status: 200, message: 'Update successfully' });
        } else {
            return res.status(404).json({ status: 404, message: 'Update Failed' });
        }
    }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



app.get('/food_groupById', async (req, res) => {
    try {
        const  {id} = req.body;
        const result = await pool.query('select * from food_group where gid=$1',[id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

app.delete("/delfood_group", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        status: "400",
        message: "ID is required",
      });
    }

    await pool.query(
      "DELETE FROM food_group WHERE gid = $1",
      [id]
    );
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
});


app.post(
  '/addfood_group',
  [
    body('gid')
      .notEmpty()
      .withMessage('gid is required'),
       body('group_name')
      .notEmpty()
      .withMessage('group_name is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      const { gid, group_name } = req.body;

      const result = await pool.query(
        'INSERT INTO food_group (gid, group_name) VALUES ($1,$2) RETURNING *',
        [gid, group_name]);
       //res.json(result.rows.length);
      return res.status(200).json({
        status: 200,
        message: 'food_group saved successfully',
        data: result.rows[0]
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        message: 'Server error'
      });
    }
  }
);


app.put('/updatefood_group', async (req, res) => {
    try {
        const  { group_name, gid } = req.body;
        const result = await pool.query(' UPDATE food_group SET group_name = $1 WHERE gid  = $2 RETURNING *',
             [group_name, gid]);
       // res.json(result.rows);
          res.send('{status : "200 ",message:"update successfully"}');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});






//-------------QTYMAST------------------------------------------------------------------------------------------------------------
app.get('/qtymastById', async (req, res) => {
    try {
        const {id} = req.body;
        const result = await pool.query('select * from qtymast where qid=$1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
app.post('/addqtymast',[
     body('qid').notEmpty().withMessage('qid is required'),
     body('quantity').notEmpty().withMessage('quantity is required')
],
    async (req, res) => {
    try {
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }else{
        const  { qid, quantity } = req.body;
        const result = await pool.query('insert into qtymast (qid, quantity) values ($1,$2) RETURNING *',
             [qid,quantity]);
         // res.json(result.rows.length);
         res.send('{status : "200 ",message:"add successfully"}');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
     }
});
app.put('/updateqtymast', async (req, res) => {
    try {
        const  { qid, quantity } = req.body;
       const result = await pool.query(
      'UPDATE qtymast SET quantity = $1 WHERE qid = $2 RETURNING *',
      [quantity, qid]);
       // res.json(result.rows);
          res.send('{status : "200 ",message:"update successfully"}');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
app.delete('/delqtymast', async (req, res) => {
    try {
        const  {id} = req.body;
        const result = await pool.query('delete from qtymast where qid=$1',[id]);
       // res.json(result.rows);
          res.send('{status : "200 ",message:"Delete successfully"}');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});








//---------------------------Validation---------------------------------------------------------------------------------------------------------
app.get('/menuId',
  // Validation middleware
  [
    body('id')
      .notEmpty().withMessage('ID is required')

  ],
  async (req, res) => {
    try{
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
        const { id } = req.body;
       
      const result = await pool.query('SELECT * FROM menu WHERE mid = $1', [id]);
        
      if(result.rows.length>0){
            res.json({Status:"200",message:"Success",data: result.rows});
      } else  { 
         res.send('{status : "400 ",message:"wrong id"}');

      }
    
    }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//------------Menu Crad-----------------------------------------------------------------------------------
app.get('/menucard', async (req, res) => {
    try {
        const result = await pool.query('select menu_name,menu_price,group_name,quantity from menu,food_group,qtymast where food_group.gid=menu.gid and menu.qid=qtymast.qid');
        res.json ({status:"200",menulist:result.rows});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

app.use("/auth", loginRoutes);

app.listen(PORT, () => {
   console.log('Example app listening on PORT ${http://localhost:3000}' )
})

