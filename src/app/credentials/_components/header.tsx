'use client'
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const Header = () => {

    const router = useRouter()

    const handleSignOut = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if(!error) {
            router.push("/login")
        } else return alert("Something went WONG")
    }

  return (
    <div className='w-full flex items-center justify-between py-4 px-10'>
        <p>HELLO</p>
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={"outline"}>
                        Signout
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to signout ?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction>
                            <Button 
                                className='!w-full'
                                onClick={() => handleSignOut()}
                            >
                                SignOut
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
  )
}

export default Header