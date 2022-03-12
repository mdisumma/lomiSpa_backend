import express from "express";
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

import Services from "./services.js";
import Users from "./users.js";
import Booking from "./booking.js";

// EXPRESS
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log("/build", __dirname);

// app.use(express.static(path.join(__dirname, "/build")));
//SERVICES
Services(app);
Users(app);
Booking(app);

//ROUTER
app.get("/", (req, res) => res.send(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
