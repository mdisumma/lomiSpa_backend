import express from "express";
import cors from "cors";
import Services from "./services.js";

// EXPRESS
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//SERVICES
Services(app);

//ROUTER
app.get("/", (req, res) => res.send(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
