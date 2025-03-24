import { CityPicker } from "@/components/city-picker";


export default function Home() {
  return (
   <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-b from-grey-100/90 via-grey-100/90 to-blue-300/90">
    <CityPicker/>
   </main>
  );
}
