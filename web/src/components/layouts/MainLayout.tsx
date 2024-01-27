import { ActionIcon, Anchor, Button, Divider, Flex, Image, Title, useMantineTheme } from "@mantine/core"
import { IconBrandDiscord, IconBrandX } from "@tabler/icons-react";
import { MouseEvent } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { footer, footerTopSection, glow, header } from "./GameLayout.css";

function MainLayout() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const onNavigate = (ev: MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    const href = ev.currentTarget.href;
    navigate(href.substring(href.lastIndexOf("/")));
  }

  return (
    <>
      <Flex
        align="center" justify="space-between"
        px="xs" mx="auto" maw={theme.breakpoints.xs} h={64}
        pos="fixed" top={0} left={0} right={0}
        className={`${header} ${glow}`}
      >
        <Anchor onClick={onNavigate} href="/" underline="never">
          <Flex align="center" gap="md">
            <Image src={`${import.meta.env.BASE_URL}icon-512.png`} w={48} h={48} />
            <Title order={3} c="#fff">Idle Demo</Title>
          </Flex>
        </Anchor>

        <Button onClick={onNavigate} component="a" href="/campaign">
          Play Now
        </Button>
      </Flex>

      <Flex
        direction="column"
        px="xs" pt={64} mx="auto" maw={theme.breakpoints.xs} mih="100%"
        pos="relative"
      >
        <Outlet />
      </Flex>

      <Flex
        direction="column" gap="md"
        p="md" mx="auto" maw={theme.breakpoints.xs}
        className={`${footer} ${glow}`}
      >

        <Flex className={footerTopSection} align="start">
          <Anchor href="https://dorkodu.com" target="_blank" mb="xs" style={{ display: "inline-block" }}>
            <Image src={`${import.meta.env.BASE_URL}dorkodu-logo.svg`} w={200} />
          </Anchor>

          <Flex direction="column" align="start">
            <Title order={4}>Resources</Title>
            <Anchor onClick={onNavigate} component="a" href="/privacy-policy">Privacy Policy</Anchor>
            <Anchor onClick={onNavigate} component="a" href="/terms-of-service">Terms of Service</Anchor>
          </Flex>
        </Flex>

        <Divider size="md" />

        <Flex align="center" justify="space-between">
          <Title order={5}>© Dorkodu {new Date().getFullYear()}</Title>

          <Flex gap={5}>
            <ActionIcon size={32} variant="light" onClick={onNavigate} component="a" href="/">
              <IconBrandX />
            </ActionIcon>
            <ActionIcon size={32} variant="light" onClick={onNavigate} component="a" href="/">
              <IconBrandDiscord />
            </ActionIcon>
          </Flex>
        </Flex>

      </Flex>
    </>
  )
}

export default MainLayout