import {
  IoPeopleOutline,
  IoExitOutline,
  IoCubeOutline,
  IoKeyOutline
} from 'react-icons/io5'

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
    menuIcon: <IoCubeOutline />,
    menuRender: <AdminProductsView />,
    menuDanger: false
  }
]

const menusDataAdmin: IMenu[] = [
  {
    menuId: 'products',
    menuLabel: 'Estoque',
    menuIcon: <IoCubeOutline />,
    menuRender: <AdminProductsView />,
    menuDanger: false
  },
  {
    menuId: 'acessos',
    menuLabel: 'Acessos',
    menuIcon: <IoKeyOutline />,
    menuRender: <AdminAccessView />,
    menuDanger: false
  },
  {
    menuId: 'usuarios',
    menuLabel: 'Usuários',
    menuIcon: <IoPeopleOutline />,
    menuRender: <AdminClientsView />,
    menuDanger: false
  }
]

const privateMenusData: IMenu[] = [
  // {
  //   menuId: 'products',
  //   menuLabel: 'Estoque',
  //   menuIcon: <IoKeyOutline />,
  //   menuRender: <AdminProductsView />,
  //   menuDanger: false
  // },
  // {
  //   menuId: 'acessos',
  //   menuLabel: 'Acessos',
  //   menuIcon: <IoKeyOutline />,
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

const privateMenusMobilePublicData: IMenu[] = [
  {
    menuId: 'products',
    menuLabel: 'Estoque',
    menuIcon: <IoCubeOutline />,
    menuRender: <AdminProductsView />,
    menuDanger: false
  },
  {
    menuId: 'sair',
    menuLabel: 'Sair',
    menuIcon: <IoExitOutline />,
    menuDanger: true
  }
]

const privateMenusMobileAdminData: IMenu[] = [
  {
    menuId: 'products',
    menuLabel: 'Estoque',
    menuIcon: <IoCubeOutline />,
    menuRender: <AdminProductsView />,
    menuDanger: false
  },
  {
    menuId: 'acessos',
    menuLabel: 'Acessos',
    menuIcon: <IoKeyOutline />,
    menuRender: <AdminAccessView />,
    menuDanger: false
  },
  {
    menuId: 'usuarios',
    menuLabel: 'Usuários',
    menuIcon: <IoPeopleOutline />,
    menuRender: <AdminClientsView />,
    menuDanger: false
  },
  {
    menuId: 'sair',
    menuLabel: 'Sair',
    menuIcon: <IoExitOutline />,
    menuDanger: true
  }
]

export {
  menusDataPublic,
  menusDataAdmin,
  privateMenusData,
  privateMenusMobilePublicData,
  privateMenusMobileAdminData
}
