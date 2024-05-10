
type Props = {
    data: string
    isSSO: boolean
    ssoName: string
}

const LoginType = ({ data, isSSO, ssoName }: Props) => {
  return (
    <div>
        {
            isSSO
            ?
            <>
            {ssoName} SSO
            </>
            :
            <>
            {data}
            </>
        }
    </div>
  )
}

export default LoginType