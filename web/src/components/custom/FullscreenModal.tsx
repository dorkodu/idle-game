import { ActionIcon, Flex, Modal, useMantineTheme } from "@mantine/core";
import { PropsWithChildren } from "react";
import { IconArrowLeft } from "@tabler/icons-react";

interface Props {
  opened: boolean;
  onClose: () => void;

  withHeader?: boolean;
  header?: React.ReactNode;
}

function FullscreenModal({ children, opened, onClose, withHeader = true, header }: PropsWithChildren<Props>) {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened} onClose={onClose}
      withCloseButton={false} fullScreen radius={0}
      styles={{ body: { height: "100%" } }}
    >
      <Flex
        direction="column"
        mx="auto"
        h="100%" maw={theme.breakpoints.xs}
        pos="relative"
      >

        {withHeader &&
          <Flex align="center" justify="space-between" gap="md" pos="absolute" top={0} left={0} right={0} h={32}>
            <ActionIcon radius="xl" size={32} onClick={onClose}>
              <IconArrowLeft />
            </ActionIcon>

            <Flex justify="end" gap="xs" w="100%">
              {header}
            </Flex>
          </Flex>
        }

        <Flex direction="column" mx="auto" pos="absolute" top={withHeader ? 48 : 0} bottom={0} left={0} right={0}>
          {children}
        </Flex>

      </Flex>
    </Modal>
  )
}

export default FullscreenModal