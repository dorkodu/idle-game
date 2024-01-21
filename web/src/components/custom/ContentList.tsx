import { Flex, MantineSize, ScrollArea } from "@mantine/core"

interface Props {
  gap?: MantineSize;
}

function ContentList({ children, gap }: React.PropsWithChildren<Props>) {
  return (
    <ScrollArea>
      <Flex
        justify="center"
        gap={gap ?? "md"}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(64px,max-content))" }}
      >
        {children}
      </Flex>
    </ScrollArea>
  )
}

export default ContentList