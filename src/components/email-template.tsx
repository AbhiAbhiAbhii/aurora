import React from 'react'

interface EmailTemplateProps {
    password?: string
    username?: string
    servicename?: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ password, username, servicename }) => {

    let mailText = `Hi, the ${servicename} has been shared with you under the 'shared' tab`

    return (
        <div>
            <p>
                {mailText}<br/>
                The credential will disappear within 24hours on receiving this mail
            </p>
            <a href='https://aurora.gradical.xyz/'>
                Login
            </a>
        </div>
    )
}