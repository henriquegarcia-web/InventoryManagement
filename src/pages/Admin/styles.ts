import styled from 'styled-components'
import { Window, responsiveMobile } from '@/utils/styles/globals'

const adminHeaderHeight = '50px'

interface INavigationLink {
  active: number
}

export const Admin = styled(Window)`
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 20px; */
`

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;
  width: 100%;
  height: ${adminHeaderHeight};
  padding: 0 20px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

export const AdminHeaderLogo = styled.div`
  display: flex;

  h1 {
    font-size: 20px;
    line-height: 20px;
    font-weight: 800;
    text-transform: uppercase;

    color: rgba(0, 0, 0, 0.8);
  }
`

export const AdminHeaderNavigation = styled.div`
  display: flex;
  height: 100%;
`

export const NavigationLink = styled.div<INavigationLink>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;

  font-size: 15px;
  line-height: 15px;
  font-weight: 400;

  color: rgba(0, 0, 0, 0.6);
  border-bottom: 2px solid
    ${({ active }) => (active ? '#f56a00' : 'transparent')};
`

export const AdminHeaderUserInfos = styled.div`
  display: flex;
  margin-left: auto;
`

export const AdminViews = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - ${adminHeaderHeight});
  padding: 20px;
`

// export const Admin = styled.div`
//   display: flex;
// `

// export const Admin = styled.div`
//   display: flex;
// `

// ============================================== USER MENU

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  &:hover {
    p {
      opacity: 1;
    }
  }

  @media screen and (max-width: ${responsiveMobile}) {
    display: none;
  }
`

export const UserMenuName = styled.p`
  display: flex;
  transition: 0.3s;
  opacity: 0.8;

  font-size: 14px;
`
