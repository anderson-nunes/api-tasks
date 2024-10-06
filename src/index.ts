import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { users } from "./router/users";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", users);

app.use("/status", (req, resp) => {
  resp.send("api esta funcionando");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`);
});
