// app.js
const express = require('express');
const morgan = require('morgan')
const cors=require('cors');
const cookieParser=require('cookie-parser');





const bodyParser = require('body-parser');
const tableRoutes = require('./routes/tableRoutes.js');
const accounttblRoutes = require('./routes/accounttblRoutes.js');
const buisnesstblRoutes = require('./routes/buisnesstblRoutes.js');
const usertblRoutes = require('./routes/userRoutes.js');
const relationTblRoutes = require('./routes/relationalRoutes.js');
const itemTblRoutes = require('./routes/itemtblRoutes.js');
const roznamchaTblRoutes = require('./routes/roznamchaRoutes.js');
const vehicleTblRoutes = require('./routes/vechicleRoutes.js');
const vehicleINRoutes = require('./routes/vehicleinRoutes.js');
const vehicleOutRoutes = require('./routes/vehicleoutRoutes.js');
const reportsRoutes = require('./routes/reportsRoutes.js');

const maxId = require('./routes/getId.js');
const db = require('../src/config/database.js');

const app = express();
// Increased limit for JSON requests (ensure no conflicts)
app.use(bodyParser.json({ limit: '50mb' }));

// Remove or disable any potentially conflicting middleware here

// Standard URL-encoded form parsing (if needed)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Routes
app.use(cors(
  {
    origin:['http://localhost:5173'],
    methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials:true
  }
))
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify all the methods you want to allow
//   credentials: true
// }));
app.use(morgan('tiny'));
app.use(cookieParser());
// Increase payload size limit (e.g., 10MB)

app.use('/table', tableRoutes);
app.use('/account', accounttblRoutes);
app.use('/buisness', buisnesstblRoutes);
app.use('/user', usertblRoutes);
app.use('/relation', relationTblRoutes);
app.use('/item', itemTblRoutes);
app.use('/roznamcha', roznamchaTblRoutes);
app.use('/vehicles', vehicleTblRoutes);
app.use('/vehicleIn', vehicleINRoutes);
app.use('/vehicleOut', vehicleOutRoutes);
app.use('/reports', reportsRoutes);
app.use('/getId', maxId);


app.get('/:table',async (req,res)=>{
    const tableName = req.params.table;
    try {
        let query = 'SELECT * FROM ' + tableName;
      const [rows] = await db.execute(query);
      res.json(rows);
    } catch (err) {
      console.error(`Error fetching data from table ${tableName}:`, err);
      res.status(500).json({ error: `Error fetching data from table ${tableName}` });
    }


})




// app.get('/:table',async (req,res)=>{
//     const tableName = req.params.table;
//     try {
//         let query = 'SELECT * FROM ' + tableName;
//       const [rows] = await db.execute(query);
//       res.json(rows);
//     } catch (err) {
//       console.error(`Error fetching data from table ${tableName}:`, err);
//       res.status(500).json({ error: `Error fetching data from table ${tableName}` });
//     }


// })




module.exports = app;
