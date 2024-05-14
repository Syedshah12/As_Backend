const db = require('../config/database');
const { use } = require('../routes/accounttblRoutes');


  // Create a new Account
  exports.createItem = async (req, res) => {


    const {isActive,name,unit,uid,bizlist}=req.body;
    let upperCaseUnit=unit.toUpperCase();
let bizListStringify=JSON.stringify(bizlist);
console.log(`stringgify:${bizListStringify}`);
console.log(`bizlist:${bizlist}`);


const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 


    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    const query = `CALL Add_Item('${name}','${unit}','${isActive}','${uid}','${bizListStringify}');`;
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
  






// Get All Items
exports.allItemsByUidBizId = async (req, res) => {
  const bizId = req.params.bizId;
  const userId=req.params.userId;

  // Check if bizId and userId are defined
  if (typeof bizId === 'undefined' || typeof userId === 'undefined') {
    console.log("bizId or userId is undefined. Query not executed.");
    res.status(400).json({ error: 'bizId or userId is undefined.' });
    return; // Return without executing the query
  }

  try {
    // Construct the query string with defined bizId and userId
    const query = `SELECT * FROM all_items_bizs aib WHERE aib.BusinessId = '${bizId}' AND aib.UserId = '${userId}';`;
    const [result] = await db.execute(query);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error Getting Items:', err);
    res.status(500).json({ error: 'Error Getting Items' });
  }
};


  
//   //Get All Items
//   exports.allItemsByUidBizId= async (req, res) => {
// const {bizId,userId}=req.body;



//     try {
   

//       //{"ids":["0","1","2","3"]}
//     const query=`SELECT * FROM all_items_bizs aib where aib.BusinessId = '${bizId}' AND aib.UserId = '${userId}';`
//     const [result] = await db.execute(query);
//       res.status(201).json(result);
//     } catch (err) {
//       console.error('Error Getting Items:', err);
//       res.status(500).json({ error: 'Error Getting Users' });
//     }
// };






//   //Get All Items
//   exports.getItem = async (req, res) => {
// const id=req.params.id
//     try {
   
//     //{"ids":["0","1","2","3"]}
//     const query=`SELECT
//     ti.Id AS 'Id',
//     ti.Name AS 'ItemName',
//     ti.IsActive AS 'IsActive',
//     ti.CreatedAt AS 'CreateAt',
//     ti.UserId AS 'UserId'
//   FROM tb_item ti WHERE ti.id ='${id}';`
//     const [result] = await db.execute(query);
//       res.status(201).json(result);
//     } catch (err) {
//       console.error('Error Getting Items:', err);
//       res.status(500).json({ error: 'Error Getting Users' });
//     }
// };








// exports.userBizRelation = async (req, res) => {
//   const id=req.params.id;
//   try {
//   //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
//   const query = `SELECT tb.Id AS 'Business Id', tb.Name AS 'Business Name', tb.IsActive AS 'IsActive', tb.CreatedAt AS
//   'CreatedAt', tu.Id AS 'User Id', tu.Name AS 'User Name' FROM rtb_user_biz rub LEFT JOIN tb_business tb ON rub.BizId = tb.Id LEFT JOIN tb_user tu ON rub.UserId = tu.Id
//   WHERE tu.Id = ${id};`;
//   const [result] = await db.execute(query);
//     res.status(201).json(result);
//   } catch (err) {
//     res.status(500).json({ error: 'NO buisness For such user' });
//   }
// };








exports.updateItem = async (req, res) => {
  const {itemId,name,unit,isActive}=req.body;
const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 
try {
// Begin transaction
    const query = `CALL Update_tb_item('${itemId}','${name}','${unit}','${isActive}');`;
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
