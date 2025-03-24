import { Country,State,City } from "country-state-city"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { MapPinIcon } from "lucide-react"

export  function CityPicker() {
  return (
    <Card className="bg-green-200/40 border-none w-full md:w-96 flex justify-center">
    <CardHeader className="flex justify-center">
      <CardTitle >
        <div className="flex justify-center text-white">
            <MapPinIcon className="size-6 mr-2"/>
            <h2>Select City</h2>
        </div>
      </CardTitle>
     
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>
  )
}
