import { useMemo, useState } from 'react'

import * as S from './styles'
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoSearchSharp
} from 'react-icons/io5'

import { Controller, useForm } from 'react-hook-form'

import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { Table } from 'evergreen-ui'

import {
  handleBlockAuthenticatedUser,
  handleCreateAuthenticatedUser
} from '@/firebase/admin'
import { useAdmin } from '@/contexts/AdminContext'

const AccessView = () => {
  const { authenticatedUsersList } = useAdmin()

  const [accessSearch, setAccessSearch] = useState('')

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const showCreateModal = () => setIsCreateModalOpen(true)
  const handleCreateModalClose = () => setIsCreateModalOpen(false)

  const handleSearch = (value: string) => setAccessSearch(value)

  const filteredAccess = useMemo(() => {
    if (!authenticatedUsersList) return []
    if (!accessSearch) return authenticatedUsersList

    return authenticatedUsersList.filter((access) => {
      const objectAsString = JSON.stringify(access).toLowerCase()
      return objectAsString.includes(accessSearch.toLowerCase())
    })
  }, [authenticatedUsersList, accessSearch])

  return (
    <>
      <S.AccessView>
        <S.AccessViewHeader>
          <S.AccessViewHeaderFilters>
            <Input
              style={{ width: '100%', maxWidth: '280px' }}
              addonAfter={
                <IoSearchSharp style={{ fontSize: 16, marginBottom: '-3px' }} />
              }
              placeholder="Pesquise aqui..."
              onChange={(e) => handleSearch(e.target.value)}
              value={accessSearch}
            />
          </S.AccessViewHeaderFilters>
          <S.AccessViewHeaderMenu>
            <Button type="default" onClick={showCreateModal}>
              Novo Acesso
            </Button>
          </S.AccessViewHeaderMenu>
        </S.AccessViewHeader>
        <S.AccessViewContent>
          <AccessList accessListData={filteredAccess} />
        </S.AccessViewContent>
      </S.AccessView>

      <CreateUserAccessModal
        isModalOpen={isCreateModalOpen}
        handleModalClose={handleCreateModalClose}
      />
    </>
  )
}

export default AccessView

// =========================================== NEW AFFILIATE MODAL

interface ICreateUserForm {
  adminName: string
  adminEmail: string
  adminIsSuper?: boolean
}

interface ICreateUserAccessModal {
  isModalOpen: boolean
  handleModalClose: () => void
}

const CreateUserAccessModal = ({
  isModalOpen,
  handleModalClose
}: ICreateUserAccessModal) => {
  const [createUserLoading, setCreateUserLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ICreateUserForm>()

  const { isValid } = formState

  const handleCreateUser = async (data: ICreateUserForm) => {
    setCreateUserLoading(true)

    const signupAdminResponse = await handleCreateAuthenticatedUser({
      adminName: data.adminName,
      adminEmail: data.adminEmail,
      adminIsSuper: data.adminIsSuper ? data.adminIsSuper : false
    })

    setCreateUserLoading(false)

    if (signupAdminResponse) {
      reset()
      handleModalClose()
    }
  }

  return (
    <Modal
      title="Cadastrar afiliado"
      open={isModalOpen}
      onOk={handleModalClose}
      onCancel={handleModalClose}
      footer={null}
      destroyOnClose
    >
      <S.CreateClientForm
        layout="vertical"
        onFinish={handleSubmit(handleCreateUser)}
      >
        <Form.Item label="Nome do usuário">
          <Controller
            name="adminName"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input {...field} placeholder="Digite o nome" />
            )}
          />
        </Form.Item>
        <Form.Item label="E-mail do usuário">
          <Controller
            name="adminEmail"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input {...field} placeholder="Digite o e-mail" />
            )}
          />
        </Form.Item>
        <Form.Item label="Usuário é Super Admin?">
          <Controller
            name="adminIsSuper"
            control={control}
            render={({ field }) => <Checkbox {...field}></Checkbox>}
          />
        </Form.Item>

        <S.CreateClientFormFooter>
          <Button
            type="primary"
            htmlType="submit"
            loading={createUserLoading}
            disabled={!isValid}
          >
            Cadastrar
          </Button>
        </S.CreateClientFormFooter>
      </S.CreateClientForm>
    </Modal>
  )
}

// ============================================================= ACCESS LIST

interface IAccessList {
  accessListData: any[]
}

const AccessList = ({ accessListData }: IAccessList) => {
  return (
    <S.AccessList>
      <Table width="100%">
        <Table.Head height={40} paddingRight={0}>
          <Table.TextHeaderCell>Nome</Table.TextHeaderCell>
          <Table.TextHeaderCell>E-mail</Table.TextHeaderCell>
          <Table.TextHeaderCell>Super Admin?</Table.TextHeaderCell>
          <Table.TextHeaderCell>Bloqueado?</Table.TextHeaderCell>
          <S.AccessListMenu />
        </Table.Head>
        <Table.Body height={`calc(100% - 40px)`}>
          {accessListData.map((admin: any) => (
            <AccessListItem key={admin.adminId} admin={admin} />
          ))}
        </Table.Body>
      </Table>
    </S.AccessList>
  )
}

// ============================================================= ACCESS LIST ITEM

interface IAccessListItem {
  admin: any
}

const AccessListItem = ({ admin }: IAccessListItem) => {
  const handleBlockUserAccess = async () => {
    const blockUserResponse = await handleBlockAuthenticatedUser({
      adminEmail: admin.adminEmail,
      adminBlocked: true
    })
  }

  const handleEnableUserAccess = async () => {
    const blockUserResponse = await handleBlockAuthenticatedUser({
      adminEmail: admin.adminEmail,
      adminBlocked: false
    })
  }

  return (
    <Table.Row height={50}>
      <Table.TextCell>{admin.adminName}</Table.TextCell>
      <Table.TextCell>{admin.adminEmail}</Table.TextCell>
      <Table.TextCell>{admin.adminIsSuper ? 'Sim' : 'Não'}</Table.TextCell>
      <Table.TextCell>{admin.adminBlocked ? 'Sim' : 'Não'}</Table.TextCell>

      <S.AccessListMenu>
        {admin.adminBlocked ? (
          <Button
            onClick={handleEnableUserAccess}
            icon={
              <IoCheckmarkCircleOutline
                style={{ fontSize: 20, marginLeft: '5px' }}
              />
            }
          />
        ) : (
          <Button
            onClick={handleBlockUserAccess}
            icon={
              <IoCloseCircleOutline
                style={{ fontSize: 20, marginLeft: '5px' }}
              />
            }
            danger
          />
        )}
      </S.AccessListMenu>
    </Table.Row>
  )
}
