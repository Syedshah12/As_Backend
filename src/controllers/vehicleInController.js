const db = require('../config/database');

// Get All Items
exports.getAllExistingStock = async (req, res) => {
    const bizId=req.params.id;
      
       if (typeof bizId === 'undefined' ) {
         console.log(`bizId  is undefined. Query not executed.${typeof bizId}`);
         res.status(400).json({ error: 'bizId  is undefined.' });
         return; // Return without executing the query
       }
   
       try {
         // Construct the query string with defined bizId and userId
         const query = `SELECT * FROM all_stock_in asi where asi.BusinessId = ${bizId};`;
         const [result] = await db.execute(query);
         res.status(200).json(result);
       } catch (err) {
         console.error('Error Getting Vehicles:', err);
         res.status(500).json({ error: 'Error Getting Vehicles' });
       }
     };
     


exports.insertStockIn = async (req, res) => {


    const {vehicleId,sellerId,ItemId,Weight,rate,Location,DriverName,DriverPhone,bizId,uid,img}=req.body;
    
let date=req.body.date;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
 
    // Convert transactionDate to Date object
    const transactionDateObj = new Date(date);
 console.log(transactionDateObj);
 if (transactionDateObj === '' || isNaN(new Date(transactionDateObj))) {
     console.log(" date is empty or invalid.");
     return res.status(400).json({ error: " date is empty or invalid" });
 } else if (new Date(transactionDateObj) < oneMonthAgo) {
     console.log(" date is before one month ago.");
     return res.status(400).json({ error: " date cannot be more than one month before the current date" });
 }
 
 
 
    



const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 


    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    const query = `CALL Add_stockIn('${vehicleId}', '${sellerId}', '${ItemId}','${Weight}', '${rate}', '${date}', '${Location}', '${DriverName}','${DriverPhone}', '${bizId}','${uid}','${img}');`;
    const [result] = await db.execute(query);
    await connection.commit(); // Commit transaction
    connection.release(); 
      res.status(201).json(result);
      
     
     
    } catch (err) {

      if (connection) {
        await connection.rollback(); // Rollback transaction if an error occurs
        connection.release(); // Release the connection back to the pool
      }

      res.status(500).json(err);
    }
  };        // Create a new Account
   








  exports.updateVehicleIn = async (req, res) => {

    const {recordId,vehId,sellerId,itemId,weight,rate,date,location,driverName,driverPhone}=req.body;
  const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 
  try {
 // Begin transaction
      const query = `CALL Update_tb_stockinhistory(${recordId},${vehId},${sellerId},${itemId},${weight},${rate},'${date}','${location}','${driverName}','${driverPhone}');`;
      const [result] = await db.execute(query);
      await connection.commit(); // Commit transaction
      connection.release(); // Release the connection back to the pool
      res.status(201).json(result);
    } catch (err) {
      if (connection) {
        await connection.rollback(); // Rollback transaction if an error occurs
        connection.release(); // Release the connection back to the pool
      }

      res.status(500).send(err);
    }
  };
  