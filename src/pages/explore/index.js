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
        heading="EXPLORE"
        description="Check out the palettes created by other awesome people like you. Hover
        on a color to see its value and click on it to copy."
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
