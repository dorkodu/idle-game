import Emoji from "@/components/Emoji"
import { Button, Flex, Title } from "@mantine/core"

interface Props {
  emoji: string;
  title: string;
  onClick: () => void;
}

function RouteButton({ emoji, title, onClick }: Props) {
  return (
    <Button p="md" h="auto" variant="default" styles={{ label: { flex: 1 } }} onClick={onClick}>
      <Flex align="center" gap="md">
        <Emoji emoji={emoji} size={32} />
        <Title order={5}>{title}</Title>
      </Flex>
    </Button>
  )
}

export default RouteButton