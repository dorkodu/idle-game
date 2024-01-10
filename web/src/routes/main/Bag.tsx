import Content from "@/components/custom/Content"
import ContentList from "@/components/custom/ContentList"
import { Card, Flex, SegmentedControl } from "@mantine/core"

function Bag() {
  return (
    <Card withBorder pb={0} h="100%">
      <Flex direction="column" gap="md" h="100%">

        <SegmentedControl
          mx="auto" w="100%" maw={360} style={{ flexShrink: 0 }}
          data={[
            { value: "hero", label: "Heroes" },
            { value: "item", label: "Items" },
          ]}
        />

        <ContentList>
          <Content tier="S" />
          <Content tier="A" />
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