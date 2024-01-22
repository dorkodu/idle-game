import { Button, Card, Divider, Flex, ScrollArea, Text, Title } from "@mantine/core";
import ContentAsset from "@/components/custom/ContentAsset";
import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList";
import Emoji from "@/components/Emoji";
import { game } from "@game/index";
import { IShopItem, IShopSpecialOffer, ShopType } from "@game/types/shop";
import { useApiStore } from "@/stores/apiStore";

function Shop() {
  return (
    <ScrollArea scrollbars="y">
      <Flex direction="column" gap="md">

        <Divider label={<Flex align="center"><Emoji emoji="✨" size={16} />&nbsp;Special Offer</Flex>} />

        <ShopSpecialOffer specialOffer={game.constants.shopSpecialOffer} onBuy={() => { }} />

        <Divider label={<Flex align="center"><Emoji emoji="👑" size={16} />&nbsp;Premium Shop</Flex>} />

        <ContentList gap="xs">
          {game.constants.shopPremium.map((shopItem, i) =>
            <ShopItem key={i} shop="premium" index={i} shopItem={shopItem} />
          )}
        </ContentList>

        <Divider label={<Flex align="center"><Emoji emoji="🪙" size={16} />&nbsp;Gold Shop</Flex>} />

        <ContentList gap="xs">
          {game.constants.shopGold.map((shopItem, i) =>
            <ShopItem key={i} shop="gold" index={i} shopItem={shopItem} />
          )}
        </ContentList>

        <Divider label={<Flex align="center"><Emoji emoji="💎" size={16} />&nbsp;Gem Shop</Flex>} />

        <ContentList gap="xs">
          {game.constants.shopGem.map((shopItem, i) =>
            <ShopItem key={i} shop="gem" index={i} shopItem={shopItem} />
          )}
        </ContentList>

      </Flex>
    </ScrollArea>
  )
}

export default Shop

interface ShopSpecialOfferProps {
  specialOffer: IShopSpecialOffer
  onBuy: () => void;
}

function ShopSpecialOffer({ specialOffer, onBuy }: ShopSpecialOfferProps) {
  return (
    <Card withBorder styles={{ root: { backgroundImage: `url(${import.meta.env.BASE_URL}gggrain.svg)` } }}>
      <Flex direction="column" align="center" gap="xs">

        <ContentAsset size={100} image={specialOffer.asset.image} emoji={specialOffer.asset.emoji} />

        <Title order={3} c="white">{specialOffer.name}</Title>

        <Flex direction="column" w="100%">
          <ContentList gap="xs">
            {specialOffer.items.map(item => <Content key={game.item.id(item)} item={item} />)}
          </ContentList>
        </Flex>

        <Button w="100%" maw={128} onClick={onBuy}>{`Buy for $${specialOffer.money}`}</Button>

      </Flex>
    </Card>
  )
}

interface ShopItemProps {
  shop: ShopType;
  index: number;

  shopItem: IShopItem;
}

function ShopItem({ shop, index, shopItem }: ShopItemProps) {
  const player = useApiStore(state => state.player);

  const onBuy = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.buyShopItem.act(s.player, { shop, index });
    });
  }

  const canBuy = (): boolean => {
    if (!player) return false;

    return game.actions.buyShopItem.actable(player, { shop, index });
  }

  const getLimit = (): number => {
    if (!player) return shopItem.limit;
    return shopItem.limit - (player.shop[shop][index] ?? 0);
  }

  const limit = getLimit();

  return (
    <Flex direction="column" align="center" w={64}>

      <Content item={shopItem.item} />

      <Button fullWidth size="compact-sm" px={0} mt="xs" onClick={onBuy} disabled={!canBuy()}>
        {shopItem.price.money !== undefined && <>${shopItem.price.money}</>}
        {shopItem.price.gem !== undefined && <><Emoji emoji="💎" />&nbsp;{shopItem.price.gem}</>}
        {shopItem.price.gold !== undefined && <><Emoji emoji="🪙" />&nbsp;{shopItem.price.gold}</>}
      </Button>

      <Text size="xs" my="xs">{`Limit ${limit < 0 ? "∞" : limit}`}</Text>

    </Flex>
  )
}