import { useEffect, useMemo, useState } from 'react'

import * as S from './styles'
import {
  IoChevronDownOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoSearchSharp
} from 'react-icons/io5'

import { Button, Dropdown, Form, Input, Modal, theme } from 'antd'
import { Table } from 'evergreen-ui'

import { Controller, useForm } from 'react-hook-form'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useAdmin } from '@/contexts/AdminContext'
import { handleCreateProduct, handleEditProduct } from '@/firebase/inventory'

import {
  formatByCurrency,
  formatCurrency,
  formatCurrencyToEdit,
  formatToCurrency
} from '@/utils/functions/formatCurrency'

import { ICreateProduct, IProduct } from '@/@types/Admin'

const ProductsView = () => {
  const { inventoryList } = useAdmin()

  const [usersSearch, setUsersSearch] = useState('')
  const [usersSearchFilter, setUsersSearchFilter] = useState('')

  const [isWithdrawHistoricModalOpen, setIsWithdrawHistoricModalOpen] =
    useState(false)

  const showWithdrawHistoricModal = () => setIsWithdrawHistoricModalOpen(true)
  const handleWithdrawHistoricModalClose = () =>
    setIsWithdrawHistoricModalOpen(false)

  const filteredInventory = useMemo(() => {
    if (!inventoryList) return []

    const sorted: any = [...inventoryList]

    switch (usersSearchFilter) {
      case 'ordemCrescente':
        sorted.sort((a: any, b: any) =>
          a.productName.localeCompare(b.productName)
        )
        break
      case 'ordemDecrescente':
        sorted.sort((a: any, b: any) =>
          b.productName.localeCompare(a.productName)
        )
        break
      case 'menorValorCusto':
        sorted.sort((a: any, b: any) => a.productCostValue - b.productCostValue)
        break
      case 'maiorValorCusto':
        sorted.sort((a: any, b: any) => b.productCostValue - a.productCostValue)
        break
      case 'menorValorVenda':
        sorted.sort((a: any, b: any) => a.productSaleValue - b.productSaleValue)
        break
      case 'maiorValorVenda':
        sorted.sort((a: any, b: any) => b.productSaleValue - a.productSaleValue)
        break
      case 'quantidadeCrescente':
        sorted.sort((a: any, b: any) => a.productQuantity - b.productQuantity)
        break
      case 'quantidadeDecrescente':
        sorted.sort((a: any, b: any) => b.productQuantity - a.productQuantity)
        break
      default:
        break
    }

    console.log(usersSearchFilter)

    if (!usersSearch) return sorted

    return sorted.filter((product: IProduct) => {
      const objectAsString = JSON.stringify(product).toLowerCase()
      return objectAsString.includes(usersSearch.toLowerCase())
    })
  }, [inventoryList, usersSearch, usersSearchFilter])

  const handleSearch = (value: string) => setUsersSearch(value)

  const formattedAgreements: any[] = useMemo(() => {
    return (
      orderOptions.map((item) => ({
        key: item.orderId,
        label: item.orderLabel
      })) || []
    )
  }, [])

  const getAgreementLabel = (key: string): string | null => {
    const item: any = formattedAgreements.find((item) => item.key === key)
    return item ? item.label : null
  }

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
            <Dropdown.Button
              onClick={() => setUsersSearchFilter('')}
              menu={{
                items: formattedAgreements,
                onClick: (e) => setUsersSearchFilter(e.key),
                style: { width: '100%' }
              }}
              icon={
                <IoChevronDownOutline
                  style={{ fontSize: 16, marginBottom: '-4px' }}
                />
              }
              trigger={['click']}
            >
              {usersSearchFilter
                ? getAgreementLabel(usersSearchFilter.toString())
                : 'Selecione um filtro'}
            </Dropdown.Button>
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
  const { isAdminSuper } = useAdminAuth()

  const [isOnEditMode, setIsOnEditMode] = useState(false)

  const [activeProduct, setActiveProduct] = useState<IProduct | null>(null)

  const [viewProductModalIsOpen, setViewProductModalIsOpen] = useState(false)
  const [editProductModalIsOpen, setEditProductModalIsOpen] = useState(false)

  const handleShowViewProductModal = (product: IProduct) => {
    setActiveProduct(product)
    setViewProductModalIsOpen(true)
  }
  const handleCloseViewProductModal = () => {
    setActiveProduct(null)
    setViewProductModalIsOpen(false)
  }

  const handleShowEditProductModal = (product: IProduct) => {
    setActiveProduct(product)
    setEditProductModalIsOpen(true)
  }
  const handleCloseEditProductModal = () => {
    setActiveProduct(null)
    setEditProductModalIsOpen(false)
  }

  return (
    <>
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
          <Button
            onClick={() => handleShowViewProductModal(product)}
            icon={<IoEyeOutline style={{ fontSize: 20, marginLeft: '5px' }} />}
          />
          {isAdminSuper && (
            <Button
              onClick={() => handleShowEditProductModal(product)}
              icon={
                <IoCreateOutline style={{ fontSize: 20, marginLeft: '5px' }} />
              }
            />
          )}
        </S.ProductsListMenu>
      </Table.Row>

      {isAdminSuper && (
        <ProductEditionModal
          isModalOpen={editProductModalIsOpen}
          handleModalClose={handleCloseEditProductModal}
          product={product}
        />
      )}

      <ProductViewModal
        isModalOpen={viewProductModalIsOpen}
        handleModalClose={handleCloseViewProductModal}
        product={product}
      />
    </>
  )
}

