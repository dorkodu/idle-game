import { Button, Flex, Image, Title } from "@mantine/core"
import Emoji from "../Emoji";
import { util } from "@/lib/util";
import type { Tier } from "@game/types/tier";
import { IMonster } from "@game/core/monster";
import { assets } from "@/assets/assets";
import { IItem } from "@game/core/item";

interface Props {
  onClick?: (ev: React.MouseEvent) => void;

  item?: IItem | null;
  monster?: IMonster | null;

  image?: string;
  emoji?: string;
  hStars?: number;
  vStars?: number;
  tCount?: number;
  bCount?: number;
  tier?: Tier;

  placeholder?: string;
  hideCount?: boolean;
  disabled?: boolean;
}

function Content({ onClick, item, monster, image, emoji, hStars, vStars, tCount, bCount, tier = "F", placeholder, hideCount, disabled }: Props) {
  if (item) {
    const asset = assets.item(item.id);
    if (asset.image) image = asset.image;
    else if (asset.emoji) emoji = asset.emoji;

    tier = item.tier;
    vStars = item.stars;
    bCount = item.count;
  }
  if (monster) {
    image = assets.monster(monster.id);
    hStars = monster.stars;
    tCount = monster.level;
  }

  return (
    <Button
      variant="default" p={0} w={64} h={64} pos="relative" disabled={disabled}
      onClick={onClick}
      style={{
        "--button-bd": `2px solid ${assets.tierColors[tier]}`,
        "--button-bg": `${assets.tierColors[tier]}44`,
        "--button-hover": `${assets.tierColors[tier]}66`,
      }}
    >
      {image &&
        <Image
          src={image} width={32} height={32}
          style={{ imageRendering: "pixelated" }}
          draggable={false}
        />
      }

      {emoji && <Emoji emoji={emoji} style={{ width: 32, height: 32 }} />}

      {!item && !monster && placeholder &&
        <Image
          src={placeholder} width={32} height={32}
          style={{ imageRendering: "pixelated", filter: "blur(1px) contrast(50%)" }}
          draggable={false}
        />
      }

      {vStars !== undefined &&
        <Flex direction="column" pos="absolute" bottom={4} left={4}>
          {[...Array(vStars).keys()].map(s => <Emoji key={s} emoji="⭐" size={10} style={{ margin: 0 }} />)}
        </Flex>
      }

      {hStars !== undefined &&
        <Flex pos="absolute" bottom={4} left="50%" style={{ transform: "translate(-50%,0)" }}>
          {[...Array(hStars).keys()].map(s => <Emoji key={s} emoji="⭐" size={10} style={{ margin: 0 }} />)}
        </Flex>
      }

      {tCount !== undefined && !hideCount &&
        <Title order={5} pos="absolute" right={4} top={0} c="var(--text-color)">
          {util.formatNumber(tCount)}
        </Title>
      }

      {bCount !== undefined && !hideCount &&
        <Title order={5} pos="absolute" right={4} bottom={0} c="var(--text-color)">
          {util.formatNumber(bCount)}
        </Title>
      }
    </Button>
  )
}

export default Content