'use client'
import { createContext, useContext } from "react"
export type GlobalContent = {
  value: string
  setValue:(v: string) => void
  linkValue: string,
  setLinkValue:(v: string) => void
  tabValue: string
  setTabValue:(v: string) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
value: '', // set a default value
setValue: () => {},
linkValue: '',
setLinkValue: () => {},
tabValue: '',
setTabValue: () => {}
})
export const useGlobalContext = () => useContext(MyGlobalContext)