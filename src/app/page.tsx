import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function Home() {

  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if(!user) {
    redirect('/login')
  }

  revalidatePath('/credentials')
  redirect('/credentials')
}
