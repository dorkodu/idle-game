import Content from "@/components/custom/Content"
import ContentList from "@/components/custom/ContentList"
import { Card, Flex, SegmentedControl } from "@mantine/core"

function Bag() {
  return (
    <Card withBorder h="100%">
      <Flex direction="column" gap="md" h="100%">

        <SegmentedControl
          mx="auto" w="100%" maw={360} style={{ flexShrink: 0 }}
          data={[
            { value: "hero", label: "Heroes" },
            { value: "item", label: "Items" },
          ]}
        />

        <ContentList>
          <Content item={{ id: "am_cameo_blue", count: 1, stars: 5, tier: "A" }} />
          <Content monster={{ id: "angel", level: 1, stars: 1, uid: "" }} />
          <Content tier="B" />
          <Content tier="C" />
          <Content tier="D" />
          <Content tier="E" />
          <Content tier="F" />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
        </ContentList>

      </Flex >
    </Card >
  )
}

export default Bag