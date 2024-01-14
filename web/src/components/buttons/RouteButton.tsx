import Emoji from "@/components/Emoji"
import { Button, Flex, Title } from "@mantine/core"
import { PropsWithChildren } from "react";

interface Props {
  emoji: string;
  title: string;
  onClick: () => void;
}

function RouteButton({ children, emoji, title, onClick }: PropsWithChildren<Props>) {
  return (
    <Button p="md" h="auto" variant="default" styles={{ label: { flex: 1 } }} onClick={onClick}>
      <Flex gap="md" w="100%">
        <Emoji emoji={emoji} size={32} style={{ flexShrink: 0 }} />
        <Flex justify="center" direction="column" w="100%">
          <Title ta="left" order={5}>{title}</Title>
          {children}
        </Flex>
      </Flex>
    </Button>
  )
}

export default RouteButton