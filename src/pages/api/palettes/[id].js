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

    // Process a DELETE request
    if (req.method === "DELETE") {
      const { id } = req.query;
      console.log("This is the id in req.body", req.query);
      if (!id) {
        console.log("No palette ID was found!");
        res.json({
          message: `Failed to delete this palette.`,
          success: false,
        });
      }
      console.log("Palette id to be deleted received at server.", id);

      const result = await db
        .collection("palettes")
        .deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1)
        res.json({
          message: `Successfully deleted document with id ${id}`,
          success: true,
        });
      else
        res.json({
          message: `Failed to delete this palette ${id}`,
          success: false,
        });
    }

    // Process a GET request for users palettes
    if (req.method === "GET") {
      const { id } = req.query;
      const palettes = await db
        .collection("palettes")
        .find({ user_id: new ObjectId(id) })
        .toArray();

      res.json(palettes);
    }
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
