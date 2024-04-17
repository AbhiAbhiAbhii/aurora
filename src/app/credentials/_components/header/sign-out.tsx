import React from 'react'
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

type Props = {
    handleClick:() => void
    className?: string
}

const SignoutComponent = ({ handleClick, className }: Props) => {
  return (
    <div className={className}>
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
                    <AlertDialogAction 
                        onClick={() => handleClick()}
                    >
                        SignOut
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
  )
}

export default SignoutComponent