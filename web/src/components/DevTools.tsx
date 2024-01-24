import { ActionIcon, Card, Flex, Title } from '@mantine/core';
import Draggable from 'react-draggable';
import { draggable, handle } from './DevTools.css';
import { IconX } from '@tabler/icons-react';
import { useHotkeys } from '@mantine/hooks';
import { useState } from 'react';

function DevTools() {
  const [open, setOpen] = useState(false);
  useHotkeys([["Backquote", () => setOpen(!open)]]);

  if (!open) return null;
  return (
    <Draggable defaultClassName={draggable} bounds="body" handle=".handle">
      <Card>
        <Flex direction="column" gap="md">

          <Flex justify="space-between" gap="md">
            <Title order={5} className={`handle ${handle}`}>Dev Tools</Title>
            <ActionIcon size={32} onClick={() => setOpen(false)}><IconX /></ActionIcon>
          </Flex>



        </Flex>
      </Card>
    </Draggable>
  )
}

export default DevTools