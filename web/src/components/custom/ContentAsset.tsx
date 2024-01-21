import { Image } from "@mantine/core"
import Emoji from "../Emoji";

interface Props {
  size?: number;

  image?: string;
  emoji?: string;
}

function ContentAsset({ size = 32, image, emoji }: Props) {
  return (
    <>
      {image &&
        <Image
          src={image} width={size} height={size}
          style={{ imageRendering: "pixelated" }}
          draggable={false}
        />
      }

      {emoji && <Emoji emoji={emoji} size={size} />}
    </>
  )
}

export default ContentAsset