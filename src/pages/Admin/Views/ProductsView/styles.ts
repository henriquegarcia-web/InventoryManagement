import styled from 'styled-components'
import { Form } from 'antd'

export const ProductsView = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 100%;
  height: 100%;
`

export const ProductsViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`

export const ProductsViewHeaderFilters = styled.div`
  display: flex;
`

export const ProductsViewHeaderMenu = styled.div`
  display: flex;
`

export const ProductsViewContent = styled.div`
  display: flex;
  border-radius: 8px;
  height: calc(100% - 40px);

  border: 1px solid rgba(0, 0, 0, 0.1);
`

// export const ProductsView = styled.div`
//   display: flex;
// `

// export const ProductsView = styled.div`
//   display: flex;
// `

// export const ProductsView = styled.div`
//   display: flex;
// `

// export const ProductsView = styled.div`
//   display: flex;
// `

export const WithdrawForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

export const WithdrawFormContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
  overflow: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 4px;
    z-index: 1000;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #ff7a00;
  }
`

export const WithdrawFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  height: fit-content;

  .ant-form-item {
    margin-bottom: 0px;
  }
`

export const WithdrawFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
`

export const InputsWrapper = styled.div`
  display: flex;
  column-gap: 20px;
`

// ============================================== CLIENTS LIST

export const ProductsList = styled.div`
  display: flex;
  width: 100%;
`

// ============================================== CLIENTS LIST ITEM

export const ProductsListMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
  column-gap: 5px;
  padding-right: 8px;

  button {
    svg {
      margin: 1px 0 0 0 !important;
    }
  }
`
