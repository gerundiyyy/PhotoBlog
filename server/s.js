const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pipik091pipik091',
  database: 'pupitre',
  waitForConnections: true,
  connectionLimit: 10,
});

// Регистрация пользователя
app.post('/api/register', async (req, res) => {
  const { email, password, name, phone } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password and name are required' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO users 
       (user_email, user_password, user_name, user_phone, user_role) 
       VALUES (?, ?, ?, ?, 'user')`,
      [email, password, name, phone]
    );

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Вход пользователя
app.post('/api/login', async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ error: 'phone and password are required' });
  }

  try {
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE user_phone = ? AND user_password = ?',
      [phone, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid phone or password' });
    }

    const user = users[0];
    res.json({ 
      success: true,
      message: 'Login successful',
      user: {
        id: user.user_id,
        email: user.user_email,
        name: user.user_name,
        phone: user.user_phone,
        role: user.user_role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});