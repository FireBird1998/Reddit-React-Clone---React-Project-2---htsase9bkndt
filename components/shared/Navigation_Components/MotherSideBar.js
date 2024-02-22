import {useContext} from 'react'
import { AuthContext } from '@/context/AuthContext'

import SideBar from './SideBar'
import AuthNavDropDown from './AuthNavDropDown'


const MotherSideBar = () => {
    const { isUserAuthenticated } = useContext(AuthContext);

  return (
    !isUserAuthenticated() && <SideBar />
  )
}

export default MotherSideBar