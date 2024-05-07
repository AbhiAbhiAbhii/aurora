import React from 'react'

interface EmailTemplateProps {
    password: string
    username: string
    servicename: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ password, username, servicename }) => {
    return (
        <div>
            <h1>Credential for { servicename } has been shared with you:</h1>
            <p>Username: { username }</p>
            <p>Password: { password }</p>
        </div>
    )
}