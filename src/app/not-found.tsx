import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col items-center pt-36">
      <h1 className="text-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-transparent bg-clip-text">
        Oops; the page you tried to access does not exists
      </h1>
      <Link href="/">
        <Button variant="bgBlue">
          <Home />
          <span>Take Me Home</span>
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
