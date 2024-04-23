import { useGlobalContext } from "./my-global-context"

export const PasswordGlobal = () => {
    const { setAlertTitle, setAlertDescription } = useGlobalContext()
    setAlertTitle('Password Copied!')
    setAlertDescription('Your credential password is ready to be pasted.')
    const alertContainer = document.querySelector('.alert')
    alertContainer?.classList.add('alert-active')
    setTimeout(() => {
      alertContainer?.classList.remove('alert-active')
    }, 2000)
}