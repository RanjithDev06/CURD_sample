const express = require("express");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const userRouter = require("./routers/user");
const responseMiddleWare = require("./middleware/response.middleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("port", port);
app.use(responseMiddleWare);

app.use("/", userRouter);

app.listen(port, () => {
    console.log("Port is up an runing " + port);
});
