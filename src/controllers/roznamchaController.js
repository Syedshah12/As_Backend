const db = require('../config/database');




//   //Get Roznamcha Accounts
//   exports.getRoznamcha = async (req, res) => {
//     const bizId=req.params.id;
//     const startDate=req.params.startDate;
//     const endDate=req.params.endDate;
   
//     try {
//         const query = `SELECT * FROM \`all_transaction_histories_sndr_rcvr_user\` th WHERE th.BusinessId = '${bizId}'`;
//         const [result] = await db.execute(query);
//         res.status(201).json(result);
//       } catch (err) {
//         res.status(500).send(err);
//       }
// };



  exports.getRoznamcha = async (req, res) => {
    const bizId=req.params.id;
    const startDate=req.params.startDate;
    const endDate=req.params.endDate;
   
    try {
  
      if(startDate && startDate === '0'){
        const query = `SELECT * FROM all_transaction_histories_sndr_rcvr_user ath WHERE ath.BusinessId = '${bizId}';`;
          console.log('if Block');
        const [result] = await db.execute(query);
        res.status(201).json(result);
      }else{
        const query = `SELECT * FROM all_transaction_histories_sndr_rcvr_user ath WHERE ath.BusinessId = '${bizId}' AND (ath.TransactionDate BETWEEN '${startDate}' AND '${endDate}');`;
          
        const [result] = await db.execute(query);
        console.log('else Block');
        res.status(201).json(result);
      }
      
      } catch (err) {
        res.status(500).send(err);
      }
};





//   //Get Sender and recers
exports.getRoznamchaFromAllBiz = async (req, res) => {
    const bizId=req.params.id;
    try {
        const query = `SELECT * FROM all_acc_biz aab WHERE aab.BusinessId = ${bizId};`;
        const [result] = await db.execute(query);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).send(err);
      }
};












exports.updateRoznamcha = async (req, res) => {

  const {transactionId,senderId,recieverId,bank,amount,date,description,img}=req.body;
const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 
try {
// Begin transaction
    const query = `CALL Update_tb_transachistory(${transactionId}, ${senderId},${recieverId},'${bank}', ${amount}, '${date}', '${description}', ${img});`;
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
exports.updateRoznamchaForAccount = async (req, res) => {

  const {transactionId,senderId,recieverId,amount,JamaBaqaya}=req.body;
const connection = await db.getConnection(); // Get a connection from the pool
await connection.beginTransaction(); 
try {
// Begin transaction
    const query = `CALL Update_tb_transactionhistory_Acc_crea(${transactionId}, ${senderId}, ${recieverId},${amount},${JamaBaqaya});`;
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








// Assuming you have already configured your database connection and other necessary dependencies

// exports.createRoznamcha = async (req, res) => {
//   const { senderId, recieverId, amount, soid, bizId, uid } = req.body;
//   let { transactionDate, bank, description, img } = req.body;

//   // Validation checks
//   if (senderId === null && recieverId === null) {
//       return res.status(400).json({ error: "Sender and Reciever cannot both be null" });
//   }
//   if (amount <= 0) {
//       return res.status(400).json({ error: "Amount must be greater than 0" });
//   }
//   if (bizId === null || uid === null) {
//       return res.status(400).json({ error: "bizId and uid cannot be null" });
//   }

//   // Check if image data exists
//   if (!img) {
//       return res.status(400).json({ error: "Image data is required" });
//   }

//   // Convert image data to Base64
//   const imgBase64 = Buffer.from(img, 'binary').toString('base64');

//   // Convert transactionDate to Date object
//   const transactionDateObj = new Date(transactionDate);
// d
//   // Validate transaction date
//   if (isNaN(transactionDateObj) || transactionDateObj < oneMonthAgo) {
//       return res.status(400).json({ error: "Invalid transaction date" });
//   }

//   // Set isaccCreation to 0 (hard-coded)
//   const isaccCreationValue = 0;

//   // Get database connection from pool
//   const connection = await db.getConnection();

//   try {
//       // Begin transaction
//       await connection.beginTransaction();

//       // Execute stored procedure to add transaction history
//       const query = `CALL Add_TransactionHistory(${senderId}, ${recieverId}, ${bank}, ${amount}, ${transactionDate}, ${description}, ${imgBase64}, ${soid}, ${bizId}, ${uid}, ${isaccCreationValue});`;
//       const [result] = await connection.execute(query);

//       // Commit transaction
//       await connection.commit();

//       // Release the connection back to the pool
//       connection.release();

//       // Send response
//       res.status(201).json(result);
//   } catch (err) {
//       // Rollback transaction if an error occurs
//       if (connection) {
//           await connection.rollback();
//           connection.release();
//       }
//       res.status(500).send(err);
//   }
// };









//   //create Roznamcha Entry
exports.createRoznamcha = async (req, res) => {
    let {senderId,recieverId,amount,img,bizId,uid}=req.body;
    let {transactionDate}=req.body;
    let {bank}=req.body;
    let {description}=req.body;



 // Validation checks
 if (senderId === null && recieverId === null) {
    return res.status(400).json({error: "Sender and Reciever cannot both be null"});
}
if (amount <= 0) {
    return res.status(400).json({error: "Amount must be greater than 0"});
}
if (bizId === null || uid === null) {
    return res.status(400).json({error: "bizId and uid cannot be null"});
}if(img===""){
  img=null
}if (img !== null) {
  img = '"' + img + '"';
}



//  if (!img) {
//       return res.status(400).json({ error: "Image data is required" });
//   }

//   // Convert image data to Base64
//   const imgBase64 = Buffer.from(img, 'binary').toString('base64');
// console.log(`my${imgBase64}`);

// console.log(imgBase64);
   // Calculate date one month ago
   const oneMonthAgo = new Date();
   oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

   // Convert transactionDate to Date object
   const transactionDateObj = new Date(transactionDate);

//    // Check if transactionDate is more than one month before the current date
//    if (transactionDateObj < oneMonthAgo ) {
//        return res.status(400).json({error: "Transaction date cannot be more than one month before the current date"});
//    }
console.log("Transaction Date Object:", transactionDateObj);



console.log("Transaction Date Object:", transactionDateObj);

if (transactionDateObj === '' || isNaN(new Date(transactionDateObj))) {
    console.log("Transaction date is empty or invalid.");
    return res.status(400).json({ error: "Transaction date is empty or invalid" });
} else if (new Date(transactionDateObj) < oneMonthAgo) {
    console.log("Transaction date is before one month ago.");
    return res.status(400).json({ error: "Transaction date cannot be more than one month before the current date" });
}



   transactionDate=`'${transactionDate}'`;
   bank=`'${bank}'`;
   description=`'${description}'`;
   console.log(transactionDate);


// Set isaccCreation to 0 (hard-coded)



    const connection = await db.getConnection(); // Get a connection from the pool
    await connection.beginTransaction(); 
    
      try {
     // Begin transaction
    
          const query = `CALL Add_TransactionHistory(${senderId}, ${recieverId}, ${bank}, ${amount}, ${transactionDate}, ${description}, ${img}, ${bizId}, ${uid});`;
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

