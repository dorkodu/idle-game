import { Button, Card, Divider, Flex, ScrollArea, Text, Title } from "@mantine/core";
import ContentAsset from "@/components/custom/ContentAsset";
import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList";
import Emoji from "@/components/Emoji";
import { game } from "@game/index";

function Shop() {
  return (
    <ScrollArea scrollbars="y">
      <Flex direction="column" gap="md">

        <Divider label={<Flex align="center"><Emoji emoji="✨" size={16} />&nbsp;Special Offer</Flex>} />

        <Card withBorder styles={{ root: { backgroundImage: "url(/gggrain.svg)" } }}>
          <Flex direction="column" align="center" gap="xs">
            <ContentAsset size={100} emoji="🗞" />
            <Title order={3} c="white">Monster Package</Title>

            <Flex direction="column" w="100%">
              <ContentList gap="xs">
                <Content item={game.constants.createMonsterScroll(1000)} />
                <Content item={game.constants.createGem(10_000)} />
              </ContentList>
            </Flex>

            <Button w="100%" maw={128}>Buy for $8.88</Button>
          </Flex>
        </Card>

        <Divider label={<Flex align="center"><Emoji emoji="🪙" size={16} />&nbsp;Gold Shop</Flex>} />

        <ContentList gap="xs">

          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />

          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />

        </ContentList>

        <Divider label={<Flex align="center"><Emoji emoji="💎" size={16} />&nbsp;Gem Shop</Flex>} />

        <ContentList gap="xs">

          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />

          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />

        </ContentList>

      </Flex>
    </ScrollArea>
  )
}

export default Shop

function ShopItem() {
  return (
    <Flex direction="column" align="center" w={64}>
      <Content emoji="🪙" />
      <Button fullWidth size="compact-sm" px={0} mt="xs">
        <Emoji emoji="🪙" />&nbsp;123K
      </Button>
      <Text size="xs" my="xs">Limit ∞</Text>
    </Flex>
  )
}