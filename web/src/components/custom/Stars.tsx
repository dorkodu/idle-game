import { assets } from "@/assets/assets";
import { useMemo } from "react";

interface Props {
  stars: number;

  size?: number;
}

function Stars({ stars, size = 10 }: Props) {
  const _stars = useMemo((): number => {
    if (stars < 6) return stars;
    else if (stars < 9) return stars - 5;
    else if (stars < 12) return stars - 5 - 3;
    return 0;
  }, [stars]);

  const _src = useMemo((): string | undefined => {
    if (stars < 6) return assets.asset("yellow_star.svg");
    else if (stars < 9) return assets.asset("red_star.svg");
    else if (stars < 12) return assets.asset("transcended_star.svg");
    return undefined;
  }, [stars]);

  return (
    <>
      {[...Array(_stars).keys()].map(s =>
        <img key={s} src={_src} width={size} height={size} />
      )}
    </>
  )
}

export default Stars