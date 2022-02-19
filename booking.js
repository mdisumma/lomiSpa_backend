import { MongoClient } from "mongodb";

const Booking = (app) => {
	const uri =
		"mongodb+srv://LOMISPA:fgDY+V-kL-3S6fM@cluster0.niuhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

	const client = new MongoClient(uri);

	client.connect();

	//BOOKING LIST
	app.get("/booking", async (request, response) => {
		const cursor = client.db("LOMISPA_DB").collection("booking").find();
		const result = await cursor.toArray();
		// console.log(result);
		response.status(200).json(result);
	});

	//BOOKING SUBMISSION
	app.post("/booking", async (request, response) => {
		const result = await client
			.db("LOMISPA_DB")
			.collection("booking")
			.insertOne(request.body);

		console.log(request.body);
		response.status(200).json(request.body);
	});

	//DELETE BOOKING
	app.delete("/booking", async (request, response) => {
		const result = await client
			.db("LOMISPA_DB")
			.collection("booking")
			.deleteOne(request.body);
		console.log(request.body);
		response.status(200).json(request.body);
	});

	client.close();
};

export default Booking;
