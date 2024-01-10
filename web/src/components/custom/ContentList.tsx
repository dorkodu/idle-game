import { Card, Flex, ScrollArea } from "@mantine/core"

interface Props {

}

function ContentList({ children }: React.PropsWithChildren<Props>) {
  return (
    <ScrollArea>
      <Flex
        justify="center"
        gap="md"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(64px,max-content))" }}
      >
        {children}
      </Flex>
    </ScrollArea>
  )
}

export default ContentList