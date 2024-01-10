import { assets } from "@/assets/assets";
import { Tier } from "@game/types/tier";
import { Badge } from "@mantine/core";

interface Props {
  tier: Tier;
}

function TierBadge({ tier }: Props) {
  return (
    <Badge variant="light" c={assets.tierColors[tier]} bg={assets.tierColorsBg[tier]}>
      {`${tier} Tier`}
    </Badge>
  )
}

export default TierBadge