import { useMemo, useState } from 'react'

import * as S from './styles'
import { IoSearchSharp } from 'react-icons/io5'

import { Button, Dropdown, Input, Modal, Popconfirm, theme } from 'antd'
import { Table } from 'evergreen-ui'

import { Controller, useForm } from 'react-hook-form'

import { useAdmin } from '@/contexts/AdminContext'

const ClientsView = () => {
  const { token } = theme.useToken()

  const { usersList } = useAdmin()

  const [usersSearch, setUsersSearch] = useState('')
  const [userSelected, setUserSelected] = useState(null)

  const handleSearch = (value: string) => setUsersSearch(value)

  const filteredUsers = useMemo(() => {
    if (!usersList) return []
    if (!usersSearch) return usersList

    return usersList.filter((user) => {
      const objectAsString = JSON.stringify(user).toLowerCase()
      return objectAsString.includes(usersSearch.toLowerCase())
    })
  }, [usersList, usersSearch])

  return (
    <S.ClientsView>
      <S.ClientsViewHeader>
        <S.ClientsViewHeaderFilters>
          <Input
            style={{ width: '100%', maxWidth: '280px' }}
            addonAfter={
              <IoSearchSharp style={{ fontSize: 16, marginBottom: '-3px' }} />
            }
            placeholder="Pesquise aqui..."
            onChange={(e) => handleSearch(e.target.value)}
            value={usersSearch}
          />
        </S.ClientsViewHeaderFilters>
        <S.ClientsViewHeaderMenu>
          {/* <Button type="default" onClick={showWithdrawHistoricModal}>
            Novo Acesso
          </Button> */}
        </S.ClientsViewHeaderMenu>
      </S.ClientsViewHeader>
      <S.ClientsViewContent>
        <ClientsList clientsListData={filteredUsers} />
      </S.ClientsViewContent>
    </S.ClientsView>
  )
}

export default ClientsView

// ============================================================= PROJECTS LIST

interface IClientsList {
  clientsListData: any[]
}

const ClientsList = ({ clientsListData }: IClientsList) => {
  return (
    <S.ClientsList>
      <Table width="100%">
        <Table.Head height={40} paddingRight={0}>
          <Table.TextHeaderCell>Nome</Table.TextHeaderCell>
          <Table.TextHeaderCell>E-mail</Table.TextHeaderCell>
          <Table.TextHeaderCell>Super Admin?</Table.TextHeaderCell>
          <Table.TextHeaderCell>Bloqueado?</Table.TextHeaderCell>
          <S.ClientsListMenu />
        </Table.Head>
        <Table.Body height={`calc(100% - 40px)`}>
          {clientsListData.map((admin: any) => (
            <ClientsListItem key={admin.adminId} admin={admin} />
          ))}
        </Table.Body>
      </Table>
    </S.ClientsList>
  )
}

// ============================================================= PROJECTS LIST ITEM

interface IClientsListItem {
  admin: any
}

const ClientsListItem = ({ admin }: IClientsListItem) => {
  return (
    <Table.Row height={50}>
      <Table.TextCell>{admin.adminName}</Table.TextCell>
      <Table.TextCell>{admin.adminEmail}</Table.TextCell>
      <Table.TextCell>{admin.adminIsSuper ? 'Sim' : 'Não'}</Table.TextCell>
      <Table.TextCell>{admin.adminBlocked ? 'Sim' : 'Não'}</Table.TextCell>

      <S.ClientsListMenu>
        {/* <IconButton
          icon={HiOutlineEye}
          iconSize={16}
          size="medium"
          onClick={() => openViewModal(request)}
        /> */}
      </S.ClientsListMenu>
    </Table.Row>
  )
}
