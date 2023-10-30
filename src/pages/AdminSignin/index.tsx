import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import * as S from './styles'

import { Button, Input, Checkbox, theme } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

import { Controller, useForm } from 'react-hook-form'

import { handleSigninUser, handleSignupUser } from '@/firebase/auth'

interface ISigninForm {
  adminEmail: string
  adminPassword: string
  adminPasswordConfirm: string
}

const AdminSignin = () => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

  const [isFirstAccess, setIsFirstAccess] = useState(false)
  const [signinIsLoading, setSigninIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ISigninForm>()

  const { isValid } = formState

  const handleSignin = async (data: ISigninForm) => {
    setSigninIsLoading(true)

    const signinAdminResponse = await handleSigninUser({
      adminEmail: data.adminEmail,
      adminPassword: data.adminPassword
    })

    setSigninIsLoading(false)

    if (signinAdminResponse) {
      reset()
      navigate('/admin')
    }
  }

  const handleSignup = async (data: ISigninForm) => {
    setSigninIsLoading(true)

    const signupAdminResponse = await handleSignupUser({
      adminEmail: data.adminEmail,
      adminPassword: data.adminPassword
    })

    setSigninIsLoading(false)

    if (signupAdminResponse) {
      reset()
      navigate('/admin')
    }
  }

  const onChange = (e: CheckboxChangeEvent) => {
    setIsFirstAccess(e.target.checked)
  }

  return (
    <S.AdminSignin>
      <S.AuthContainer
        style={{ backgroundColor: token.colorBgElevated }}
        color={token.colorText}
        background={token.colorBgContainer}
      >
        <S.AuthContainerHeader>
          <S.AuthContainerLogo style={{ color: token.colorTextSecondary }}>
            Sistema de Estoque
          </S.AuthContainerLogo>
          <span style={{ color: token.colorTextDescription }}>Entrar</span>
        </S.AuthContainerHeader>
        <S.AuthContainerContent>
          <S.AdminSigninForm
            layout="vertical"
            onFinish={
              isFirstAccess
                ? handleSubmit(handleSignup)
                : handleSubmit(handleSignin)
            }
          >
            <Controller
              name="adminEmail"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => <Input {...field} placeholder="E-mail" />}
            />
            <Controller
              name="adminPassword"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Senha" />
              )}
            />
            {isFirstAccess && (
              <Controller
                name="adminPasswordConfirm"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <Input.Password {...field} placeholder="Confirmar senha" />
                )}
              />
            )}
            <S.SignInFormChanger style={{ color: token.colorTextSecondary }}>
              Primeiro acesso?
              <Checkbox onChange={onChange}></Checkbox>
            </S.SignInFormChanger>
            <S.AdminSigninFormFooter>
              <Button
                type="primary"
                htmlType="submit"
                loading={signinIsLoading}
                disabled={!isValid}
              >
                Entrar
              </Button>
            </S.AdminSigninFormFooter>
          </S.AdminSigninForm>
        </S.AuthContainerContent>
      </S.AuthContainer>
    </S.AdminSignin>
  )
}

export default AdminSignin
