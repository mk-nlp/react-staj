
import * as React from "react"
import { useState, useContext } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { SearchSuccessContext } from "@/contexts/searchContext"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
  CommandInputWithoutIcon,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const cities = [
  {
    value: "eskisehir",
    label: "Eskişehir",
  },
  {
    value: "istanbul",
    label: "İstanbul",
  },
  {
    value: "ankara",
    label: "Ankara",
  },
  {
    value: "izmir",
    label: "İzmir",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { updateSearchSuccess, searchSuccess } = useContext(SearchSuccessContext);



  return (
    // This includes a modified version of the CommandInputIcon that removes the search icon
    // Go to definition to see the changes
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between bg-gray-600"
        >
          {value
            ? cities.find((city) => city.value === value)?.label
            : "Search Location"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-gray-600">
        <Command className="bg-gray-400 text-white">
          <CommandInputWithoutIcon/>
          <CommandEmpty>Couldn't find the city you were looking for.</CommandEmpty>
          <CommandList className=" bg-gray-400">
            {cities.map((city) => (
              <CommandItem
                key={city.value}
                value={city.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  updateSearchSuccess(true)
                  console.log(searchSuccess)


                  
                }}
                
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === city.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {city.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
