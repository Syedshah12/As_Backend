const db = require('../config/database');




// Get All Items
exports.getvehicleOutStock = async (req, res) => {

  
    const bizId=req.params.id;
   
       if (typeof bizId === 'undefined' ) {
         console.log(`bizId  is undefined. Query not executed.${typeof bizId}`);
         res.status(400).json({ error: 'bizId  is undefined.' });
         return; // Return without executing the query
       }
   
       try {
         // Construct the query string with defined bizId and userId
        //  const query = `SELECT * FROM all_stockout `aso` where aso.BusinessId = ${bizId}`;
        const query = `SELECT * FROM all_stockout  where BusinessId = ${bizId}`;

        const [result] = await db.execute(query);
         res.status(200).json(result);
       } catch (err) {
         console.error('Error Getting Vehicles:', err);
         res.status(500).json({err});
       }
     };
     





     
exports.insertStockOut = async (req, res) => {
 const {SInHistoryId,custtomerid,wwightout,rateout,kharcha,kiraya,dihari,tax,tp,loading,other1,other2,userid,img,isSold}=req.body;
let dateout=req.body.dateout;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
 
    // Convert transactionDate to Date object
    const transactionDateObj = new Date(dateout);
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
    const query = `CALL Add_StockOut(${SInHistoryId},${custtomerid},${wwightout},${rateout},${kharcha},${kiraya},${dihari},${tax},${tp},${loading},${other1},${other2},'${dateout}',${userid},'${img}',${isSold});`;
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
   










  exports.updateVehicleOut = async (req, res) => {

    const {recordId,customerId,kharcha,kiraya,weight,rate,date,dihari,tax,tp,loading,other1,other2}=req.body;


      const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 
  try {
 // Begin transaction
      const query = `CALL Update_tb_stockout(${recordId},${customerId},${weight},${rate},${kharcha},${kiraya},${dihari},${tax},${tp},${loading},${other1},${other2},'${date}');`;
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
  