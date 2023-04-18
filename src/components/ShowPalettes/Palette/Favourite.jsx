import { useState } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

export default function Favourite() {
  const [heart, setHeart] = useState(false);
  const handleClick = () => {
    setHeart((prev) => !prev);
  };
  return (
    <>
      {heart ? (
        <FavoriteRoundedIcon onClick={handleClick} />
      ) : (
        <FavoriteBorderRoundedIcon onClick={handleClick} />
      )}
    </>
  );
}
