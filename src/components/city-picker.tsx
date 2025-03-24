"use client";
import { Country, State, City } from "country-state-city"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { MapPinIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react";
import { useRouter } from "next/navigation";


type TCountry={
  value:{
    latitude:string;
    longitude:string;
    isoCode:string;
  };
  label:string;
}|null;

type TState={
  value:{
    latitude:string;
    longitude:string;
    countryCode:string;
    name:string;
    isoCode:string;    
  }; label:string;
}|null;
type TCity={
  value:{
    latitude:string;
    longitude:string;
    countryCode:string;
    name:string;
    stateCode:string;    
  }; label:string;
}|null;

const countries = Country.getAllCountries().map((country)=>({
  value:{
    latitude:country.latitude,
    longitude:country.longitude,
    isoCode:country.isoCode
  },
  label:country.name
}))


const handleStateChange=(stateName:string)=>{
  
}

export function CityPicker() {
const[selectCountry,setSelectCountry]=useState<TCountry>(null);
const[selectState,setSelectState]=useState<TState>(null)
const[selectCity,setSelectCity]=useState<TCity>(null)
const handleCounrtyChange =(countryName:string)=>{
  const country =countries.find((resp)=>resp.label===countryName) as TCountry;
  setSelectCountry(country);
  setSelectState(null);
  setSelectCity(null);
}

  return (
    
    <Card className="bg-grey-100/40 border-none w-full md:w-150 flex justify-center">
      
      <CardHeader className="flex justify-center">
        <CardTitle >
          <div className="flex justify-center ">
            <MapPinIcon className="size-6 mr-2" />
            <h2>Select City</h2>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={handleCounrtyChange}>
            <SelectTrigger className="w-full" >
              <SelectValue placeholder="Select a Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country, index:number)=>(
                <SelectItem key={index} value={country.label}>{country.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          
          <Select onValueChange={handleStateChange}
          disabled={!selectCountry}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a State" />
            </SelectTrigger>
            <SelectContent>
             {selectCountry && State.getStatesOfCountry(selectCountry.value.isoCode)?.map((state,index:number)=>(
              <SelectItem key={index} value={state.name}>{state.name}</SelectItem>
             ))}
              
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>


      <CardFooter className="flex justify-end">
        <Button className="bg-green-500 hover:bg-green-500/90">Find</Button>
      </CardFooter >


    </Card>
    

  )
}
