import express, { NextFunction, Response, Request } from "express";
import env from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { IUser, User } from "../models/UserDataSchema";

env.config();
const app = express();
const port = process.env.NEXT_PUBLIC_PORT ?? 8080;

app.use(express.json());

app.use(express.static("pages"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

if (!process.env.MONGO_URI) throw new Error("ããã");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("ðð");
  })
  .catch((err) => console.log(err));

app.get("/api/user", async (req, res) => {
  try {
    const allUserData = await User.find();
    res.status(200).json(allUserData);
  } catch (err) {
    console.log(`ð§¹${err}`);
  }
});

app.post("/api/user", async (req, res, next) => {
  const body = req.body as IUser;
  // TODO:18æ­³ä»¥ä¸ã¯ç»é²ã§ããªãã®ã§ã¨ã©ã¼ãåãããã«ããã
  try {
    const result = await User.create(body);
    res.status(200).json(result);
  } catch (err) {
    console.log(`ð­${err}`);
    return next("Userãä½ãã¾ããã§ãã");
  }
});

app.use(function (req, res) {
  res.status(404).send("Page Not Found");
});

app.use(function (
  errMessage: string,
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (errMessage) {
    case "Userãä½ãã¾ããã§ãã":
      return res.status(500).json(errMessage);
      break;
  }
  // res.status(500).json({ msg: err.message });
});

app.listen(port, () => {
  console.log(`ðServer start: http://localhost:${port}`);
});
