import ShowPalettes from "@component/components/ShowPalettes";
// import clientPromise from "../../../lib/mongodb";
import FullScreenPalette from "@component/components/FullScreenPalette";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Created({ user_id }) {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [palette, setPalette] = useState(null);
  const [palettes, setPalletes] = useState(null);

  useEffect(()=>{
    const fetch = async () => {
    return await axios.get("/api/palettes/643d911fadff9ee815ca93e3");
    }
    fetch().then((res)=> setPalletes(res.data)).catch(console.error);
  },[])

  return (
    <>
      {palettes && <ShowPalettes
        palettes={palettes}
        setPalette={setPalette}
        openFullScreen={() => setShowFullScreen(true)}
      /> }
      {showFullScreen && (
        <FullScreenPalette
          closeFullScreen={() => setShowFullScreen(false)}
          palette={palette}
        />
      )}
    </>
  );
}


