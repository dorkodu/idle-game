import { Button, Flex, Image, Title } from "@mantine/core";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <Flex direction="column" gap="md" p="md">

      <Flex align="center" justify="space-between">
        <Flex align="center" gap="md">
          <Image src="/favicon.svg" w={40} h={40} />
          <Title order={4}>App Template</Title>
        </Flex>

        <Button.Group>
          <Button variant="default">Services</Button>
          <Button variant="default">About</Button>
          <Button variant="default">FAQ</Button>
        </Button.Group>

        <Button>Contact Us</Button>
      </Flex>

      <Outlet />

    </Flex>
  )
}

export default MainLayout