// =========================================== EDIT PRODUCT

interface IProductEditionModal {
  isModalOpen: boolean
  handleModalClose: () => void
  product: IProduct
}
const ProductEditionModal = ({
  isModalOpen,
  handleModalClose,
  product
}: IProductEditionModal) => {
  const [isCreateProductLoading, setIsCreateProductLoading] = useState(false)

  const { control, handleSubmit, reset, formState, setValue } =
    useForm<ICreateProduct>()

  const { isValid } = formState

  useEffect(() => {
    setValue('productName', product.productName)
    setValue('productCode', product.productCode)
    setValue('productCodeConversion', product.productCodeConversion)
    setValue('productDescription', product.productDescription)
    setValue(
      'productCostValue',
      formatCurrencyToEdit(parseFloat(product.productCostValue))
    )
    setValue(
      'productSaleValue',
      formatCurrencyToEdit(parseFloat(product.productSaleValue))
    )
    setValue('productQuantity', product.productQuantity)
    setValue('productLocation', product.productLocation)
  }, [product])

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

    const createProductResponse = await handleEditProduct(
      product.productId,
      productData
    )

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
            Editar
          </Button>
        </S.WithdrawFormFooter>
      </S.WithdrawForm>
    </Modal>
  )
}

// =========================================== EDIT PRODUCT

interface IProductViewModal {
  isModalOpen: boolean
  handleModalClose: () => void
  product: IProduct
}
const ProductViewModal = ({
  isModalOpen,
  handleModalClose,
  product
}: IProductViewModal) => {
  return (
    <Modal
      title={product.productName || 'Visualizando produto'}
      open={isModalOpen}
      onOk={handleModalClose}
      onCancel={handleModalClose}
      okText="Ok"
      cancelText="Cancelar"
      cancelButtonProps={{
        style: {
          display: 'none'
        }
      }}
      destroyOnClose
      afterClose={() => {
        handleModalClose()
      }}
    >
      <S.ViewProductContainer>
        <S.ViewProductWrapper>
          <S.ViewProduct>
            <b>Nome do Produto</b>
            <p>{product.productName}</p>
          </S.ViewProduct>
          <S.ViewProduct>
            <b>Código Original</b>
            <p>{product.productCode}</p>
          </S.ViewProduct>
          <S.ViewProduct>
            <b>Código de Conversão</b>
            <p>{product.productCodeConversion}</p>
          </S.ViewProduct>
          <S.ViewProduct>
            <b>Descição</b>
            <p>{product.productDescription}</p>
          </S.ViewProduct>
          <S.ViewProduct>
            <b>Valor de Custo</b>
            <p>{formatCurrency(parseFloat(product.productCostValue))}</p>
          </S.ViewProduct>
          <S.ViewProduct>
            <b>Valor de Venda</b>
            <p>{formatCurrency(parseFloat(product.productSaleValue))}</p>
          </S.ViewProduct>
          <S.ViewProduct>
            <b>Quantidade</b>
            <p>{product.productQuantity}</p>
          </S.ViewProduct>
          <S.ViewProduct>
            <b>Localização</b>
            <p>{product.productLocation}</p>
          </S.ViewProduct>
        </S.ViewProductWrapper>
      </S.ViewProductContainer>
    </Modal>
  )
}

const orderOptions = [
  {
    orderId: 'ordemCrescente',
    orderLabel: 'Nome Crescente'
  },
  {
    orderId: 'ordemDecrescente',
    orderLabel: 'Nome Decrescente'
  },
  {
    orderId: 'menorValorCusto',
    orderLabel: 'Menor Valor de Custo'
  },
  {
    orderId: 'maiorValorCusto',
    orderLabel: 'Maior Valor de Custo'
  },
  {
    orderId: 'menorValorVenda',
    orderLabel: 'Menor Valor de Venda'
  },
  {
    orderId: 'maiorValorVenda',
    orderLabel: 'Maior Valor de Venda'
  },
  {
    orderId: 'quantidadeCrescente',
    orderLabel: 'Quantidade Crescente'
  },
  {
    orderId: 'quantidadeDecrescente',
    orderLabel: 'Quantidade Decrescente'
  }
]
