import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { PenBox } from "lucide-react";
import { checkUser } from "@/actions/user";

const Header = async () => {
  await checkUser();
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center z-20 p-5 border-b-2 backdrop-blur-md">
      <div>
        <Link href="/">
          <Image src="/jira.png" alt="icon" height={30} width={30} />
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <Button asChild variant="bgBlue">
          <Link href="?create-project=true">
            <PenBox /> Create Project
          </Link>
        </Button>

        <SignedOut>
          <Button asChild variant="outline">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton appearance={{ elements: { avatarBox: "h-10 w-10" } }} />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
