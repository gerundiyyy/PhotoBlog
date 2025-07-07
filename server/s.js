const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // ⬅️ Отдаёт index.html, JS и картинки

const DATA_PATH_POSTS = './data/posts.json';
const DATA_PATH_HERO = './data/hero.json';

app.get('/api/hero', (req, res) => {
  console.log('📥 Запрос на /api/hero'); // лог
  const data = JSON.parse(fs.readFileSync(DATA_PATH_HERO, 'utf-8'));
  res.json(data);
});

app.get('/api/posts', (req, res) => {
  console.log('📥 Запрос на /api/posts'); // лог
  const data = JSON.parse(fs.readFileSync(DATA_PATH_POSTS, 'utf-8'));
  res.json(data);
});

app.listen(5500, () => {
  console.log('🚀 Сервер запущен на http://localhost:5500');
});