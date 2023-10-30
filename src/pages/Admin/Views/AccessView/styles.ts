import styled from 'styled-components'
import { Form } from 'antd'

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
`

export const AccessViewHeaderFilters = styled.div`
  display: flex;
`

export const AccessViewHeaderMenu = styled.div`
  display: flex;
`

export const AccessViewContent = styled.div`
  display: flex;
  border-radius: 8px;
  height: calc(100% - 40px);

  border: 1px solid rgba(0, 0, 0, 0.1);
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
`

// ============================================== CLIENTS LIST ITEM

export const AccessListMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
  column-gap: 5px;
  padding-right: 8px;
`
