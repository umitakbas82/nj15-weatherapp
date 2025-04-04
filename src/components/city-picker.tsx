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




export function CityPicker() {
const[selectedCountry,setSelectCountry]=useState<TCountry>(null);
const[selectState,setSelectState]=useState<TState>(null)
const[selectCity,setSelectCity]=useState<TCity>(null)
const handleCounrtyChange =(countryName:string)=>{
  const country =countries.find((resp)=>resp.label===countryName) as TCountry;
  setSelectCountry(country);
  setSelectState(null);
  setSelectCity(null);
}

const handleStateChange=(stateName:string)=>{
  if(selectedCountry){
    const state=State.getStatesOfCountry(selectedCountry.value.isoCode)?.find((s)=>s.name===stateName);
    if(state){
      setSelectState({
        value:{
          latitude:state.latitude!,
          longitude:state.longitude!,
          countryCode:state.countryCode,
          name:state.name,
          isoCode: state.isoCode,

        },
        label:state.name,
      });
    }
  }
};

const handleCityChange=(cityName:string)=>{
  if(selectedCountry){
    const city =City.getCitiesOfCountry(selectedCountry.value.isoCode)?.find((c)=>c.name ===cityName);
    if(city){
      setSelectCity({
        value:{
          latitude:city.latitude!,
          longitude:city.longitude!,
          countryCode:city.countryCode,
          name:city.name,
          stateCode:city.stateCode,
        },
        label:city.name
      });
    }
  }
};

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
          disabled={!selectedCountry}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a State" />
            </SelectTrigger>
            <SelectContent>
             {selectedCountry && State.getStatesOfCountry(selectedCountry.value.isoCode)?.map((state,index:number)=>(
              <SelectItem key={index} value={state.name}>{state.name}</SelectItem>
             ))}
              
            </SelectContent>
          </Select>
          
          
          
          <Select onValueChange={handleCityChange} disabled={!selectedCountry || !selectState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a City" />
            </SelectTrigger>
            <SelectContent>
            {selectedCountry && City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map((state,index:number)=>(
              <SelectItem key={index} value={state.name}>{state.name}</SelectItem>
             ))}
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
