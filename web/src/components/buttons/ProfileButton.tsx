import { assets } from "@/assets/assets";
import { ActionIcon, Badge, Text } from "@mantine/core";
import ContentAsset from "../custom/ContentAsset";

interface Props {
  onClick?: (ev: React.MouseEvent) => void;
  level?: number;
}

function ProfileButton({ onClick, level }: Props) {
  return (
    <ActionIcon variant="default" radius="md" size={48} onClick={onClick}>
      <ContentAsset image={assets.monster("angel")} />
      <Badge variant="default" size="sm" pos="absolute" top="100%" style={{ transform: "translate(0,-50%)" }}>
        <Text>{level}</Text>
      </Badge>
    </ActionIcon>
  )
}

export default ProfileButton