import { Button, Flex, Text } from "@mantine/core";
import Emoji from "../Emoji";

interface Props {
  emoji?: string;
  active?: boolean;
  onClick?: () => void;
}

function LayoutButton({ children, emoji, active, onClick }: React.PropsWithChildren<Props>) {
  return (
    <Button
      variant="subtle" c={active ? undefined : "var(--text-color)"}
      p={0} radius={0} w="20%" h="auto"
      onClick={onClick}
    >
      <Flex direction="column" align="center">
        {emoji && <Emoji emoji={emoji} size={24} />}
        <Text fz={10}>{children}</Text>
      </Flex>
    </Button>
  )
}

export default LayoutButton