// ====================== TYPES ====================== //

// ==================== INTERFACES =================== //

export interface IProduct {
  productId: string
  productName: string
  productCode: string
  productCodeConversion: string
  productDescription: string
  productCostValue: string
  productSaleValue: string
  productQuantity: number
  productLocation: string
}

export interface ICreateProduct {
  productName: string
  productCode: string
  productCodeConversion: string
  productDescription: string
  productCostValue: any
  productSaleValue: any
  productQuantity: any
  productLocation: string
}
