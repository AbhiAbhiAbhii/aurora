'use client'
import { createContext, useContext } from "react"
export type GlobalContent = {
  value: string
  setValue:(v: string) => void
  linkValue: string,
  setLinkValue:(v: string) => void
  tabValue: string
  setTabValue:(v: string) => void,
  credentialInsert: boolean,
  setCredentialInsert: (v: boolean) => void
  alertTitle: string
  setAlertTitle: (v: string) => void
  alertDescription: string
  setAlertDescription: (v: string) => void
  checkBoxIdValue: any
  setCheckBoxIdValue: (v: any) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
value: '', // set a default value
setValue: () => {},
linkValue: '',
setLinkValue: () => {},
tabValue: '',
setTabValue: () => {},
credentialInsert: false,
setCredentialInsert: () => {},
alertTitle: '',
setAlertTitle: () => {},
alertDescription: '',
setAlertDescription: () => {},
checkBoxIdValue: '',
setCheckBoxIdValue: () => {}
})
export const useGlobalContext = () => useContext(MyGlobalContext)