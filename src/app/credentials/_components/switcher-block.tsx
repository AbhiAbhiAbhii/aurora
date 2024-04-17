'use client'
import { 
    Tabs, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"
import AuroraText from "@/components/global/aurora-text"
import { useGlobalContext } from "@/components/global/my-global-context"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = {}

interface TabValue {
    tab: string
}
const SwitcherBlock = (props: Props) => {

    const tabs: TabValue[] = [
        {
            tab: 'All'
        },
        {
            tab: 'Operations'
        },
        {
            tab: 'Socials'
        },
        {
            tab: 'Subscriptions'
        },
    ]

    const { setTabValue } = useGlobalContext()

    return (
        <div>
            <AuroraText 
                text="Credentials"
                className="font-inter font-semibold text-3xl tracking-[-0.02em] mb-4"
            />
            <div className="flex items-center justify-between mb-4">
                <Tabs defaultValue={tabs[0].tab}>
                    <TabsList>
                        {
                            tabs.map((item, index) => (
                                <TabsTrigger 
                                    value={item.tab}
                                    key={item.tab}
                                    className="font-inter font-medium text-sm text-muted-foreground"
                                    onClick={(e) => setTabValue(e.currentTarget.innerText)}
                                >
                                    {item.tab}
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                </Tabs>
                <Button 
                    className="flex items-center"
                >
                    <Plus 
                        className="mr-4"
                        size={16}
                    />
                    Add Credentials
                </Button>
            </div>
        </div>
    )
}

export default SwitcherBlock