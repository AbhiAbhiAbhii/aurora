'use client'

import AuroraText from "@/components/global/aurora-text"
import { useGlobalContext } from "@/components/global/my-global-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteAllItems, deleteRowItem } from "@/lib/queries"
import { MoreHorizontal, Trash2Icon } from "lucide-react"
import { useRef } from "react"

type Props = {}

const AllAction = (props: Props) => {

    const { checkBoxIdValue, setAlertTitle, setAlertDescription } = useGlobalContext()
    const ref: any = useRef()

    const getAlertContainer = () => {
        let alertContainer = document.querySelector('.alert')
        alertContainer?.classList.add('alert-active')
        setTimeout(() => {
            alertContainer?.classList.remove('alert-active')
        }, 2000)
    }

    const ItemDeletedSuccess = () => {
        getAlertContainer()
        setAlertTitle('Items Deleted')
        setAlertDescription('Your selected credentials were deleted')
        setTimeout(() => {
          location.reload()
        }, 2500)
    }

    const ItemDeletedError = () => {
        getAlertContainer()
        setAlertTitle('Items not deleted')
        setAlertDescription('Something went wrong and credentials were not deleted')
    }
  
    async function deleteItems() {
        let allDataDeleted = await deleteAllItems(checkBoxIdValue)
        ref.current.click()
        if(checkBoxIdValue.length > 0) {
            if(!allDataDeleted.error) {
                ItemDeletedSuccess()
            }
        } else {
            ItemDeletedError()
        }
    }

  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal 
                    size={16}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem ref={ref} className="hidden" />
                    <div
                        onClick={deleteItems}
                    role="menuitem" 
                    className="relative flex cursor-default select-none items-center
                        justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors
                        focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"  
                    data-orientation="vertical" data-radix-collection-item=""
                    >
                    <AuroraText 
                        text="Delete Selected"
                        className="mr-2"
                    />
                    <Trash2Icon size={15} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default AllAction