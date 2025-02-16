import { Button } from "@heroui/react";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";


export default function Home() {
  return (
   <div>
    <Button 
    className="bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white shadow-lg"
    // variant="flat" 
    startContent={<TbMessageChatbot size={20}/>}
    >
    Charlita?
    </Button>
    <Button 
    as={Link}
    href="/users"
    className="bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white shadow-lg"
    // variant="flat" 
    startContent={<FaUsers size={20}/>}
    >
    Ver la tribuna
    </Button>
   </div>
  );
}
