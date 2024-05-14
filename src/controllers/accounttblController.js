// userController.js
const db = require('../config/database');
const mysql = require('mysql2/promise');
const maxId=require('../middleware/maxId.js')
const axios=require('axios')









// //Update an Account
// exports.updateAccount = async (req, res) => {
//     const id = req.params.id;
//     const { name, PhoneNo, Balance, isActive } = req.body;

//     try {
// let query = `UPDATE \`tb_account\` SET \`Name\` = '${name}', \`PhoneNo\` = '${PhoneNo}', \`Balance\` = '${Balance}', \`IsActive\` = '${isActive}' WHERE \`accounttable\`.\`Id\` = '${id}'`;
// const [result] = await db.execute(query, [name, PhoneNo, Balance, isActive, id]);
//       if (result.affectedRows === 0) {
//         res.status(404).json({ error: 'account not found' });
//       } else {
//         res.json({ id: id, name, PhoneNo, Balance, isActive });
//       }
//     } catch (err) {
//       console.error('Error updating account:', err);
//       res.status(500).json({ error: 'Error updating account' });
//     }

//   };




// Get Accounts by biz and user

exports.getAccounts = async (req, res) => {
const bizId=req.params.id;
  try {


      const query = `SELECT * FROM all_acc_biz aab WHERE aab.BusinessId = ${bizId};`;
      const [result] = await db.execute(query);

      res.status(201).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
};


exports.getAllAccounts = async (req, res) => {

  
    try {
  
  
        const query = `select * from all_accounts;`;
        const [result] = await db.execute(query);
  
        res.status(201).json(result);
      } catch (err) {
        res.status(500).send(err);
      }
  };









exports.getAccountsBalanceSheet = async (req, res) => {
  const bizId=req.params.id;

  
  try {
  
  
        const query = `SELECT * FROM all_acc_biz aab WHERE aab.BusinessId = ${bizId} and aab.RelationIsActive = '1';`;
        const [result] = await db.execute(query);
  
        res.status(201).json(result);
      } catch (err) {
        res.status(500).send(err);
      }
  };
  




  exports.getAccountsBalanceSheetNotActive = async (req, res) => {
    const bizId=req.params.id;
  
    
    try {
    
    
          const query = `SELECT * FROM all_acc_biz aab WHERE aab.BusinessId = ${bizId} and aab.RelationIsActive = '0';`;
          const [result] = await db.execute(query);
    
          res.status(201).json(result);
        } catch (err) {
          res.status(500).send(err);
        }
    };
    
  
  


// Get master Account Data
exports.getMasterAccounts = async (req, res) => {
 
    try {

        const query = `SELECT * FROM all_accounts;`;
        const [result] = await db.execute(query);
  
        res.status(201).json(result);
      } catch (err) {
        res.status(500).send(err);
      }
  };
  




  // Create a new Account
exports.createAccount = async (req, res) => {
  const {name,phone,balance,active,userid,bizid,bizlist,bizballist,isBankAccount}=req.body;
let bizbalListStringify=JSON.stringify(bizballist);
let bizListStringify=JSON.stringify(bizlist);
  let stringfiedList;

const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 



if(parseInt(isBankAccount)===1){
  const businessesResponse = await axios.get('http://localhost:3000/buisness/fetchBuisness');
  const bizList = businessesResponse.data;
 let allBizIds= bizList.map(element => element.BizId);
 let bizListArr={
  ids:allBizIds
 }
let stringfiedList=JSON.stringify(bizListArr)

try {
  // Begin transaction
  const query = `CALL Add_Account('${name}', '${phone}',  '${active}', '${userid}',  '${stringfiedList}','${bizbalListStringify}','${isBankAccount}');`;
       const [result] = await db.execute(query);
       await connection.commit(); // Commit transaction
       connection.release(); // Release the connection back to the pool
       res.status(201).json(result);
     } catch (err) {
 
       if (connection) {
         await connection.rollback(); // Rollback transaction if an error occurs
         connection.release(); // Release the connection back to the pool
       }
 console.log(err);
       res.status(500).send(err);
     }

}else{
  try {
    // Begin transaction
    console.log(bizListStringify);
         const query = `CALL Add_Account('${name}', '${phone}',  '${active}', '${userid}',  '${bizListStringify}','${bizbalListStringify}','${isBankAccount}');`;
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

} 
  };
  
  

  exports.updateAccount = async (req, res) => {

    const {updaterId,name,phone,isActive}=req.body;
  const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 
  try {
 // Begin transaction
      const query = `CALL Update_tb_account('${updaterId}','${name}','${phone}','${isActive}');`;
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









// exports.createAccount = async (req, res) => {
//   const id = req.params.id;
//   let createdAt = new Date();
//   const { name, PhoneNo, Balance, isActive, userId } = req.body;
//   // `Id`, `Name`, `PhoneNo`, `Balance`, `IsActive`, `CreatedAt`, `UserId`
//   try {
//       await db.beginTransaction();

//       const insertAccountQuery = 'INSERT INTO tb_account (id, name, PhoneNo, Balance, isActive, createdAt, UserId) VALUES (?, ?, ?, ?, ?, ?, ?)';
//         const insertValues = [id, name, PhoneNo, Balance, isActive, createdAt, userId];
//         const queryString = db.format(insertAccountQuery, insertValues);
//       await db.execute(queryString);

//       // Additional operations can be added here within the same transaction if needed
//      let  querylog = queryString;
// let logsQuery='INSERT INTO tb_dblogs (Id, Query) VALUES (?,?)'
// let insert=[0,querylog];
// await db.execute(queryString);

//       await db.commit();

//       res.status(201).json({ id, name, PhoneNo, Balance, isActive });
//   } catch (err) {
//       console.error('Error creating account:', err);
//       await db.rollback();
//       res.status(500).json({ error: 'Error creating account' });
//   } finally {
//       // Ensure to release the connection after transaction
//       await db.release();
//   }
// };



// exports.createAccount = async (req, res) => {
//   const tableName = 'tb_account';
//   const getMyId =  await maxId.getMaxId(tableName); // Await the resolution of getMaxId
//   console.log(getMyId);
//   const id = req.params.id;
//   const createdAt = new Date();
//   const { name, PhoneNo, Balance, isActive, userId } = req.body;

//   let connection;

//   try {
//       connection = await db.getConnection();

//       await connection.beginTransaction();

//       const insertAccountQuery = 'INSERT INTO tb_account (id, name, PhoneNo, Balance, isActive, createdAt, UserId) VALUES (?, ?, ?, ?, ?, ?, ?)';
//         const insertValues = [id, name, PhoneNo, Balance, isActive, createdAt, userId];
//         const queryString = db.format(insertAccountQuery, insertValues);
//       const [result] = await connection.execute(insertAccountQuery, insertValues);

//       // Log the query
//       const queryLog = {
//           id: 10, // or any other id for logging purposes
//           query: insertAccountQuery,
//           parameters: insertValues
//       };
//       const dblogInsertQuery = 'INSERT INTO tb_dblogs (Id, Query) VALUES (?, ?)';
//       await connection.execute(dblogInsertQuery, [queryLog.id, queryString]);

//       await connection.commit();

//       res.status(201).json({ id, name, PhoneNo, Balance, isActive });
//   } catch (err) {
//       console.error('Error creating account:', err);
//       if (connection) {
//           await connection.rollback();
//       }
//       res.status(500).json({ error: 'Error creating account' });
//   } finally {
//       if (connection) {
//           connection.release();
//       }
//   }
// };


// exports.createAccount = async (req, res) => {

//   // const tableName = 'tb_account';
//   // const getMyId =  await maxId.getMaxId(tableName); // Await the resolution of getMaxId
//   // console.log(getMyId);
//   // const id = req.params.id;
//   // const createdAt = new Date();
//   const { tb_name, operation, o_values, attachment } = req.body;

//   let connection;

//   try {
//       connection = await db.getConnection();

//       await connection.beginTransaction();
//       const dblogInsertQuery = 'CALL `Insert_LogsDB`(?, ?, ?, ?);';
//       await connection.execute(dblogInsertQuery, [tb_name, operation,o_values,attachment]);

//       await connection.commit();

//       res.status(201).json({ tb_name, operation, o_values, attachment });
//   } catch (err) {
//       console.error('Error creating account:', err);
//       if (connection) {
//           await connection.rollback();
//       }
//       res.status(500).json({ error: 'Error creating account' });
//   } finally {
//       if (connection) {
//           connection.release();
//       }
//   }
// };
