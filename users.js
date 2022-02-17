import { MongoClient } from "mongodb";

const Users = (app) => {
	const uri =
		"mongodb+srv://LOMISPA:fgDY+V-kL-3S6fM@cluster0.niuhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

	const client = new MongoClient(uri);

	client.connect();

	//USERS LIST
	app.get("/users", async (request, response) => {
		const cursor = client.db("LOMISPA_DB").collection("users").find();
		const result = await cursor.toArray();
		// console.log(result);
		response.status(200).json(result);
	});

	//LOGIN USERS
	app.get("/user", async (request, response) => {
		const result = await client
			.db("LOMISPA_DB")
			.collection("users")
			.findOne(request.body);

		// console.log(result);
		response.status(200).json(result);
	});

	//SINGUP USERS
	app.post("/user", async (request, response) => {
		const result = await client
			.db("LOMISPA_DB")
			.collection("users")
			.insertOne(request.body);

		// console.log(request.body);
		response.status(200).json(request.body);
	});

	//DELETE USER
	app.delete("/user", async (request, response) => {
		const result = await client
			.db("LOMISPA_DB")
			.collection("users")
			.deleteOne(request.body);
		console.log(request.body);
		response.status(200).json(request.body);
	});

	client.close();
};

export default Users;
