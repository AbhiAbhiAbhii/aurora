'use client'
import { useGlobalContext } from "./my-global-context"


export const DataValue = () => {
    const { value } = useGlobalContext()
    let ourValue = value
    console.log(ourValue, "FJASJDFAJSDHJAS")
    return ourValue
}