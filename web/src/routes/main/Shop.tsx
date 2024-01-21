import { Button, Card, Divider, Flex, ScrollArea, Text, Title } from "@mantine/core";
import ContentAsset from "@/components/custom/ContentAsset";
import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList";
import Emoji from "@/components/Emoji";
import { game } from "@game/index";
import { IShopItem, IShopSpecialOffer } from "@game/types/shop";

function Shop() {
  return (
    <ScrollArea scrollbars="y">
      <Flex direction="column" gap="md">

        <Divider label={<Flex align="center"><Emoji emoji="✨" size={16} />&nbsp;Special Offer</Flex>} />

        <ShopSpecialOffer specialOffer={game.constants.shopSpecialOffer} />

        <Divider label={<Flex align="center"><Emoji emoji="👑" size={16} />&nbsp;Premium Shop</Flex>} />

        <ContentList gap="xs">
          {game.constants.shopPremium.map(shopItem => <ShopItem shopItem={shopItem} />)}
        </ContentList>

        <Divider label={<Flex align="center"><Emoji emoji="🪙" size={16} />&nbsp;Gold Shop</Flex>} />

        <ContentList gap="xs">
          {game.constants.shopGold.map(shopItem => <ShopItem shopItem={shopItem} />)}
        </ContentList>

        <Divider label={<Flex align="center"><Emoji emoji="💎" size={16} />&nbsp;Gem Shop</Flex>} />

        <ContentList gap="xs">
          {game.constants.shopGem.map(shopItem => <ShopItem shopItem={shopItem} />)}
        </ContentList>

      </Flex>
    </ScrollArea>
  )
}

export default Shop

function ShopSpecialOffer({ specialOffer }: { specialOffer: IShopSpecialOffer }) {
  return (
    <Card withBorder styles={{ root: { backgroundImage: `url(${import.meta.env.BASE_URL}gggrain.svg)` } }}>
      <Flex direction="column" align="center" gap="xs">

        <ContentAsset size={100} image={specialOffer.asset.image} emoji={specialOffer.asset.emoji} />

        <Title order={3} c="white">{specialOffer.name}</Title>

        <Flex direction="column" w="100%">
          <ContentList gap="xs">
            {specialOffer.items.map(item => <Content item={item} />)}
          </ContentList>
        </Flex>

        <Button w="100%" maw={128}>{`Buy for $${specialOffer.money}`}</Button>

      </Flex>
    </Card>
  )
}

function ShopItem({ shopItem }: { shopItem: IShopItem }) {
  return (
    <Flex direction="column" align="center" w={64}>

      <Content item={shopItem.item} />

      <Button fullWidth size="compact-sm" px={0} mt="xs">
        {shopItem.price.money !== undefined && <>${shopItem.price.money}</>}
        {shopItem.price.gem !== undefined && <><Emoji emoji="💎" />&nbsp;{shopItem.price.gem}</>}
        {shopItem.price.gold !== undefined && <><Emoji emoji="🪙" />&nbsp;{shopItem.price.gold}</>}
      </Button>

      <Text size="xs" my="xs">{`Limit ${1 < 0 ? "∞" : 1}`}</Text>

    </Flex>
  )
}