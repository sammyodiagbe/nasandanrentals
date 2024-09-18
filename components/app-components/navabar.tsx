"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";

const Navbar = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
    <nav className=" p-4  sticky top-0 bg-white z-10">
      <div className="lg:container flex justify-between items-center">
        <h1 className="font-bold text-xl">
          <Link href={"/"}>Nasandan</Link>
        </h1>

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
    </nav>
  );
};

export default Navbar;
