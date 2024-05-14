// userController.js
const db = require('../config/database');

// // Create a new user
// exports.createUser = async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const [result] = await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
//     res.status(201).json({ id: result.insertId, name, email });
//   } catch (err) {
//     console.error('Error creating user:', err);
//     res.status(500).json({ error: 'Error creating user' });
//   }
// };

// // Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const [rows] = await db.execute('SELECT * FROM users');
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// };

// // Get user by ID
// exports.getUserById = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
//     if (rows.length === 0) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       res.json(rows[0]);
//     }
//   } catch (err) {
//     console.error('Error fetching user:', err);
//     res.status(500).json({ error: 'Error fetching user' });
//   }
// };

// // Update user by ID
// exports.updateUser = async (req, res) => {
//   const userId = req.params.id;
//   const { name, email } = req.body;
//   try {
//     const [result] = await db.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);
//     if (result.affectedRows === 0) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       res.json({ id: userId, name, email });
//     }
//   } catch (err) {
//     console.error('Error updating user:', err);
//     res.status(500).json({ error: 'Error updating user' });
//   }
// };

// // Delete user by ID
// exports.deleteUser = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const [result] = await db.execute('DELETE FROM users WHERE id = ?', [userId]);
//     if (result.affectedRows === 0) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       res.json({ message: 'User deleted successfully' });
//     }
//   } catch (err) {
//     console.error('Error deleting user:', err);
//     res.status(500).json({ error: 'Error deleting user' });
//   }
// };





exports.getTableData = async (req, res) => {
    const tableName = req.params.table;
    try {
        const query = `SELECT * FROM ${tableName}`;
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        console.error(`Error fetching data from table ${tableName}:`, err);
        res.status(500).json({ error: `Error fetching data from table ${tableName}` });
    }
};








//Get data from the table:
// Get data from a table by table name
// exports.getTableData = async (req, res) => {
//     const tableName = req.params.table;
//     try {
//         let query = 'SELECT * FROM ' + tableName;
//       const [rows] = await db.execute(query);
//       res.json(rows);
//     } catch (err) {
//       console.error(`Error fetching data from table ${tableName}:`, err);
//       res.status(500).json({ error: `Error fetching data from table ${tableName}` });
//     }

// };



