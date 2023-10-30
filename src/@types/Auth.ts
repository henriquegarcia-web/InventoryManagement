// ====================== TYPES ====================== //

export type AdminTheme = 'default' | 'dark'

// ==================== INTERFACES =================== //

export interface ISigninUser {
  adminEmail: string
  adminPassword: string
}

export interface ISignupUser {
  adminEmail: string
  adminPassword: string
}

export interface IUserData {
  adminId: string
  adminName: string
  adminEmail: string
  adminRegisteredAt: number
  adminBlocked: boolean
  adminIsSuper: boolean
}

export interface IAuthenticatedUser {
  adminName: string
  adminEmail: string
  adminRegisteredAt?: number
  adminBlocked: boolean
  adminIsSuper: boolean
}

// export interface ISigninAdmin extends ISigninUser {}
