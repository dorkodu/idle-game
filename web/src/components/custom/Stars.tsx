import Emoji from "../Emoji";

interface Props {
  stars: number;

  size?: number;
}

function Stars({ stars, size = 10 }: Props) {
  return (
    <>
      {[...Array(stars).keys()].map(s => <Emoji key={s} emoji="⭐" size={size} style={{ margin: 0 }} />)}
    </>
  )
}

export default Stars