const db = require('../config/database');







// Get All Items
exports.getAllVehiclesForBiz = async (req, res) => {
 const bizId=req.params.id;
   
    if (typeof bizId === 'undefined' ) {
      console.log(`bizId  is undefined. Query not executed.${typeof bizId}`);
      res.status(400).json({ error: 'bizId  is undefined.' });
      return; // Return without executing the query
    }

    try {
      // Construct the query string with defined bizId and userId
      const query = `SELECT * from all_vehicle_biz avb where avb.Businessid = '${bizId}';`;
      const [result] = await db.execute(query);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error Getting Vehicles:', err);
      res.status(500).json({ error: 'Error Getting Vehicles' });
    }
  };
  
  


   // Create a new Account
   exports.createVehicleForBiz = async (req, res) => {


    const {vehicleNo,isActive,uid,bizlist}=req.body;
    
let bizListStringify=JSON.stringify(bizlist);
console.log(`stringgify:${bizListStringify}`);
console.log(`bizlist:${bizlist}`);


const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 


    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    const query = `CALL Add_Vehicle('${vehicleNo}', '${isActive}', '${uid}', '${bizListStringify}');`;
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
  };
  




  exports.updateVehicle = async (req, res) => {

      const {vehId,vehNo,isActive}=req.body;
    const connection = await db.getConnection(); // Get a connection from the pool
  await connection.beginTransaction(); 
    try {
   // Begin transaction
        const query = `CALL Update_tb_vehicle('${vehId}','${vehNo}','${isActive}');`;
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
    




    