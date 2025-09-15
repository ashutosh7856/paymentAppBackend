import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server si running on ${PORT}`);
});
//# sourceMappingURL=index.js.map