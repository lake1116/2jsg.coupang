// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/itemsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 스키마 수정 (이름 + 물품 저장)
const itemSchema = new mongoose.Schema({
  name: String,
  item: String,
});

const Item = mongoose.model('Item', itemSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// 홈 페이지 - 데이터 조회
app.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

// 데이터 추가 (이름 + 물품)
app.post('/add', async (req, res) => {
  const newItem = new Item({ 
    name: req.body.name, 
    item: req.body.item 
  });
  await newItem.save();
  res.redirect('/');
});

// 데이터 삭제
app.post('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// 데이터 수정 페이지
app.get('/edit/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('edit', { item });
});

// 데이터 수정 처리
app.post('/edit/:id', async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, { 
    name: req.body.name, 
    item: req.body.item 
  });
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
