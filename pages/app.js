const express = require('express');
const mysql = require('mysql2/promise'); // Для async/await
const cors = require('cors');

const app = express();
app.use(cors()); // Разрешаем запросы с фронтенда

// Настройка подключения к MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pipik091pipik091',
  database: 'pupitre', // Ваша база данных
  waitForConnections: true,
  connectionLimit: 10,
});

// API-эндпоинт для получения данных
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users'); // Запрос к таблице users
    res.json(rows); // Отправляем данные в JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings'); // Запрос к таблице users
    res.json(rows); // Отправляем данные в JSON
  } catch (error) {
    console.error('Error fetching studio bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});