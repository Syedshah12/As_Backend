const db = require('../config/database');

//   //Get Roznamcha Accounts
exports.getRoznamchaForAccount = async (req, res) => {
    const accId=req.params.accId;
    const bizId=req.params.bizId;
 
    try {
        const query = `CALL Get_Biz_Account_Ledger_by_Id('${accId}', '${bizId}');`;
        const [result] = await db.execute(query);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).send(err);
      }

  
};




//   //Get Roznamcha Accounts
exports.getVehicleInForAccount = async (req, res) => {
    const accId=req.params.accId;
    const bizId=req.params.bizId;
 
    try {
        const query = `SELECT * FROM all_stockout aso WHERE aso.SellerId = ${accId} AND aso.BusinessId = ${bizId};`;
        const [result] = await db.execute(query);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).send(err);
      }

  
};





// //   //Get VehicleIn Accounts
// exports.getVehicleInForAccount = async (req, res) => {
//     const accId=req.params.accId;
//     const bizId=req.params.bizId;
 
//     try {
//         const query = `SELECT * FROM all_stockout aso WHERE aso.SellerId = ${accId} AND aso.BusinessId = ${bizId};`;
//         const [result] = await db.execute(query);
//         res.status(201).json(result);
//       } catch (err) {
//         res.status(500).send(err);
//       }

  
// };


//   //Get VehicleIn Accounts
exports.getVehicleInForMasterAccount = async (req, res) => {
    const accId=req.params.accId;
 
 
    try {
        const query = `SELECT * FROM all_stockout aso WHERE aso.SellerId = ${accId};`;
        const [result] = await db.execute(query);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).send(err);
      }

  
};






exports.getMasterRoznamchaReport = async (req, res) => {
    const accId=req.params.accId;
    try {
        const query = `CALL Get_Master_Account_Ledger(${accId});;`;
        const [result] = await db.execute(query);
        res.status(201).json(result[0]);
      } catch (err) {
        res.status(500).send(err);
      }

  
};






//   //Get VehicleOut Accounts
exports.getVehicleOutForAccount = async (req, res) => {
    const accId=req.params.accId;
    const bizId=req.params.bizId;
 
    try {
        const query = `SELECT * FROM all_stockout aso WHERE aso.CustomerId = ${accId} AND aso.BusinessId = ${bizId};`;
        const [result] = await db.execute(query);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).send(err);
      }

  
};





//   //Get VehicleOut Accounts
exports.getVehicleOutForMasterAccount = async (req, res) => {
  const accId=req.params.accId;
 

  try {
      const query = `SELECT * FROM all_stockout aso WHERE aso.CustomerId = ${accId};`;
      const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).send(err);
    }


};







//Get RozNamcha Data For Admins
exports.getAdminRoznamchaReport = async (req, res) => {
  const accId=req.params.accId;
  const { values } = req.body; 
  try {
    const formattedString = `${values.join(',')}`;
    // 0,1,2
      const query = `CALL Get_Multi_Biz_Account_Ledger_by_Id_(${accId}, '${formattedString}');`;
      const [result] = await db.execute(query);
      res.status(201).json(result[0]);
    } catch (err) {
      res.status(500).send(err);
    }


};







//Get RozNamcha Data For Admins
exports.getAdminVehicleInReport = async (req, res) => {
  const accId=req.params.accId;
  const { values } = req.body; 
  try {
    const formattedString = `${values.join(',')}`;
    // 0,1,2
      const query = `SELECT * FROM all_stockout aso WHERE aso.SellerId = ${accId} and aso.BusinessId in ('${formattedString}');`;
      const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).send(err);
    }


};




//   //Get VehicleOut Accounts
exports.getVehicleOutForAdmin = async (req, res) => {
  const accId=req.params.accId;
  const { values } = req.body; 

  try {
    const formattedString = `${values.join(',')}`;
      const query = `SELECT * FROM all_stockout aso WHERE aso.CustomerId = ${accId} and aso.BusinessId in ('${formattedString}');`;
      const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).send(err);
    }


};


