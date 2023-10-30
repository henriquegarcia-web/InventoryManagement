import { useMemo, useState } from 'react'

import * as S from './styles'
import { IoSearchSharp } from 'react-icons/io5'

import { Button, Form, Input, Modal, theme } from 'antd'
import { IconButton, Table } from 'evergreen-ui'

import { Controller, useForm } from 'react-hook-form'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useAdmin } from '@/contexts/AdminContext'
import { handleCreateProduct } from '@/firebase/inventory'

import {
  formatByCurrency,
  formatCurrency,
  formatToCurrency
} from '@/utils/functions/formatCurrency'

import { ICreateProduct, IProduct } from '@/@types/Admin'

const ProductsView = () => {
  const { inventoryList } = useAdmin()

  const [usersSearch, setUsersSearch] = useState('')

  const [isWithdrawHistoricModalOpen, setIsWithdrawHistoricModalOpen] =
    useState(false)

  const showWithdrawHistoricModal = () => setIsWithdrawHistoricModalOpen(true)
  const handleWithdrawHistoricModalClose = () =>
    setIsWithdrawHistoricModalOpen(false)

  const filteredInventory = useMemo(() => {
    console.log(inventoryList)

    if (!inventoryList) return []

    if (!usersSearch) return inventoryList

    return inventoryList.filter((product: IProduct) => {
      const objectAsString = JSON.stringify(product).toLowerCase()
      return objectAsString.includes(usersSearch.toLowerCase())
    })
  }, [inventoryList, usersSearch])

  const handleSearch = (value: string) => setUsersSearch(value)

  return (
    <>
      <S.ProductsView>
        <S.ProductsViewHeader>
          <S.ProductsViewHeaderFilters>
            <Input
              style={{ width: '100%', maxWidth: '280px' }}
              addonAfter={
                <IoSearchSharp style={{ fontSize: 16, marginBottom: '-3px' }} />
              }
              placeholder="Pesquise aqui..."
              onChange={(e) => handleSearch(e.target.value)}
              value={usersSearch}
            />
          </S.ProductsViewHeaderFilters>
          <S.ProductsViewHeaderMenu>
            <Button type="default" onClick={showWithdrawHistoricModal}>
              Novo Produto
            </Button>
          </S.ProductsViewHeaderMenu>
        </S.ProductsViewHeader>
        <S.ProductsViewContent>
          <ProductsList
            productsListData={filteredInventory}
            // openDeleteModal={handleOpenDeleteProject}
            // openViewModal={handleOpenViewProject}
          />
        </S.ProductsViewContent>
      </S.ProductsView>

      <ProductCreationModal
        isModalOpen={isWithdrawHistoricModalOpen}
        handleModalClose={handleWithdrawHistoricModalClose}
      />
    </>
  )
}

export default ProductsView

// =========================================== WITHDRAW HISTORIC

