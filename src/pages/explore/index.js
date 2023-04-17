import ShowPalettes from "@component/components/ShowPalettes";
import clientPromise from "../../../lib/mongodb";

export default function Explore({ palettes }) {
  return (
    <>
      <ShowPalettes palettes={palettes} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Connect to db
    const client = await clientPromise;
    const db = await client.db("colourly-db");

    const results = await db
      .collection("palettes")
      .find({})
      .limit(10)
      .toArray();
    return {
      props: {
        palettes: JSON.parse(JSON.stringify(results)),
      },
    };
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
