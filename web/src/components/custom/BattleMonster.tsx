import { Flex, Image, Progress, Text } from "@mantine/core"
import { assets } from "@/assets/assets";
import { game } from "@game/index";
import { useState } from "react";
import { util } from "@/lib/util";
import { textShadow } from "@/styles/shared.css";
import classes from "./BattleMonster.module.css";
import { IBattleMonster } from "@game/core/monster";

interface Props {
  monster?: IBattleMonster;
}

function BattleMonster({ monster }: Props) {
  const [blur, setBlur] = useState(false);

  const maxHealth = monster ? game.stats.value(monster.stats.health) : 0;
  const health = monster?.health ?? 0;
  const energy = monster?.energy ?? 0;

  const healthValue = (health / maxHealth) * 100;
  const energyValue = (energy / game.constants.maxEnergy) * 100;
  const isAlive = health > 0;

  if (!monster) return <div style={{ width: 64, height: 100 }} />
  return (
    <Flex direction="column" justify="center" w={64} h={100} pos="relative">

      <Flex direction="column" gap={1} mb="xs">
        <Progress value={util.clampNumber(healthValue, 0, 100)} size="sm" radius="xs"
          styles={{ section: { transition: "width 100ms linear 0s" } }}
          onTransitionEnd={() => { !isAlive && setBlur(true) }}
        />
        <Progress value={util.clampNumber(energyValue, 0, 100)} size="xs" radius="md" color="red"
          styles={{ section: { transition: "width 100ms linear 0s" } }}
        />
      </Flex>

      <div style={{ width: 64, height: 64, position: "relative" }}>

        <Image
          src={assets.monster(monster?.id)} width={64} height={64}
          draggable={false}
          style={{
            imageRendering: "pixelated",
            filter: blur ? "blur(2px)" : undefined,
            visibility: monster.animation?.id !== "hit" ? "visible" : "hidden",
          }}
        />

        {monster.animation?.id === "hit" &&
          <Image
            src={assets.monster(monster?.id)} width={64} height={64} pos="absolute"
            draggable={false}
            style={{
              imageRendering: "pixelated",
              animation: `${classes.hit} 0.5s 1 forwards`,
            }}
            key={monster.animation?.anim}
          />
        }

      </div>

      <Text ta="center" fw="bold">{monster.level}</Text>

      {monster.animation?.id === "getHit" &&
        <Text
          className={textShadow} ta="center" fw="bold" c="white"
          pos="absolute" w="100%"
          style={{ animation: `${classes.getHit} 0.5s 1 forwards` }}
          key={monster.animation.anim}
        >
          -{util.formatNumber(monster.animation.data.damage)}
        </Text>
      }

    </Flex>
  )
}

export default BattleMonster