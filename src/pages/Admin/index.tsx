import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import * as S from './styles'

import {
  menusDataAdmin,
  menusDataPublic,
  IMenu,
  privateMenusData
} from '@/data/menus'

import { Avatar, Dropdown, type MenuProps, theme, Spin } from 'antd'

import { formatUsername } from '@/utils/functions/formatUsername'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

const Admin = () => {
  const { isAdminSuper } = useAdminAuth()

  const menus = isAdminSuper ? menusDataAdmin : menusDataPublic

  const [menuId, setMenuId] = useState(menus[0].menuId)
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false)

  // const menuMobileRef = useRef(null)

  const viewToRender = useMemo(() => {
    const activeMenuItem = menus.find((menuItem) => menuItem.menuId === menuId)

    return activeMenuItem ? (
      activeMenuItem.menuRender
    ) : (
      <>View naão encontrada</>
    )
  }, [menuId, menus])

  const toggleMenuMobile = () => setIsMenuMobileOpen(!isMenuMobileOpen)
  const closeMenuMobile = () => setIsMenuMobileOpen(false)

  // useClickOutside({
  //   active: isMenuMobileOpen,
  //   containerRef: menuMobileRef,
  //   onClickOutside: () => setIsMenuMobileOpen(false)
  // })

  return (
    <S.Admin>
      <S.AdminHeader>
        <S.AdminHeaderLogo>
          <h1>Sistema de Estoque</h1>
        </S.AdminHeaderLogo>
        <S.AdminHeaderNavigation>
          {menus.map((menu: IMenu) => {
            const isMenuActive = menu.menuId === menuId

            return (
              <S.NavigationLink
                key={menu.menuId}
                active={isMenuActive ? 1 : 0}
                onClick={() => setMenuId(menu.menuId)}
              >
                {menu.menuLabel}
              </S.NavigationLink>
            )
          })}
        </S.AdminHeaderNavigation>
        <S.AdminHeaderUserInfos>
          <UserMenu setMenuId={setMenuId} menus={menus} />
        </S.AdminHeaderUserInfos>
      </S.AdminHeader>
      <S.AdminViews>{viewToRender}</S.AdminViews>
    </S.Admin>
  )
}

export default Admin

// ============================================== USER MENU

interface IUserMenu {
  setMenuId: any
  menus: any
}

const UserMenu = ({ setMenuId, menus }: IUserMenu) => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

  const { handleLogout, userData } = useAdminAuth()

  const formattedPrivateMenus: MenuProps['items'] = useMemo(() => {
    const transformedMenus = privateMenusData.map((menu: any) => {
      return {
        label: menu.menuLabel,
        key: menu.menuId,
        icon: menu.menuIcon
      }
    })

    return transformedMenus
  }, [])

  return (
    <Dropdown
      menu={{
        items: formattedPrivateMenus,
        onClick: (e) => {
          if (e.key === 'sair') {
            handleLogout()
            return
          }
          setMenuId(e.key)
        }
      }}
    >
      <S.UserMenu>
        <S.UserMenuName style={{ color: token.colorText }}>
          {!userData ? 'Carregando...' : userData?.adminName}
        </S.UserMenuName>
        <Avatar
          size={28}
          style={{
            fontSize: 12,
            backgroundColor: '#fde3cf',
            color: '#f56a00'
          }}
        >
          {!userData ? (
            <Spin size="small" style={{ marginTop: '-4px' }} />
          ) : (
            formatUsername(userData?.adminName)
          )}
        </Avatar>
      </S.UserMenu>
    </Dropdown>
  )
}
