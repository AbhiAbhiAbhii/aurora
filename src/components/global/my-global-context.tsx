'use client'
import { createContext, useContext } from "react"
export type GlobalContent = {
  value: string
  setValue:(v: string) => void
  linkValue: string,
  setLinkValue:(v: string) => void
  tabValue: string
  setTabValue:(v: string) => void,
  alertTitle: string
  setAlertTitle: (v: string) => void
  alertDescription: string
  setAlertDescription: (v: string) => void
  checkBoxIdValue: any
  setCheckBoxIdValue: (v: any) => void
  isGodCheck: any
  setIsGodCheck: (v: any) => void
  currentSessionUser: any
  setCurrentSessionUser: (v: any) => void
  serviceTableName: any
  setServiceTableName: (v: any) => void,
  sharedCredentialsData: any,
  setSharedCredentialData: (v: any) => void,
  targetId: any,
  setTargetId: (v: any) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
value: '', // set a default value
setValue: () => {},
linkValue: '',
setLinkValue: () => {},
tabValue: '',
setTabValue: () => {},
alertTitle: '',
setAlertTitle: () => {},
alertDescription: '',
setAlertDescription: () => {},
checkBoxIdValue: '',
setCheckBoxIdValue: () => {},
isGodCheck: '',
setIsGodCheck: () => {},
currentSessionUser: '',
setCurrentSessionUser: () => {},
serviceTableName: '',
setServiceTableName: () => {},
sharedCredentialsData: '',
setSharedCredentialData: () => {},
targetId: '',
setTargetId: () => {}
})
export const useGlobalContext = () => useContext(MyGlobalContext)