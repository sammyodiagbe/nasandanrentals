"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import MobileMenu from "./menuComponent";
import Image from "next/image";

const Navbar = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) console.error("Error fetching session:", error);
      setUser(session?.user ?? null);
    };

    getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        session &&
        (event === "SIGNED_IN" ||
          event === "TOKEN_REFRESHED" ||
          event === "USER_UPDATED")
      ) {
        setUser(session.user);
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    console.log("mounted");

    return () => {
      subscription.unsubscribe();
      console.log("Unmounted");
    };
  }, []);
  const signOut = async () => {
    await signOutAction();
    setUser(null);
    router.push("/sign-in");
  };
  return (
    <nav className=" p-4  sticky top-0 bg-white z-10 h-[70px]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">
          <Link href={"/"}>
            <Image
              src={"/images/favicon.svg"}
              alt={"logo"}
              className="h-12 w-12"
              height={100}
              width={100}
            />
            <h1>Nasandanrentals</h1>
          </Link>
        </h1>

        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="hidden md:block">
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
              {user ? (
                <Button className="" variant={"outline"} onClick={signOut}>
                  Logout
                </Button>
              ) : (
                <Link href={"/sign-in"}>
                  <Button variant={"outline"}>Sign in</Button>
                </Link>
              )}
            </li>
            {user ? (
              <li>
                <span className="h-8 w-8 rounded-full flex items-center justify-center font-bold bg-gray-300 text-sm">
                  {user?.user_metadata.full_name[0]}
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
    </nav>
  );
};

export default Navbar;
