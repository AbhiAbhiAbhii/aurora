import React from 'react'
import { SheetClose, SheetFooter } from '../ui/sheet'
import { Button } from '../ui/button'

type Props = {}

const Testing = (props: Props) => {
  return (
    <SheetFooter className="mt-10">
        <SheetClose>
            <Button
                type="submit"
            >
                Save Credential
            </Button>
        </SheetClose>
        <SheetClose>
            {/* <Button
                className="bg-zinc-100 text-zinc-950 transition-all hover:opacity-75 hover:bg-zinc-100"
                onClick={() => console.log("Cancel")}
            > */}
                Cancel
            {/* </Button> */}
        </SheetClose>
    </SheetFooter>
  )
}

export default Testing