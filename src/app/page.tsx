import { Button } from "@heroui/react";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";


export default function Home() {
  return (
   <div>
    <Button 
    color="danger" 
    variant="flat" 
    startContent={<TbMessageChatbot size={20}/>}
    >
    Charlita?
    </Button>
    <Button 
    as={Link}
    href="/users"
    color="danger" 
    variant="flat" 
    startContent={<FaUsers size={20}/>}
    >
    Ver la tribuna
    </Button>
   </div>
  );
}
