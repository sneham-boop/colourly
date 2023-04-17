import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    // Connect to db
    const client = await clientPromise;
    if (!client) {
      res.json({ error: "Could not connect to database." });
      return;
    }
    const db = client.db("colourly-db");

    // Process a POST request
    if (req.method === "POST") {
      const palette = {
        colours: ["ffd60a", "ffc300", "003566", "f8ad9d", "e5989b"],
      };
      const result = await db.collection("palettes").insertOne(palette);
      if (result.insertedId)
        res.json({
          message: `Successfully added document with id ${result.insertedId}`,
        });
      else
        res.json({
          message: `Failed to add new palette`,
        });
    }

    // Process a GET request
    if (req.method === "GET") {
      const palettes = await db
        .collection("palettes")
        .find({})
        .limit(10)
        .toArray();

      res.json(palettes);
    }
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
