import { ActionIcon, Flex, Modal, useMantineTheme } from "@mantine/core";
import { PropsWithChildren } from "react";
import { IconArrowLeft } from "@tabler/icons-react";

interface Props {
  opened: boolean;
  onClose: () => void;

  header?: React.ReactNode;
}

function FullscreenModal({ children, opened, onClose, header }: PropsWithChildren<Props>) {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened} onClose={onClose}
      withCloseButton={false} fullScreen
      styles={{ body: { height: "100%" } }} radius={0}
    >
      <Flex
        direction="column"
        mx="auto"
        h="100%" maw={theme.breakpoints.xs}
        pos="relative"
      >

        <Flex align="center" justify="space-between" gap="md" pos="absolute" top={0} left={0} right={0} h={32}>
          <ActionIcon radius="xl" size={32} onClick={onClose}>
            <IconArrowLeft />
          </ActionIcon>

          <Flex justify="end" gap="xs" w="100%">
            {header}
          </Flex>
        </Flex>

        <Flex direction="column" mx="auto" mt={48} w="100%" h="100%">
          {children}
        </Flex>
      </Flex>
    </Modal>
  )
}

export default FullscreenModal