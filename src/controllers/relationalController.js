const db = require('../config/database');



  // Get Buisness For specific Users
  exports.userBizRelation = async (req, res) => {
    const id=req.params.id;
    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    const query = `SELECT tb.Id AS 'Business Id', tb.Name AS 'Business Name', tb.IsActive AS 'IsActive', tb.CreatedAt AS
    'CreatedAt', tu.Id AS 'User Id', tu.Name AS 'User Name' FROM rtb_user_biz rub LEFT JOIN tb_business tb ON rub.BizId = tb.Id LEFT JOIN tb_user tu ON rub.UserId = tu.Id
    WHERE tu.Id = ${id};`;
    const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'NO buisness For such user' });
    }
  };
  


     // Get Buisness For All  Users
   exports.AllUserBizRelation = async (req, res) => {
    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    const query = `SELECT tb.Id AS 'Business Id', tb.Name AS 'Business Name', tb.IsActive AS 'IsActive', tb.CreatedAt AS
    'CreatedAt', tu.Id AS 'User Id', tu.Name AS 'User Name' FROM rtb_user_biz rub LEFT JOIN tb_business tb ON rub.BizId = tb.Id LEFT JOIN tb_user tu ON rub.UserId = tu.Id;`;
    const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'NO buisness For such user' });
    }
  };
  








   // Get Buisness For specific Users
   exports.userBizRealtionByUidByBizId = async (req, res) => {
    const id=req.params.id;
    const {uid,BizId}=req.body;
    

    try {
    //   const query = 'INSERT INTO accounttable (id, name, PhoneNo, Balance, isActive) VALUES (?, ?, ?, ?, ?)';
    const query = `SELECT
    ti.Id AS 'ItemId',
    ti.Name AS 'ItemName',
    ti.IsActive AS 'IsActive',
    ti.CreatedAt AS 'Created At',
    tu.Id AS 'UserId',
    tu.Name AS 'UserName',
    tu.IsAdmin AS 'IsAdmin',
    tu.IsActive AS 'IsActive',
    tu.CreatedAt AS 'CreateAt'
  FROM rtb_item_biz rib
    LEFT JOIN tb_item ti
      ON rib.ItemId = ti.Id
    LEFT JOIN tb_user tu
      ON rib.UserId = tu.Id
  WHERE tu.Id = ${uid} AND rib.BizId = ${BizId};`;
    const [result] = await db.execute(query);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'NO buisness For such user' });
    }
  };
  