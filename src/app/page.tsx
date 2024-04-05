import InputCredentialsForm from "@/components/forms/input-credentials-form";
import AuroraText from "@/components/global/aurora-text";
import { redirect } from "next/navigation";

export default async function Home() {

  // redirect("/login")

  return (
    <main className="flex flex-col items-center justify-start h-screen w-screen py-16">
      <AuroraText 
        text="Aurora"
        className="font-geist text-6xl"
      />
      <div className="mt mt-32">
        <InputCredentialsForm 

        />
      </div>
    </main>
  )
}
