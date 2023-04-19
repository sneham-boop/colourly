import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

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
      const { colors: colours } = req.body;

      if (!colours) {
        console.log("No colors were found!");
        res.json({
          message: `Failed to add new palette`,
          success: false,
        });
      }
      
      const likes = Math.floor(Math.random() * 2000 + 100);
      const palette = {
        colours,
        likes,
        user_id: new ObjectId("643d9048adff9ee815ca93db"),
      };
      const result = await db.collection("palettes").insertOne(palette);
      if (result.insertedId)
        res.json({
          message: `Successfully added document with id ${result.insertedId}`,
          success: true,
        });
      else
        res.json({
          message: `Failed to add new palette`,
          success: false,
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
