'use client'
import { createContext, useContext } from "react"
export type GlobalContent = {
  value: string
  setValue:(v: string) => void
  storedValue: string,
  setStoredValue:(v: string) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
value: '', // set a default value
setValue: () => {},
storedValue: '',
setStoredValue: () => {}
})
export const useGlobalContext = () => useContext(MyGlobalContext)