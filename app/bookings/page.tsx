"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getUserBookings } from "../actions";
import { format } from "date-fns";
import { combineDateAndTime } from "@/utils/dateFormat";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import TableComponent from "@/components/app-components/bookingsTable";

const BookingsPage = () => {
  const [bookings, setBookings] = useState<any[] | null>(null);
  const [user, setUser] = useState<User | null>();
  const supabase = createClient();

  useEffect(() => {
    fetchUser();
    fetchUserBookings();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    if (user) {
      setUser(user);
    }
  };

  const fetchUserBookings = async () => {
    const bookings = await getUserBookings();
    setBookings(bookings);
  };

  const name = user?.user_metadata.full_name;
  return (
    <main className="md:container py-8">
      <div className="p-4 mb-8 space-y-2">
        <h1 className="text-5xl font-bold text-gray-800">Hi, {name}.</h1>
        <h1 className="text-gray-700">Your bookings</h1>
      </div>

      <div className="p-4 mt-10">
        <h1>Recent Bookings.</h1>
      </div>

      {bookings && bookings.length ? (
        <TableComponent bookings={bookings} />
      ) : (
        <div className="flex items-center justify-center flex-col gap-2 text-gray-800  text-center mt-5 mx-auto">
          <h1 className="text-xl font-bold">Oh no, you have no booking yet</h1>
          <Link className="" href="/collections">
            <Button className="bg-green-500 hover:bg-green-600">
              Book a car now
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default BookingsPage;
