const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // ⬅️ Отдаёт index.html, JS и картинки

const DATA_PATH = './data/posts.json';

app.get('/api/posts', (req, res) => {
  console.log('📥 Запрос на /api/posts'); // лог
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  res.json(data);
});

app.listen(3000, () => {
  console.log('🚀 Сервер запущен на http://localhost:3000');
});