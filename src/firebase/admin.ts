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

// ============================================== HANDLE BLOCK ACCOUNT

interface IBlockUser {
  adminId: string
  adminEmail: string
  adminBlocked: boolean
}

const handleBlockUser = async ({
  adminId,
  adminEmail,
  adminBlocked
}: IBlockUser) => {
  try {
    const authenticatedUsersRef = firebase.database().ref('authenticatedUsers')
    const adminsRef = firebase.database().ref('adminAccounts')

    const authenticatedUserQuery = authenticatedUsersRef
      .orderByChild('adminEmail')
      .equalTo(adminEmail)
    const authenticatedUserQuerySnapshot = await authenticatedUserQuery.get()
    const authenticatedUserData = authenticatedUserQuerySnapshot.val()

    const adminQuery = adminsRef.orderByKey().equalTo(adminId)
    const adminQuerySnapshot = await adminQuery.get()
    const adminSnapshot = adminQuerySnapshot.val()

    if (!adminSnapshot || !authenticatedUserData) {
      message.open({
        type: 'error',
        content: 'Usuário não encontrado'
      })
      return false
    }

    const authenticatedUserKey = Object.keys(authenticatedUserData)[0]
    authenticatedUserData[authenticatedUserKey].adminBlocked = adminBlocked

    const adminKey = Object.keys(adminSnapshot)[0]
    adminSnapshot[adminKey].adminBlocked = adminBlocked

    await authenticatedUsersRef
      .child(authenticatedUserKey)
      .set(authenticatedUserData[authenticatedUserKey])

    await adminsRef.child(adminKey).set(adminSnapshot[adminKey])

    const messageType = adminBlocked ? 'bloqueado' : 'liberado'

    message.open({
      type: 'success',
      content: `Usuário ${messageType} com sucesso`
    })

    return true
  } catch (error) {
    message.open({
      type: 'error',
      content: 'Falha ao atualizar o status de bloqueio do usuário'
    })
    return false
  }
}

// ============================================= DELETE AUTHENTICATED USER

interface IBlockAuthenticatedUser {
  adminEmail: string
  adminBlocked: boolean
}

const handleBlockAuthenticatedUser = async ({
  adminEmail,
  adminBlocked
}: IBlockAuthenticatedUser) => {
  try {
    const authenticatedUsersRef = firebase.database().ref('authenticatedUsers')
    const adminsRef = firebase.database().ref('adminAccounts')

    const snapshotAuthenticatedUser = await authenticatedUsersRef
      .orderByChild('adminEmail')
      .equalTo(adminEmail)
      .once('value')

    const snapshotUser = await adminsRef
      .orderByChild('adminEmail')
      .equalTo(adminEmail)
      .once('value')

    const authenticatedUserData = snapshotAuthenticatedUser.val()
    const adminSnapshot = snapshotUser.val()

    if (!authenticatedUserData) {
      message.open({
        type: 'error',
        content: 'Usuário não encontrado'
      })
      return false
    }

    const authenticatedUserKey = Object.keys(authenticatedUserData)[0]

    authenticatedUserData[authenticatedUserKey].adminBlocked = adminBlocked

    await authenticatedUsersRef
      .child(authenticatedUserKey)
      .set(authenticatedUserData[authenticatedUserKey])

    if (!adminSnapshot) {
      const messageType = adminBlocked ? 'bloqueado' : 'liberado'

      message.open({
        type: 'success',
        content: `Usuário ${messageType} com sucesso`
      })
      return false
    }

    const adminKey = Object.keys(adminSnapshot)[0]

    adminSnapshot[adminKey].adminBlocked = adminBlocked

    await adminsRef.child(adminKey).set(adminSnapshot[adminKey])

    const messageType = adminBlocked ? 'bloqueado' : 'liberado'

    message.open({
      type: 'success',
      content: `Usuário ${messageType} com sucesso`
    })

    return true
  } catch (error) {
    message.open({
      type: 'error',
      content: 'Erro ao excluir o acesso de usuário autenticado'
    })

    return false
  }
}

export {
  handleCreateAuthenticatedUser,
  handleGetAllAuthenticatedUsers,
  handleGetAllUsers,
  handleBlockUser,
  handleBlockAuthenticatedUser
}
