import styled from 'styled-components'
import { Form } from 'antd'
import { responsiveMobile, responsiveTablet } from '@/utils/styles/globals'

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

  @media screen and (max-width: ${responsiveTablet}) {
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 10px;

    height: 90px;
  }

  @media screen and (max-width: ${responsiveMobile}) {
    height: 150px;
  }
`

export const ProductsViewHeaderFilters = styled.div`
  display: flex;
  column-gap: 10px;

  @media screen and (max-width: ${responsiveTablet}) {
    width: 100%;
    justify-content: space-between;

    .ant-space-compact {
      width: fit-content !important;
    }
  }

  @media screen and (max-width: ${responsiveMobile}) {
    flex-direction: column;
    row-gap: 10px;

    .ant-input-group-wrapper {
      width: 100% !important;
      max-width: 100% !important;
    }

    .ant-space-compact,
    .ant-btn-compact-first-item {
      width: 100% !important;
      max-width: 100% !important;
    }

    .ant-btn-compact-last-item {
      width: 40px !important;
    }
  }
`

export const ProductsViewHeaderMenu = styled.div`
  display: flex;

  @media screen and (max-width: ${responsiveTablet}) {
    width: 100%;
    justify-content: flex-end;
  }
`

export const ProductsViewContent = styled.div`
  display: flex;
  border-radius: 8px;
  height: calc(100% - 40px);

  @media screen and (max-width: ${responsiveTablet}) {
    overflow: auto;

    &::-webkit-scrollbar {
      height: 6px;
      z-index: 1000;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb {
      background: #ff7a00;
    }
  }
`

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

  @media screen and (max-width: ${responsiveTablet}) {
    width: fit-content;
  }
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
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 16px !important;
      margin: 0 !important;
    }
  }
`

// ============================================== PRODUCT VIEW MODAL

export const ViewProductContainer = styled.div`
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

export const ViewProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  height: fit-content;
`

export const ViewProduct = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  b {
    font-size: 15px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    font-weight: 300;
  }
`
