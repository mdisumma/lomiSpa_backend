import { MongoClient } from "mongodb";

const Services = (app) => {
	const uri =
		"mongodb+srv://LOMISPA:fgDY+V-kL-3S6fM@cluster0.niuhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

	const client = new MongoClient(uri);

	client.connect();

	//READ SERVICES
	app.get("/services", async (request, response) => {
		const cursor = client.db("LOMISPA_DB").collection("services").find();
		const result = await cursor.toArray();
		// console.log(result);
		response.status(200).json(result);
	});

	//INSERT SERVICE
	app.post("/services", async (request, response) => {
		const result = await client
			.db("LOMISPA_DB")
			.collection("services")
			.insertOne(request.body);
		console.log(request.body);
		response.status(200).json(request.body);
	});

	//DELETE SERVICE
	app.delete("/services", async (request, response) => {
		const result = await client
			.db("LOMISPA_DB")
			.collection("services")
			.deleteOne(request.body);
		console.log(request.body);
		response.status(200).json(request.body);
	});

	client.close();
};

export default Services;
