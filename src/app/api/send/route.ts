
import { EmailTemplate } from "@/components/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {

    const body = await req.text();
    const parsedBody = JSON.parse(body);

    const { ourData: { passwordData, storeUsernameData, storeReceivermail, rowServicenameData } } = parsedBody;

    try {

      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: `${storeReceivermail}`,
        subject: "Credentials",
        react: EmailTemplate({password: passwordData, username: storeUsernameData, servicename: rowServicenameData }) as React.ReactElement,
      });
  
      if (error) {
        return Response.json({ error });
      }
  
      return Response.json({ data });
    } catch (error) {
      return Response.json({ error });
    }
  }