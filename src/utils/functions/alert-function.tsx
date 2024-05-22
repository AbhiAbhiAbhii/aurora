import { useGlobalContext } from "@/components/global/my-global-context"

export const getAlertContainer = () => {
    let alertContainer = document.querySelector('.alert')
    alertContainer?.classList.add('alert-active')
    setTimeout(() => {
      alertContainer?.classList.remove('alert-active')
    }, 1000)
}

export const MessageFunction = (title: string, description: string) => {

    const { setAlertTitle, setAlertDescription } = useGlobalContext()

    getAlertContainer()
    setAlertTitle(title)
    setAlertDescription(description)
}