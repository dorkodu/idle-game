import { useAppStore } from "@/stores/appStore";
import { Badge, Flex, Image, Modal, Title } from "@mantine/core";
import Emoji from "../Emoji";
import { game } from "@game/index";
import { assets } from "@/assets/assets";
import Stats from "../custom/Stats";
import Stars from "../custom/Stars";
import TierBadge from "../custom/TierBadge";
import { util } from "@/lib/util";

function ItemDetailsModal() {
  const itemDetails = useAppStore(state => state.modals.itemDetails);
  const close = () => useAppStore.setState(s => { s.modals.itemDetails.opened = false });

  const item = itemDetails.item;

  const asset = item ? assets.item(item.id) : undefined;

  const data = item ? game.items[item.id] : undefined;
  const stats = data && data.type !== "other" ? data.stats : undefined;

  return (
    <Modal
      opened={itemDetails.opened} onClose={close}
      centered lockScroll={false} size={360}
      title="Item Details"
    >
      <Flex direction="column" align="center" gap="xs">
        {item &&
          <>
            {asset?.image && <Image src={asset.image} w={100} h={100} style={{ imageRendering: "pixelated" }} />}
            {asset?.emoji && <Emoji emoji={asset.emoji} size={100} style={{ margin: 0 }} />}

            <Title ta="center" order={5}>{item.id}</Title>

            {item.stars > 0 &&
              <Flex gap={5}>
                <Stars stars={item.stars} size={16} />
              </Flex>
            }

            {!item.id.startsWith("ot") &&
              <TierBadge tier={item.tier} />
            }

            {stats && <Stats stats={stats} />}

            <Badge size="xl">{util.formatNumber(item.count, true)}</Badge>
          </>
        }
      </Flex>
    </Modal>
  )
}

export default ItemDetailsModal