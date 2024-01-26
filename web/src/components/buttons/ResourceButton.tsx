import { util } from "@/lib/util";
import { ActionIcon, Card, Flex, Text, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Emoji from "../Emoji";

interface ResourceCardProps {
  emoji?: string;

  count?: number;
  button?: boolean;

  onClick?: () => void;
}

function ResourceButton({ emoji, count, button, onClick }: ResourceCardProps) {
  return (
    <Card withBorder radius="md" p={0} w="100%" maw={128}>
      <Flex align="center">
        {emoji && <Emoji emoji={emoji} size={24} />}

        <Tooltip
          label={util.formatNumber(count || 0, true)}
          events={{ hover: true, focus: false, touch: true }}
        >
          <Text ta="center" style={{ flex: 1 }}>{util.formatNumber(count || 0)}</Text>
        </Tooltip>

        {button &&
          <ActionIcon onClick={onClick}>
            <IconPlus />
          </ActionIcon>
        }

      </Flex>
    </Card>
  )
}

export default ResourceButton