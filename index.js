import express from "express";
import cors from "cors";
import "dotenv/config";
import Stripe from "stripe";

import Services from "./services.js";
import Users from "./users.js";
import Booking from "./booking.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log("/build", __dirname);
// console.log(path.join(__dirname, "/build", "index.html"));
// console.log(import.meta.url);

// EXPRESS
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

//SERVICES
Services(app);
Users(app);
Booking(app);

//STRIPE PaymentGatway
const stripe = new Stripe(
	"sk_test_51KdsopL6aPjGx3LqwwEUvUnOTULQR7LZsEmerWieQErPvY0MZKTu9JdDOQclkcnJ8S7tM0M82r4Snn0vLmqx9sqb00QPuMH8Vg"
);
app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body;
	console.log(req.body);
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			description: "Lomi service",
			payment_method: id,
			confirm: true,
		});
		console.log("Payment", payment);
		res.json({
			message: "Payment successful",
			success: true,
		});
	} catch (error) {
		console.log("Error", error);
		res.json({
			message: "Payment failed",
			success: false,
		});
	}
});

//ROUTER
app.get("/", (req, res) => res.send(`server running on port ${PORT}`));

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
