import { MongoClient } from "mongodb";

const Users = (app) => {
	const uri =
		"mongodb+srv://LOMISPA:fgDY+V-kL-3S6fM@cluster0.niuhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

	const client = new MongoClient(uri);

	client.connect();

	//READ USERS
	app.get("/users", async (request, response) => {
		const result = await client.db("LOMISPA_DB").collection("users").findOne({
			email: "",
			password: "",
		});

		// console.log(result);
		response.status(200).json(result);
	});

	//SINGUP USERS
	app.post("/users", async (request, response) => {
		const result = await client
			.db("LOMISPA_DB")
			.collection("users")
			.insertOne(request.body);

		// console.log(request.body);
		response.status(200).json(request.body);
	});

	client.close();
};

export default Users;
