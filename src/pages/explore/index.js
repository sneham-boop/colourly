import ShowPalettes from "@component/components/ShowPalettes";
import clientPromise from "../../../lib/mongodb";
import FullScreenPalette from "@component/components/FullScreenPalette";
import { useState } from "react";

export default function Explore({ palettes }) {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [palette, setPalette] = useState(null);

  return (
    <>
      <ShowPalettes
        palettes={palettes}
        setPalette={setPalette}
        openFullScreen={() => setShowFullScreen(true)}
      />
      {showFullScreen && (
        <FullScreenPalette
          closeFullScreen={() => setShowFullScreen(false)}
          palette={palette}
        />
      )}
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