interface IProductCreationModal {
  isModalOpen: boolean
  handleModalClose: () => void
}
const ProductCreationModal = ({
  isModalOpen,
  handleModalClose
}: IProductCreationModal) => {
  const { token } = theme.useToken()

  const { userData } = useAdminAuth()

  const [isCreateProductLoading, setIsCreateProductLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ICreateProduct>()

  const { isValid } = formState

  const handleCreateWithdraw = async (data: ICreateProduct) => {
    setIsCreateProductLoading(true)

    const productData: ICreateProduct = {
      productName: data.productName,
      productCode: data.productCode,
      productCodeConversion: data.productCodeConversion,
      productDescription: data.productDescription,
      productCostValue: formatByCurrency(data.productCostValue),
      productSaleValue: formatByCurrency(data.productSaleValue),
      productQuantity: parseInt(data.productQuantity),
      productLocation: data.productLocation
    }

    const createProductResponse = await handleCreateProduct(productData)

    setIsCreateProductLoading(false)

    if (createProductResponse) {
      reset()
      handleModalClose()
    }
  }

  return (
    <Modal
      title="Criar novo produto"
      open={isModalOpen}
      onOk={handleModalClose}
      onCancel={handleModalClose}
      footer={null}
      destroyOnClose
      afterClose={() => {
        reset()
        handleModalClose()
      }}
    >
      <S.WithdrawForm
        layout="vertical"
        onFinish={handleSubmit(handleCreateWithdraw)}
      >
        <S.WithdrawFormContainer>
          <S.WithdrawFormWrapper>
            <Form.Item label="Nome do produto">
              <Controller
                name="productName"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite o nome do produto"
                    />
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Código original">
              <Controller
                name="productCode"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite o código original do produto"
                    />
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Código de conversão">
              <Controller
                name="productCodeConversion"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite o código de conversão do produto"
                    />
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Descrição do produto">
              <Controller
                name="productDescription"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Descrição da empresa"
                    rows={4}
                    style={{ resize: 'none' }}
                  />
                )}
              />
            </Form.Item>
            <S.InputsWrapper>
              <Form.Item label="Valor de custo">
                <Controller
                  name="productCostValue"
                  control={control}
                  rules={{ required: 'Este campo é obrigatório' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="0,00"
                      addonBefore="R$"
                      onChange={(e) => {
                        const { value } = e.target
                        const formattedValue = formatToCurrency(value)
                        field.onChange(formattedValue)
                      }}
                      style={{ borderRadius: '6px' }}
                    />
                  )}
                />
              </Form.Item>
              <Form.Item label="Valor de venda">
                <Controller
                  name="productSaleValue"
                  control={control}
                  rules={{ required: 'Este campo é obrigatório' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="0,00"
                      addonBefore="R$"
                      onChange={(e) => {
                        const { value } = e.target
                        const formattedValue = formatToCurrency(value)
                        field.onChange(formattedValue)
                      }}
                      style={{ borderRadius: '6px' }}
                    />
                  )}
                />
              </Form.Item>
            </S.InputsWrapper>
            <Form.Item label="Quantidade">
              <Controller
                name="productQuantity"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      placeholder="Digite a quatidade"
                    />
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Localização">
              <Controller
                name="productLocation"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite a localização do produto"
                    />
                  </>
                )}
              />
            </Form.Item>
          </S.WithdrawFormWrapper>
        </S.WithdrawFormContainer>
        <S.WithdrawFormFooter>
          <Button danger loading={isCreateProductLoading}>
            Cancelar
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreateProductLoading}
            disabled={!isValid || isCreateProductLoading}
          >
            Criar
          </Button>
        </S.WithdrawFormFooter>
      </S.WithdrawForm>
    </Modal>
  )
}

// ============================================================= PROJECTS LIST

interface IProductsList {
  productsListData: IProduct[]
}

const ProductsList = ({ productsListData }: IProductsList) => {
  return (
    <S.ProductsList>
      <Table width="100%">
        <Table.Head height={40} paddingRight={0}>
          <Table.TextHeaderCell>Produto</Table.TextHeaderCell>
          <Table.TextHeaderCell>Código</Table.TextHeaderCell>
          <Table.TextHeaderCell>Conversão</Table.TextHeaderCell>
          <Table.TextHeaderCell>Valor de Custo</Table.TextHeaderCell>
          <Table.TextHeaderCell>Valor de Venda</Table.TextHeaderCell>
          <Table.TextHeaderCell>Quantidade</Table.TextHeaderCell>
          <Table.TextHeaderCell>Localização</Table.TextHeaderCell>
          {/* <Table.TextHeaderCell>Produto</Table.TextHeaderCell> */}
          <S.ProductsListMenu />
        </Table.Head>
        <Table.Body height={`calc(100% - 40px)`}>
          {productsListData.map((product: IProduct) => (
            <ProductsListItem
              key={product.productId}
              product={product}
              // openDeleteModal={openDeleteModal}
              // openViewModal={openViewModal}
            />
          ))}
        </Table.Body>
      </Table>
    </S.ProductsList>
  )
}

// ============================================================= PROJECTS LIST ITEM

interface IProductsListItem {
  product: IProduct
}

const ProductsListItem = ({ product }: IProductsListItem) => {
  const [isOnEditMode, setIsOnEditMode] = useState(false)

  return (
    <Table.Row height={50}>
      <Table.TextCell>{product.productName}</Table.TextCell>
      <Table.TextCell>{product.productCode}</Table.TextCell>
      <Table.TextCell>{product.productCodeConversion}</Table.TextCell>
      {/* <Table.TextCell>{product.productDescription}</Table.TextCell> */}
      <Table.TextCell>
        {formatCurrency(parseFloat(product.productCostValue))}
      </Table.TextCell>
      <Table.TextCell>
        {formatCurrency(parseFloat(product.productSaleValue))}
      </Table.TextCell>
      <Table.TextCell>{product.productQuantity}</Table.TextCell>
      <Table.TextCell>{product.productLocation}</Table.TextCell>

      <S.ProductsListMenu>
        {/* <IconButton
          icon={HiOutlineEye}
          iconSize={16}
          size="medium"
          onClick={() => openViewModal(request)}
        /> */}
      </S.ProductsListMenu>
    </Table.Row>
  )
}
