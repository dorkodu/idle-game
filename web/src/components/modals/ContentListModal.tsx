import { useAppStore } from "@/stores/appStore";
import { Alert, Flex, Modal } from "@mantine/core";
import Content from "../custom/Content";
import { IMonster } from "@game/core/monster";
import { IItem } from "@game/core/item";
import { game } from "@game/index";
import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

function ContentListModal() {
  const contentList = useAppStore(state => state.modals.contentList);
  const close = () => useAppStore.setState(s => { s.modals.contentList.opened = false });

  const onClickItem = (item: IItem | undefined) => {
    if (!item) return;

    contentList.onClick?.(game.item.id(item));
    close();
  }

  const onClickMonster = (monster: IMonster | undefined) => {
    if (!monster) return;

    contentList.onClick?.(game.monster.id(monster));
    close();
  }

  const onClickRemove = () => {
    contentList.onRemove?.();
    close();
  }

  return (
    <Modal
      opened={contentList.opened} onClose={close}
      centered size={360}
      title="List" zIndex={1000}
    >
      <Flex direction="column">

        <Flex
          justify="center"
          gap="md"
          display={{ base: "grid" }}
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(64px,max-content))" }}
        >
          {contentList.removeable && <Content emoji="❌" onClick={onClickRemove} />}

          {contentList.contents?.map((c, i) =>
            c.item ?
              <Content key={game.item.id(c.item)} item={c.item} onClick={() => onClickItem(c.item)} />
              :
              c.monster ?
                <Content key={game.monster.id(c.monster)} monster={c.monster} onClick={() => onClickMonster(c.monster)} />
                :
                <React.Fragment key={i} />
          )}
        </Flex>

        {contentList.notice &&
          <Alert variant="light" color="blue" title="Hey!" icon={<IconInfoCircle />} w="100%">
            {contentList.notice}
          </Alert>
        }

      </Flex>
    </Modal>
  )
}

export default ContentListModal