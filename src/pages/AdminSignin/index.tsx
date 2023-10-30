import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import * as S from './styles'

import { Button, Input, Switch, theme } from 'antd'

import { Controller, useForm } from 'react-hook-form'

import { handleSigninAdmin } from '@/firebase/auth'

interface ISigninForm {
  adminEmail: string
  adminPassword: string
}

const AdminSignin = () => {
  const { token } = theme.useToken()

  const navigate = useNavigate()
  const [signinIsLoading, setSigninIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ISigninForm>()

  const { isValid } = formState

  const handleSignin = async (data: ISigninForm) => {
    setSigninIsLoading(true)

    const signinAdminResponse = await handleSigninAdmin({
      adminEmail: data.adminEmail,
      adminPassword: data.adminPassword
    })

    setSigninIsLoading(false)

    if (signinAdminResponse) {
      reset()
      navigate('/admin')
    }
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
            onFinish={handleSubmit(handleSignin)}
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
            <S.AdminSigninFormNavigator>
              Primeiro acesso?
              <b onClick={() => navigate('/admin/cadastrar')}>Criar conta</b>
            </S.AdminSigninFormNavigator>
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
