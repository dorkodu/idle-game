import { assets } from "@/assets/assets"
import ContentAsset from "@/components/custom/ContentAsset"
import { Anchor, Button, Flex, Title } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const onNavigate = (ev: MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    const href = ev.currentTarget.href;
    navigate(href.substring(href.lastIndexOf("/")));
  }

  return (
    <Flex direction="column" align="center" gap="md" my="auto">

      <Title size={64}>404</Title>

      <ContentAsset image={assets.monster("death_knight")} size={150} />

      <Flex direction="column" w="100%" maw={360}>
        <Title order={3} ta="center">Whaaat?<br />The page is missing?<br />Who the heaven stole it?</Title>
        <Title order={5} ta="center">- Death Knight</Title>
      </Flex>

      <Anchor onClick={onNavigate} href="/">
        <Button size="md" leftSection={<IconArrowLeft />}>
          Go Back
        </Button>
      </Anchor>

    </Flex>
  )
}

export default NotFound
