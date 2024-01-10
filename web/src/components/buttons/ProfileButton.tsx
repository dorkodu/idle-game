import { ActionIcon, Badge, Text } from "@mantine/core";

interface Props {
  onClick?: (ev: React.MouseEvent) => void;
  level?: number;
}

function ProfileButton({ onClick, level }: Props) {
  return (
    <ActionIcon variant="default" radius="md" size={48} onClick={onClick}>
      <Badge variant="default" size="sm" mt={48}>
        <Text>{level}</Text>
      </Badge>
    </ActionIcon>
  )
}

export default ProfileButton