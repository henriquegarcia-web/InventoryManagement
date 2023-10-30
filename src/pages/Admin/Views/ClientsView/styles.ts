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
`

export const ClientsViewHeaderFilters = styled.div`
  display: flex;
`

export const ClientsViewHeaderMenu = styled.div`
  display: flex;
`

export const ClientsViewContent = styled.div`
  display: flex;
  border-radius: 8px;
  height: calc(100% - 40px);

  border: 1px solid rgba(0, 0, 0, 0.1);
`

// ============================================== CLIENTS LIST

export const ClientsList = styled.div`
  display: flex;
  width: 100%;
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
