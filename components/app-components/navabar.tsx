"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOutAction } from "@/app/actions";

const Navbar = () => {
  const signOut = async () => {
    await signOutAction();
  };
  return (
    <nav className=" p-4  sticky top-0 bg-white z-10">
      <div className="lg:container flex justify-between items-center">
        <h1 className="font-bold text-xl">Nasandan</h1>

        <div className="navigation">
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/collections"}>Collections</Link>
            </li>
            <li>
              <Link href={"/bookings"}>Bookings</Link>
            </li>

            <li>
              <Button className="" variant={"outline"} onClick={signOut}>
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
