// import firebase from '@/firebase/firebase'

// import { message } from 'antd'
// import moment from 'moment'

// import { ICompanyData } from '@/@types/Auth'

// // ============================================== VERIFY IF COMPANY EXISTS

// const verifyIfCompanyIdExists = async (companyId: string): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const adminAccountsRef = firebase.database().ref('adminAccounts')

//     const companyIdSnapshot = await adminAccountsRef
//       .orderByChild('adminCompanyInfo/companyId')
//       .equalTo(companyId)
//       .once('value')

//     if (!companyIdSnapshot.exists()) {
//       return false
//     }

//     const companyIdExists = Object.keys(companyIdSnapshot.val()).some(
//       (userId) => {
//         return userId !== user.uid
//       }
//     )

//     return companyIdExists
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao verificar a existência do companyId.'
//     })

//     return false
//   }
// }

// // ============================================== CREATE/EDIT COMPANY MAIN INFOS

// export interface ICompanyMainInfosForm {
//   companyLogo?: string
//   companyBanner?: string
//   companyName: string
//   companyId: string
//   companyDescription: string
// }

// const handleUpdateCompanyMainInfos = async ({
//   companyLogo = '',
//   companyBanner = '',
//   companyName,
//   companyId,
//   companyDescription
// }: ICompanyMainInfosForm): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const companyIdVerification = await verifyIfCompanyIdExists(companyId)

//     if (companyIdVerification) {
//       message.open({
//         type: 'warning',
//         content: 'Já existe uma empresa com esse ID.'
//       })
//       return false
//     }

//     const userDataRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo`)
//     const currentDataSnapshot = await userDataRef.get()
//     const currentData = currentDataSnapshot.val() || {}

//     currentData.companyLogo = companyLogo
//     currentData.companyBanner = companyBanner
//     currentData.companyName = companyName
//     currentData.companyId = companyId
//     currentData.companyDescription = companyDescription

//     await userDataRef.set(currentData)

//     message.open({
//       type: 'success',
//       content: 'Dados da empresa cadastrados com sucesso.'
//     })

//     return true
//   } catch (error) {
//     message.open({
//       type: 'error',
//       content: 'Falha ao salvar informações básicas da empresa.'
//     })

//     return false
//   }
// }

// // ============================================== CREATE/EDIT COMPANY LOCATION

// export interface ICompanyLocationForm {
//   companyCep: string
//   companyAddress: string
//   companyAddressNumber: string
//   companyDistrict: string
//   companyCity: string
// }

// const handleUpdateCompanyLocation = async (
//   formData: ICompanyLocationForm
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const userDataRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyLocation`)

//     await userDataRef.set(formData)

//     message.open({
//       type: 'success',
//       content: 'Dados de localização da empresa cadastrados com sucesso.'
//     })

//     return true
//   } catch (error) {
//     message.open({
//       type: 'error',
//       content: 'Falha ao salvar informações de localização da empresa.'
//     })

//     return false
//   }
// }

// // ============================================== CREATE/EDIT COMPANY CONTACT

// export interface ICompanyContactForm {
//   companyPhone?: string
//   companyWhatsapp?: string
//   companyEmail?: string
//   companyFacebook?: string
//   companyInstagram?: string
//   companyWebsite?: string
// }

// const handleUpdateCompanyContact = async (
//   formData: ICompanyContactForm
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const userDataRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyContacts`)

//     await userDataRef.set(formData)

//     message.open({
//       type: 'success',
//       content: 'Dados de contato da empresa cadastrados com sucesso.'
//     })

//     return true
//   } catch (error) {
//     message.open({
//       type: 'error',
//       content: 'Falha ao salvar informações de contato da empresa.'
//     })

//     return false
//   }
// }

// // ============================================== CREATE/EDIT COMPANY SCHEDULES

// export interface IScheduleItem {
//   day: string
//   openTime: moment.Moment
//   closeTime: moment.Moment
// }

// const momentToString = (momentObj: moment.Moment): string => {
//   return momentObj.toISOString()
// }

// const handleUpdateCompanySchedules = async (
//   schedules: IScheduleItem[]
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const schedulesToSave = schedules.map((schedule) => ({
//       ...schedule,
//       openTime: momentToString(schedule.openTime),
//       closeTime: momentToString(schedule.closeTime)
//     }))

//     const userDataRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companySchedules`)

//     await userDataRef.set(schedulesToSave)

//     message.open({
//       type: 'success',
//       content: 'Horário da empresa cadastrados com sucesso.'
//     })

//     return true
//   } catch (error) {
//     console.error(error)

//     message.open({
//       type: 'error',
//       content: 'Falha ao salvar horário da empresa.'
//     })

//     return false
//   }
// }

// // ============================================== ACTIVE COMPANY

// const handleActiveCompanyMenu = async (isActive: boolean): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const userDataRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyActive`)

//     await userDataRef.set(isActive)

//     message.open({
//       type: `${isActive ? 'success' : 'warning'}`,
//       content: `O cardápio agora está ${isActive ? 'ativo' : 'inativo'}.`
//     })

//     return true
//   } catch (error) {
//     console.error(error)

//     message.open({
//       type: 'error',
//       content: 'Falha ao modificar status do cardápio'
//     })

//     return false
//   }
// }

// // ============================================== ACTIVE COMPANY TEST MODE

// const handleActiveCompanyMenuTestMode = async (
//   isActive: boolean
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const userDataRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyActiveTestMode`)

//     await userDataRef.set(isActive)

//     message.open({
//       type: `${isActive ? 'success' : 'warning'}`,
//       content: `O cardápio de teste agora está ${
//         isActive ? 'ativo' : 'inativo'
//       }.`
//     })

//     return true
//   } catch (error) {
//     console.error(error)

//     message.open({
//       type: 'error',
//       content: 'Falha ao modificar status do cardápio de teste'
//     })

//     return false
//   }
// }

// // ============================================== FIND MENU BY ID

// const handleFindMenuByCompanyId = (
//   companyId: string,
//   callback: (menuData: ICompanyData | null) => void
// ) => {
//   const adminAccountsRef = firebase.database().ref('adminAccounts')

//   const listener = (snapshot: any) => {
//     try {
//       const adminAccountsData = snapshot.val()

//       for (const userId in adminAccountsData) {
//         const userData = adminAccountsData[userId]

//         if (
//           userData.adminCompanyInfo &&
//           userData.adminCompanyInfo.companyId === companyId
//         ) {
//           const menuData = userData.adminCompanyInfo
//           callback(menuData)
//           return
//         }
//       }

//       callback(null)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const offCallback = () => {
//     adminAccountsRef.off('value', listener)
//   }

//   adminAccountsRef.on('value', listener)

//   return offCallback
// }

// // ============================================================================

// export {
//   handleUpdateCompanyMainInfos,
//   handleUpdateCompanyLocation,
//   handleUpdateCompanyContact,
//   handleUpdateCompanySchedules,
//   handleActiveCompanyMenu,
//   handleActiveCompanyMenuTestMode,
//   handleFindMenuByCompanyId
// }
