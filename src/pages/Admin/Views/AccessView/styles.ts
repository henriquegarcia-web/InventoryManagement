import styled from 'styled-components'
import { Form } from 'antd'
import { responsiveMobile, responsiveTablet } from '@/utils/styles/globals'

export const AccessView = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 100%;
  height: 100%;
`

export const AccessViewHeader = styled.div`
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
`

export const AccessViewHeaderFilters = styled.div`
  display: flex;

  @media screen and (max-width: ${responsiveTablet}) {
    .ant-input-group-wrapper {
      width: 100% !important;
      max-width: 100% !important;
    }
  }
`

export const AccessViewHeaderMenu = styled.div`
  display: flex;

  @media screen and (max-width: ${responsiveTablet}) {
    width: 100%;
    justify-content: flex-end;
  }
`

export const AccessViewContent = styled.div`
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

export const CreateClientForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-btn-compact-first-item {
    flex: 1 !important;
  }
`

export const CreateClientFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`

// ============================================== CLIENTS LIST

export const AccessList = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: ${responsiveTablet}) {
    width: fit-content;
  }
`

// ============================================== CLIENTS LIST ITEM

export const AccessListMenu = styled.div`
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
