import { Button } from "@heroui/react";
import {  FaBeer, FaCoffee } from "react-icons/fa";

export default function Home() {
  return (
   <div>
    <h1 className="text-3xl font-bold">Tirame un centro!</h1>
    <Button color="danger" variant="flat" startContent={<FaCoffee />}>
      Charlita?
    </Button>
   </div>
  );
}
