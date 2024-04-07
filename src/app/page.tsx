import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Home() {

  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if(!session) {
    redirect('/login')
  }

  console.log(session, "my session")

  return (
    <main className="flex flex-col items-center justify-start min-h-screen w-screen py-16 overflow-hidden">
      <p>
        Hello user
      </p>
    </main>
  )
}
