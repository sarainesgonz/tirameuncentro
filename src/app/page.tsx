import { auth, signOut } from "@/auth";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";


export default async function Home() {

  const session = await auth();

  return (
    <div>
      <Button
        className="bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white shadow-lg"
        // variant="flat" 
        startContent={<TbMessageChatbot size={20} />}
      >
        Charlita?
      </Button>
      <Button
        as={Link}
        href="/users"
        className="bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white shadow-lg"
        // variant="flat" 
        startContent={<FaUsers size={20} />}
      >
        Ver la tribuna
      </Button>

      <h3 className="text-2xl font-semibold">User session data: </h3>

      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form action={async () => {
            "use server";

            await signOut();
          }}>
            <Button
              className="bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white shadow-lg"
              type="submit"
              startContent={<RiLogoutCircleLine size={20} />}
            >
              Cerrar sesión
            </Button>

          </form>
        </div>
      ) :
        <div>
          <p>No user session</p>
        </div>
      }


    </div>
  );
}
