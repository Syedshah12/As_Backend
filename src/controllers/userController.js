// userController.js
const db = require('../config/database');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');


  // Create a New User
  exports.createUser = async (req, res) => {
    const { name, password, isActive, isAdmin,bizList } = req.body;
    let bizListStringify=JSON.stringify(bizList);
    try {
    //{"ids":["0","1","2","3"]}
    const connection = await db.getConnection(); // Get a connection from the pool
    await connection.beginTransaction();
    const query=`CALL Add_User('${name}', '${password}', '${isAdmin}','${isActive}','${bizListStringify}');`
    const [result] = await db.execute(query);
    await connection.commit(); // Commit transaction
    connection.release();
      res.status(201).json(result);
    } catch (err) {
      console.error('Error creating user:', err);

      if (connection) {
        await connection.rollback(); // Rollback transaction if an error occurs
        connection.release(); // Release the connection back to the pool
      }
      res.status(500).json({ error: 'Error creating user' });
    }
};


  //Get All Usres
  exports.allUsers = async (req, res) => {
    const bizId=req.params.id;
    try {
    //{"ids":["0","1","2","3"]}
    const query=`SELECT * from all_users_bizs aub WHERE aub.BusinessId = ${bizId};`
    const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      console.error('Error Fetching User:', err);
      res.status(500).json({ error: 'Error Fetching user' });
    }
};

  //Get All Usres
  exports.selectUsersForAdmin = async (req, res) => {

    // const bizId=req.params.id;
     const { values } = req.body; // Assuming values is an array containing the values (0, 1, 2)

    // // Format the values into the desired string format
     const formattedString = `(${values.join(',')})`;

      try {
  
     const query=`SELECT * from all_users_bizs aub where aub.BusinessId IN ${formattedString};`
     const [result] = await db.execute(query);
       res.status(201).json(result);
     } catch (err) {
       console.error('Error Fetching User:', err);
       res.status(500).json({ error: 'Error Fetching user' });
     }
};



//   //Get All Usres
//   exports.allUsers = async (req, res) => {
//     try {
//     //{"ids":["0","1","2","3"]}
//     const query=`SELECT tu.Id as 'Id', tu.Name AS 'UserName', tu.IsAdmin AS 'IsAdmin', tu.IsActive AS 'IsActive', tu.CreatedAt AS 'CreatedAt' FROM tb_user tu;`
//     const [result] = await db.execute(query);
//       res.status(201).json(result);
//     } catch (err) {
//       console.error('Error creating user:', err);
//       res.status(500).json({ error: 'Error creating user' });
//     }
// };


  
  

//Update an User

  exports.updateUser = async (req, res) => {

    const {uid,name,newPass,isAdmin,isActive}=req.body;
    if(parseInt(isAdmin)!=0 && parseInt(isAdmin)!=1 && parseInt(isAdmin)!=2 ){
return res.json({err:"Can Be 0 , 1 , 2 only....."})
    }else{
      const connection = await db.getConnection(); // Get a connection from the pool
      await connection.beginTransaction(); 
        try {
       // Begin transaction
            const query = `CALL Update_tb_User('${uid}','${name}','${newPass}','${isAdmin}','${isActive}');`;
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

  
  // Create a New User
//   exports.loginUser = async (req, res) => {
//    const name=req.body.name;
//    const password=req.body.password;
//     try {
   
//     const query=`SELECT tu.Id, tu.Name AS 'Name', tu.IsAdmin AS 'IsAdmin', tu.IsActive AS 'IsActive', tu.CreatedAt AS 'CreatedAt' FROM tb_user tu WHERE tu.Name = '${name}' AND tu.Password = '${password}';`;
//     const [result] = await db.execute(query);
//     if(result.length === 0){
// return res.status(400).send('Inavlid Credentials');
//     }else{
//       return  res.send(result);
//     }
//     } catch (err) {
//       console.error('Error creating user:', err);
//       res.status(500).json({ error: 'Error creating user' });
//     }
// };
  

// Login A user
exports.loginUser = async (req, res) => {
  const name=req.body.name;
  const password=req.body.password;
   try {
    const connection = await db.getConnection(); // Get a connection from the pool
    await connection.beginTransaction();
   const query=`SELECT tu.Id, tu.Name AS 'Name', tu.IsAdmin AS 'IsAdmin', tu.IsActive AS 'IsActive', tu.CreatedAt AS 'CreatedAt' FROM tb_user tu WHERE tu.IsActive = 1 and tu.Name = '${name}' AND tu.Password = '${password}';`;
   const [result] = await db.execute(query);
   await connection.commit(); // Commit transaction
   connection.release();
   if(result.length === 0){
   
return res.status(400).send('Inavlid Credentials');
   }else{
    const token=jwt.sign(result[0],"mySecretKey",{expiresIn:'1d'})
    res.cookie('token',token)
    console.log(token);
     return  res.send(result);
   }
   } catch (err) {
     console.error('Error logging user:', err);

     if (connection) {
      await connection.rollback(); // Rollback transaction if an error occurs
      connection.release(); // Release the connection back to the pool
    }


     res.status(500).json({ error: 'Error logging user' });
   }
};
 