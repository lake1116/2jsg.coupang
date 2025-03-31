const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // .env 파일을 사용하기 위해 필요

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB 연결 성공!"))
    .catch((err) => console.error("MongoDB 연결 실패:", err));

// 주문 스키마 및 모델 생성
const orderSchema = new mongoose.Schema({
    name: String,
    products: String, // 배열 대신 문자열로 저장 (selectedProducts.join(', '))
    total: String // toLocaleString()된 값 저장
});

const Order = mongoose.model("Order", orderSchema);

// 주문 저장 API
app.post("/order", async (req, res) => {
    const { name, products, total } = req.body;

    try {
        const newOrder = new Order({ name, products, total });
        await newOrder.save();
        console.log(`주문 저장 완료: ${name}, ${products}, ${total}`);

        res.json({ message: "주문이 성공적으로 저장되었습니다!" });
    } catch (error) {
        console.error("주문 저장 중 오류 발생:", error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
});

app.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${3000}`);
});
