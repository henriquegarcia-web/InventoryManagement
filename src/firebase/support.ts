// import firebase from '@/firebase/firebase'

// import { message } from 'antd'

// // ============================================== CREATE CATEGORY

// interface ISupportSubmitForm {
//   supportUserId: string
//   supportReason: string
//   supportSubject: string
//   supportDescription: string
//   supportContactMethod: string
// }

// const handleCreateSupportRequest = async (
//   supportData: ISupportSubmitForm
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const supportRequestsRef = firebase.database().ref(`supportRequests`)

//     const newRequestId = supportRequestsRef.push().key

//     if (!newRequestId) {
//       message.open({
//         type: 'error',
//         content: 'Erro ao enviar solicitação de suporte.'
//       })
//       return false
//     }

//     const newSupportRequest = {
//       supportId: newRequestId,
//       ...supportData
//     }

//     await supportRequestsRef.child(newRequestId).set(newSupportRequest)

//     message.open({
//       type: 'success',
//       content: 'Solicitação de suporte enviada com sucesso.'
//     })

//     return true
//   } catch (error: any) {
//     return false
//   }
// }

// export { handleCreateSupportRequest }
