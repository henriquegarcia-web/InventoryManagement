import moment from 'moment'

// ====================== TYPES ====================== //

type ISubscription = {
  sessionId: string
  planCurrentType: string
  planSubscriptionId: string
  planId: string
  planType: string
  planStartDate: string
  planEndDate: string
  planDuration: string
}

export type AdminTheme = 'default' | 'dark'

// ==================== INTERFACES =================== //

export interface ISigninUser {
  adminEmail: string
  adminPassword: string
}

export interface ISignupUser {
  adminName: string
  adminEmail: string
  adminPhone: string
  adminPassword: string
}

export interface ICompanyLocation {
  companyCep: string
  companyAddress: string
  companyAddressNumber: string
  companyDistrict: string
  companyCity: string
}

export interface ICompanyContactMethods {
  companyPhone?: string
  companyWhatsapp?: string
  companyEmail?: string
  companyFacebook?: string
  companyInstagram?: string
  companyWebsite?: string
}

export interface ICompanySchedule {
  day: string
  openTime: moment.Moment
  closeTime: moment.Moment
}

export interface IProduct {
  productId: string
  productImage: string
  productName: string
  productPrice: number
  productDescription: string
  productActive: boolean
}

export interface IProductManipulate {
  productImage: string
  productName: string
  productPrice: number
  productDescription: string
}

export interface ICategory {
  id: string
  name: string
  products: IProduct[]
  active: boolean
}

export interface ICategoryManipulate {
  name: string
  products: IProduct[]
}

export interface ICompanyData {
  companyActive: boolean
  companyActiveTestMode: boolean
  companyLogo?: string
  companyBanner?: string
  companyName?: string
  companyId?: string
  companyDescription?: string
  companyLocation?: ICompanyLocation
  companyContacts?: ICompanyContactMethods
  companySchedules?: ICompanySchedule[]
  companyMenu?: ICategory[]
}

export interface IAdminPreferences {
  adminTheme: AdminTheme
}

export interface IUserData {
  adminId: string
  adminName: string
  adminEmail: string
  adminPhone: string
  adminRegisteredAt: number
  adminSubscription?: ISubscription
  adminCompanyInfo?: ICompanyData
  adminPreferences: IAdminPreferences
}

// export interface ISigninAdmin extends ISigninUser {}
