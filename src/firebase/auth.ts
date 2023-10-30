import firebase from '@/firebase/firebase'

import { handleTranslateFbError } from '@/utils/functions/firebaseTranslateErrors'

import { message } from 'antd'

import { AdminTheme, ISigninUser, ISignupUser, IUserData } from '@/@types/Auth'

// ============================================== CREATE USER DATA

const createUserAccount = async (adminData: IUserData): Promise<boolean> => {
  try {
    const adminAccountsRef = firebase
      .database()
      .ref('adminAccounts/' + adminData.adminId)

    await adminAccountsRef.set(adminData)

    return true
  } catch (error) {
    message.open({
      type: 'error',
      content: 'Falha ao salvar credenciais'
    })
    return false
  }
}

// // ============================================== LOGIN

const handleSigninUser = async ({
  adminEmail,
  adminPassword
}: ISigninUser): Promise<boolean> => {
  try {
    const adminAccountsRef = firebase.database().ref('adminAccounts')

    const adminQuery = adminAccountsRef
      .orderByChild('adminEmail')
      .equalTo(adminEmail)

    const adminQuerySnapshot = await adminQuery.get()

    if (adminQuerySnapshot.exists()) {
      const adminData: any = Object.values(adminQuerySnapshot.val())[0]

      if (adminData?.adminBlocked) {
        message.open({
          type: 'error',
          content: 'Sua conta está bloqueada. Entre em contato com o suporte.'
        })
        return false
      }
    }

    await firebase.auth().signInWithEmailAndPassword(adminEmail, adminPassword)

    return true
  } catch (error: any) {
    const errorCode = error.code

    const adminAccountsRef = firebase.database().ref('authenticatedUsers')

    const adminQuery = adminAccountsRef
      .orderByChild('adminEmail')
      .equalTo(adminEmail)

    const adminQuerySnapshot = await adminQuery.get()

    if (adminQuerySnapshot.exists()) {
      message.open({
        type: 'warning',
        content: 'Para acessar sua conta, cadastre uma senha em primeiro acesso'
      })
      return false
    }

    message.open({
      type: 'error',
      content: 'Você não possuí o acesso liberado à plataforma'
    })

    return false
  }
}

// ============================================== REGISTER USER

const handleSignupUser = async ({
  adminEmail,
  adminPassword
}: ISignupUser): Promise<boolean | string> => {
  try {
    // ----------------------------------

    const authenticatedUsersRef = firebase.database().ref('authenticatedUsers')
    const adminAccountsRef = firebase.database().ref('adminAccounts')

    const adminAuthenticationQuery = authenticatedUsersRef
      .orderByChild('adminEmail')
      .equalTo(adminEmail)

    const adminQuery = adminAccountsRef
      .orderByChild('adminEmail')
      .equalTo(adminEmail)

    const adminAuthenticationQuerySnapshot =
      await adminAuthenticationQuery.get()
    const adminQuerySnapshot = await adminQuery.get()

    if (!adminAuthenticationQuerySnapshot.exists()) {
      message.open({
        type: 'warning',
        content: 'Esse e-mail não está disponível para cadastro'
      })
      return false
    }

    if (adminQuerySnapshot.exists()) {
      message.open({
        type: 'warning',
        content:
          'Essa conta já possui cadastro, faça login para acessar o sistema'
      })
      return false
    }

    const adminAuthenticatedData = adminAuthenticationQuerySnapshot.val()
    const adminId = Object.keys(adminAuthenticatedData)[0]

    const { adminName, adminBlocked } = adminAuthenticatedData[adminId]

    if (adminBlocked) {
      message.open({
        type: 'warning',
        content:
          'Sua conta está bloqueada. Entre em contato para obter assistência.'
      })
      return false
    }

    // ----------------------------------

    const adminCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(adminEmail, adminPassword)

    if (adminCredential.user) {
      await adminCredential.user.updateProfile({
        displayName: adminName
      })

      const adminData: IUserData = {
        adminId: adminCredential.user.uid,
        adminName: adminName,
        adminEmail: adminEmail,
        adminRegisteredAt: Date.now(),
        adminBlocked: false
      }

      const adminDataResponse = await createUserAccount(adminData)

      if (!adminDataResponse) {
        message.open({
          type: 'error',
          content: 'Falha ao realizar o cadastro. Por favor, tente novamente.'
        })

        const admin = firebase.auth().currentUser
        if (admin) {
          await admin.delete()
        }

        return false
      }

      message.open({
        type: 'success',
        content: 'Conta criada com sucesso'
      })
      return true
    }

    message.open({
      type: 'error',
      content: 'Erro ao realizar o cadastro'
    })
    return false
  } catch (error: any) {
    const errorCode = error.code

    console.log(error)

    const translatedError = handleTranslateFbError(errorCode)

    message.open({
      type: 'error',
      content:
        translatedError !== null
          ? translatedError
          : 'Erro ao realizar o cadastro'
    })
    return false
  }
}

const handleLogoutAdmin = async (): Promise<boolean> => {
  try {
    await firebase.auth().signOut()

    return true
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Falha ao fazer logout'
    })

    return false
  }
}

// ============================================== HANDLE GET USER DATA

const handleGetAdminData = (
  callback: (accountData: IUserData | null) => void
) => {
  const user = firebase.auth().currentUser

  if (!user) {
    callback(null)
    return
  }

  const usersRef = firebase.database().ref('adminAccounts/' + user.uid)

  const listener = (snapshot: any) => {
    try {
      if (snapshot && snapshot.exists()) {
        const companyData = snapshot.val()
        callback(companyData)
      } else {
        callback(null)
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Falha ao obter dados do usuário'
      })
    }
  }

  const offCallback = () => {
    usersRef.off('value', listener)
  }

  usersRef.on('value', listener)

  return offCallback
}


export { handleSigninUser, handleSignupUser, handleLogoutAdmin, handleGetAdminData }
