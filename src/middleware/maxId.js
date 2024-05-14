const db = require('../config/database');



//   // Create a new Account
//   exports.createBuisness = async (req, res) => {
//     const buisnessId = req.params.id;
//     let createdAt=new Date();
//     const { name, isActive } = req.body;
//     try {
//     //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
//     const query = 'INSERT INTO businesstable (id, name, IsActive, CreatedAt) VALUES (?, ?, ?, ?)';

//     const [result] = await db.execute(query, [buisnessId, name, isActive, createdAt]);
//       res.status(201).json({ id: buisnessId, name, isActive, createdAt });
//     } catch (err) {
//       console.error('Error creating buisness:', err);
//       res.status(500).json({ error: 'Error creating buisness' });
//     }
//   };




  // Create a new Account
//   exports.getMaxId = async (req, res,next) => {
//     const tableName = req.params.table;
//     try {
//         const query = `SELECT max(id) FROM ${tableName}`;
//         const [rows] = await db.execute(query);
//         res.json(rows);
//         return rows;
      
//     } catch (err) {
//         console.error(`Error fetching data from table ${tableName}:`, err);
//         res.status(500).json({ error: `Error fetching data from table ${tableName}` });
//     }
// };

// // middleware.js
// exports.getMaxId = (tableName) => {
//     return async (req, res, next) => {
       
//         try {
//             // Your middleware logic here, using additionalParameter
//             console.log('Additional Parameter:', tableName);
//             const query = `SELECT max(id) FROM ${tableName}`;
//             const [rows] = await db.execute(query);
//         return rows[0]['max(id)'];
//         } catch (err) {
//             console.error(`Error fetching data from table ${tableName}:`, err);
//             res.status(500).json({ error: `Error fetching data from table ${tableName}` });
//         }
//     };
// };

exports.getMaxId = async (tableName) => {
    try {
        // Your middleware logic here, using additionalParameter
        console.log('Additional Parameter:', tableName);
        const query = `SELECT max(id) FROM ${tableName}`;
        const [rows] = await db.execute(query);
        return rows[0]['max(id)'];
    } catch (err) {
        console.error(`Error fetching data from table ${tableName}:`, err);
        // You can choose to throw the error or return a default value
        throw err;
    }
  };
  
  