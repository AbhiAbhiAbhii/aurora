
import { EmailTemplate } from "@/components/email-template"
import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {

    // const body = await req.text()
    // const parsedBody = JSON.parse(body)

    // const { ourData: { passwordData, storeUsernameData, storeReceivermail, rowServicenameData } } = parsedBody

    // try {
    //   const { data, error } = await resend.emails.send({
    //     from: 'noreply@aurora.gradical.xyz',
    //     to: `${storeReceivermail}`,
    //     subject: "Credentials",
    //     react: EmailTemplate({password: passwordData, username: storeUsernameData, servicename: rowServicenameData }) as React.ReactElement,
    //   })
  
    //   if (error) {
    //     return Response.json({ error })
    //   }

    //   return Response.json({ data })
    // } catch (error) {
    //   return Response.json({ error })
    // }

    const body = await req.json()
    const { 
      boolean, 
      rowCompanyNameData,
      rowLoginTypeData,
      rowPasswordData,
      rowSSONameData,
      rowServicenameData,
      rowTypeData,
      rowUsernameData,
      rowURLData,
      rowAdditionalNotesData,
      storeReceivermail,
    } = await body

    try {
      const supabase = createClient()

      const { data, error } = await supabase.from('User_Details').select('email').eq('email', storeReceivermail)
      console.log('AAAAAAAAAAAAAAAAAAAAA')
      console.log(data, 'SERVER DATA')
      console.log(error, 'SERVER ERROR')

      if(error === null) {        
        const {error} = await supabase.from('shared_table').insert({
          company_name: rowCompanyNameData,
          service_name: rowServicenameData,
          password: rowPasswordData,
          type: rowTypeData,
          user_name: rowUsernameData,
          URL: rowURLData,
          additional_notes: rowAdditionalNotesData,
          managed_by: '',
          is_sso: boolean,
          sso_name: rowSSONameData,
          login_type: rowLoginTypeData,
          shared_to_email: storeReceivermail,
          shared_by_email: 'GOD'
        })
        // if(error === null) {
        //   const { data, error } = await resend.emails.send({
        //     from: 'noreply@aurora.gradical.xyz',
        //     to: `${storeReceivermail}`,
        //     subject: "Credentials",
        //     react: EmailTemplate({servicename: rowServicenameData}) as React.ReactElement,
        //   })
        // }
        console.log('BBBBBBBBBBBBBBBBBBBBBBBB', error)
        return NextResponse.json({ title: 'Success', message: `Credentials has been sent to ${storeReceivermail}` }, { status: 200 })
      } else {
        console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
        return NextResponse.json({ title: 'Error', message: `${storeReceivermail} not found in database`}, { status: 500 })
      }
    } catch (err) {
      console.log(err, "error")
      return NextResponse.json(err, { status: 500 })
    }    

  }