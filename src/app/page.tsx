import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Home() {

  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if(!session) {
    redirect('/login')
  }

  redirect('/credentials')
}
