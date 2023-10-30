import firebase from '@/firebase/firebase'

import { message } from 'antd'

import { ICreateProduct, IProduct } from '@/@types/Admin'

// // ============================================== CREATE/EDIT COMPANY MAIN INFOS

const handleCreateProduct = async (productData: ICreateProduct) => {
  try {
    const inventoryRef = firebase.database().ref('inventory')

    const newProductRef = inventoryRef.push()
    const productId = newProductRef.key

    if (!productId) return false

    const productToCreate: IProduct = {
      productId,
      ...productData
    }

    await newProductRef.set(productToCreate)

    message.open({
      type: 'success',
      content: 'Produto criado com sucesso'
    })

    return true
  } catch (error) {
    message.open({
      type: 'error',
      content: 'Erro ao criar produto'
    })
    return false
  }
}

const handleGetAllProducts = (
  callback: (products: IProduct[] | null) => void
) => {
  const productsRef = firebase.database().ref('inventory')

  const listener = (snapshot: any) => {
    try {
      if (snapshot && snapshot.exists()) {
        const productsData = snapshot.val()

        const allProducts: IProduct[] = Object.values(productsData)

        callback(allProducts)
      } else {
        callback([])
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Falha ao obter lista de produtos'
      })
    }
  }

  const offCallback = () => {
    productsRef.off('value', listener)
  }

  productsRef.on('value', listener)

  return offCallback
}

export { handleCreateProduct, handleGetAllProducts }
