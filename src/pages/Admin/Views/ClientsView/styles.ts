import { responsiveMobile, responsiveTablet } from '@/utils/styles/globals'
import styled from 'styled-components'

export const ClientsView = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 100%;
  height: 100%;
`

export const ClientsViewHeader = styled.div`
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

export const ClientsViewHeaderFilters = styled.div`
  display: flex;

  @media screen and (max-width: ${responsiveTablet}) {
    .ant-input-group-wrapper {
      width: 100% !important;
      max-width: 100% !important;
    }
  }
`

export const ClientsViewHeaderMenu = styled.div`
  display: flex;

  @media screen and (max-width: ${responsiveTablet}) {
    width: 100%;
    justify-content: flex-end;
  }
`

export const ClientsViewContent = styled.div`
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

// ============================================== CLIENTS LIST

export const ClientsList = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: ${responsiveTablet}) {
    width: fit-content;
  }
`

// ============================================== CLIENTS LIST ITEM

export const ClientsListMenu = styled.div`
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
