import { useMemo } from "react";
import twemoji from "twemoji";
import classes from "./Emoji.module.css";

interface Props {
  emoji: string;
  size?: number;
}

function Emoji({ emoji, size, ...props }: React.ComponentPropsWithoutRef<"img"> & Props) {
  const src = useMemo(() => {
    const element = document.createElement("div");
    element.innerHTML = twemoji.parse(
      emoji,
      { ext: ".svg", folder: "svg", base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/" }
    );
    return (element.firstChild as HTMLImageElement).src;
  }, [emoji]);

  return (
    <img
      src={src}
      alt={emoji}
      draggable={false}
      {...props}
      className={classes.emoji}
      style={{ width: size, height: size, ...props.style }}
    />
  )
}

export default Emoji