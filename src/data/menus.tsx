import { IoStorefrontOutline, IoExitOutline } from 'react-icons/io5'

import {
  AdminProductsView,
  AdminAccessView,
  AdminClientsView
} from '@/pages/Admin/Views'

export interface IMenu {
  menuId: string
  menuLabel: string
  menuIcon: any
  menuRender?: React.ReactNode
  menuDanger: boolean
}

const menusDataPublic: IMenu[] = [
  {
    menuId: 'products',
    menuLabel: 'Estoque',
    menuIcon: <IoStorefrontOutline />,
    menuRender: <AdminProductsView />,
    menuDanger: false
  }
]

const menusDataAdmin: IMenu[] = [
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
    menuId: 'usuarios',
    menuLabel: 'Usuários',
    menuIcon: <IoStorefrontOutline />,
    menuRender: <AdminClientsView />,
    menuDanger: false
  }
]

const privateMenusData: IMenu[] = [
  // {
  //   menuId: 'products',
  //   menuLabel: 'Estoque',
  //   menuIcon: <IoStorefrontOutline />,
  //   menuRender: <AdminProductsView />,
  //   menuDanger: false
  // },
  // {
  //   menuId: 'acessos',
  //   menuLabel: 'Acessos',
  //   menuIcon: <IoStorefrontOutline />,
  //   menuRender: <AdminAccessView />,
  //   menuDanger: false
  // },
  {
    menuId: 'sair',
    menuLabel: 'Sair',
    menuIcon: <IoExitOutline />,
    menuDanger: true
  }
]

export { menusDataPublic, menusDataAdmin, privateMenusData }
