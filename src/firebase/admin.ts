import firebase from '@/firebase/firebase'

import { message } from 'antd'

import { IAuthenticatedUser, IUserData } from '@/@types/Auth'

// ============================================= CREATE AFFILIATE REGISTRATION

interface ICreateAuthenticatedUser {
  adminName: string
  adminEmail: string
  adminIsSuper: boolean
}

const handleCreateAuthenticatedUser = async ({
  adminName,
  adminEmail,
  adminIsSuper
}: ICreateAuthenticatedUser) => {
  try {
    const authenticatedUsersRef = firebase.database().ref('authenticatedUsers')

    const userData: IAuthenticatedUser = {
      adminName: adminName,
      adminEmail: adminEmail,
      adminBlocked: false,
      adminIsSuper: adminIsSuper,
      adminRegisteredAt: Date.now()
    }

    await authenticatedUsersRef.push(userData)

    message.open({
      type: 'success',
      content: 'Acesso criado com sucesso'
    })

    return true
  } catch (error) {
    console.error('Erro ao salvar usuário autenticado: ', error)
    return false
  }
}

// ============================================= GET ALL AUTHENTICATED USERS

const handleGetAllAuthenticatedUsers = (
  callback: (usersData: IAuthenticatedUser[] | null) => void
) => {
  const adminAccountsRef = firebase.database().ref('authenticatedUsers')

  const listener = (snapshot: any) => {
    try {
      if (snapshot && snapshot.exists()) {
        const userData = snapshot.val()

        const allUsers: IAuthenticatedUser[] = Object.values(userData)

        callback(allUsers)
      } else {
        callback([])
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Falha ao obter contas de usuário não administradores'
      })
    }
  }

  const offCallback = () => {
    adminAccountsRef.off('value', listener)
  }

  adminAccountsRef.on('value', listener)

  return offCallback
}

// ============================================= GET ALL USERS

const handleGetAllUsers = (
  callback: (usersData: IUserData[] | null) => void
) => {
  const adminAccountsRef = firebase.database().ref('adminAccounts')

  const listener = (snapshot: any) => {
    try {
      if (snapshot && snapshot.exists()) {
        const userData = snapshot.val()

        const allUsers: IUserData[] = Object.values(userData)

        callback(allUsers)
      } else {
        callback([])
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Falha ao obter contas de usuário não administradores'
      })
    }
  }

  const offCallback = () => {
    adminAccountsRef.off('value', listener)
  }

  adminAccountsRef.on('value', listener)

  return offCallback
}

export {
  handleCreateAuthenticatedUser,
  handleGetAllAuthenticatedUsers,
  handleGetAllUsers
}
