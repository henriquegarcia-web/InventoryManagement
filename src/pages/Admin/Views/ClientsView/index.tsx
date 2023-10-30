import { useMemo, useState } from 'react'

import * as S from './styles'

import { Button, Dropdown, Input, Modal, Popconfirm, theme } from 'antd'
import { IoSearchSharp } from 'react-icons/io5'

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
      <S.ClientsViewContent>{/* AQUI */}</S.ClientsViewContent>
    </S.ClientsView>
  )
}

export default ClientsView
