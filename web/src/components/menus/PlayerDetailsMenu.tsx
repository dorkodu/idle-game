import { ActionIcon, Menu } from "@mantine/core"
import { IconDots, IconEdit, IconLogout } from "@tabler/icons-react"

interface Props {

}

function PlayerDetailsMenu({ }: Props) {
  const onEditProfile = () => {

  }

  const onLogout = () => {

  }

  return (
    <>
      <Menu width={200} shadow="md" position="bottom-end">
        <Menu.Target>
          <ActionIcon size={32} radius="xl">
            <IconDots />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<IconEdit size={14} />} onClick={onEditProfile}>
            Edit Username
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item leftSection={<IconLogout size={14} />} color="red" onClick={onLogout}>
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default PlayerDetailsMenu