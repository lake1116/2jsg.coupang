const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect("mongodb://127.0.0.1:27017/orderDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB 연결 성공!"))
.catch(err => console.error("MongoDB 연결 오류:", err));

// 주문 스키마 및 모델 생성
const orderSchema = new mongoose.Schema({
    name: String,
    products: [String],
    total: Number
});

const Order = mongoose.model("Order", orderSchema);

// 주문을 저장하는 API
app.post("/order", async (req, res) => {
    const { name, products, total } = req.body;

    try {
        const newOrder = new Order({ name, products, total });
        await newOrder.save();
        console.log(`주문 저장 완료: ${name}, ${products.join(", ")}, ${total}원`);

        res.json({ message: "주문이 성공적으로 저장되었습니다!" });
    } catch (error) {
        console.error("주문 저장 중 오류 발생:", error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
});

app.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
});
