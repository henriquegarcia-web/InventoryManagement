import { IoStorefrontOutline, IoExitOutline } from 'react-icons/io5'

import { AdminProductsView, AdminAccessView } from '@/pages/Admin/Views'

export interface IMenu {
  menuId: string
  menuLabel: string
  menuIcon: any
  menuRender?: React.ReactNode
  menuDanger: boolean
}

const menusData: IMenu[] = [
  {
    menuId: 'products',
    menuLabel: 'Estoque',
    menuIcon: <IoStorefrontOutline />,
    menuRender: <AdminProductsView />,
    menuDanger: false
  },
  {
    menuId: 'acessos',
    menuLabel: 'Acessos',
    menuIcon: <IoStorefrontOutline />,
    menuRender: <AdminAccessView />,
    menuDanger: false
  }
  // {
  //   menuId: 'divulgacao',
  //   menuLabel: 'Divulgação',
  //   menuIcon: <IoStorefrontOutline />,
  //   menuRender: <DisclosureAdminView />,
  // },
]

const privateMenusData: IMenu[] = [
  {
    menuId: 'products',
    menuLabel: 'Estoque',
    menuIcon: <IoStorefrontOutline />,
    menuRender: <AdminProductsView />,
    menuDanger: false
  },
  {
    menuId: 'acessos',
    menuLabel: 'Acessos',
    menuIcon: <IoStorefrontOutline />,
    menuRender: <AdminAccessView />,
    menuDanger: false
  },
  {
    menuId: 'sair',
    menuLabel: 'Sair',
    menuIcon: <IoExitOutline />,
    menuDanger: true
  }
]

export { menusData, privateMenusData }
