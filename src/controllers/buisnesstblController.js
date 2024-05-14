// userController.js
const db = require('../config/database');



  // Create a new Buisness
  exports.createBuisness = async (req, res) => {
    const { name, isActive } = req.body;
    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    // const query = `CALL Add_Business('${name}', '${isActive}')`;
    const query = `select Insert_tb_business('${name}', '${isActive}', now()) into @r;`;

    const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      console.error('Error creating buisness:', err);
      res.status(500).json({ error: 'Error creating buisness' });
    }
  };
  
  






  // Get All buisnessess
  exports.fetchAllBuisness = async (req, res) => {

    try {
    const query = `SELECT tb.Id as 'BizId', tb.Name AS 'BusinessName', tb.IsActive AS 'IsActive', tb.CreatedAt AS 'CreatedAt' FROM tb_business tb;`;
    const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Error Showing buisness ' });
    }
  };
  

  exports.getBizById = async (req, res) => {


    try {
      let bizid = req.params.bizId;
      const query = `SELECT \`BusinessName\` FROM \`all_businesses\` WHERE \`BusinessId\` = ${bizid};`;
      const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
    
  };
  



//Update an Buisness
// exports.updateBuisness = async (req, res) => {
//     const id = req.params.id;
//     const { name, isActive } = req.body;

//     try {

// let query = `UPDATE \`businesstable\` SET \`Name\` = '${name}', \`IsActive\` = '${isActive}' WHERE \`businesstable\`.\`Id\` = '${id}'`;


// console.log(query);
//     const [result] = await db.execute(query, [name, isActive]);
//       if (result.affectedRows === 0) {
//         res.status(404).json({ error: 'Buisnes not found' });
//       } else {
//         res.json({ id: id, isActive });
//       }
//     } catch (err) {
//       console.error('Error updating buisness:', err);
//       res.status(500).json({ error: 'Error updating buisness' });
//     }

//   };
exports.updateBuisness = async (req, res) => {
  const {BizId,BusinessName,IsActive}=req.body;
  const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 
  try {
 // Begin transaction
      const query = `CALL Update_tb_business('${BizId}','${BusinessName}','${IsActive}');`;
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
  








 
  


  
  // Get Buisness For specific Users
  exports.userBizRelationTest = async (req, res) => {
    const id=req.params.id;
    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    const query = `SELECT * FROM all_users_bizs aub WHERE aub.UserId = ${id};`;
    const [result] = await db.execute(query);
      res.status(201).json(result); 
    } catch (err) {
      res.status(500).json({ error: 'NO buisness For such user' });
    }
  };



  
  exports.getBizs = async (req, res) => {
  
    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    const query = `SELECT *
    FROM all_businesses ab where ab.BusinessIsActive = 1;`;
    const [result] = await db.execute(query);
      res.status(201).json(result); 
    } catch (err) {
      res.status(500).json({ error: 'NO buisness For such user' });
    }
  };
  