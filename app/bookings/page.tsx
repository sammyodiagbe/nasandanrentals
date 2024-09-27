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

      <div className="p-4 grid md:grid-cols-3 gap-[1.9rem]">
        <div className="booking-card ">
          <h1 className="font-bold text-3xl">3</h1>
          <div className="">
            <h1>Reserved</h1>
          </div>
        </div>
        <div className="booking-card">
          <h1 className="font-bold text-3xl">0</h1>
          <div className="">
            <h1>Booked</h1>
          </div>
        </div>
        <div className="booking-card">
          <h1 className="font-bold text-3xl">7</h1>
          <div className="">
            <h1>Completed</h1>
          </div>
        </div>
      </div>

      <div className="p-4 mt-10">
        <h1>Recent Bookings.</h1>
      </div>

      {bookings && bookings.length ? (
        <Table className="relative">
          <TableCaption>A list of your recent bookings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Car name</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Pickup date</TableHead>
              <TableHead>Pickup Time</TableHead>
              <TableHead className="t">Return date</TableHead>
              <TableHead className="t">Return time</TableHead>
              <TableHead className="t">Total Cost ($)</TableHead>
              <TableHead className="t">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking, index) => {
              console.log(booking);
              const {
                cars: { name, price },
                pickup_date,
                pickup_time,
                total_cost,
                return_date,
                return_time,
                status,
              } = booking;
              return (
                <TableRow key={index}>
                  <TableCell className="">{name}</TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>{format(pickup_date, "PPP")}</TableCell>
                  <TableCell className="">
                    {combineDateAndTime(pickup_date, pickup_time)}
                  </TableCell>
                  <TableCell className="">
                    {format(return_date, "PPP")}
                  </TableCell>
                  <TableCell className="">
                    {combineDateAndTime(return_date, return_time)}
                  </TableCell>
                  <TableCell className="">{total_cost}</TableCell>
                  <TableCell className="">
                    <span
                      className={cn(
                        "p-1 px-4 bg-gray-300 text-black rounded-full",
                        status === "completed" && "bg-green-500 text-white"
                      )}
                    >
                      {status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
