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

const BookingsPage = () => {
  const [bookings, setBookings] = useState<any[] | null>(null);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    const bookings = await getUserBookings();
    console.log(bookings);
    setBookings(bookings);
  };
  return (
    <main className="lg:container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-5xl font-bold text-gray-800">Hi, Devan.</h1>
        <h1>Your bookings</h1>
      </div>

      <div className="grid grid-cols-3 gap-[1.9rem] ">
        <div className="booking-card ">
          <h1 className="font-bold text-4xl">3</h1>
          <div className="">
            <h1>Reserved</h1>
          </div>
        </div>
        <div className="booking-card">
          <h1 className="font-bold text-4xl">0</h1>
          <div className="">
            <h1>Booked</h1>
          </div>
        </div>
        <div className="booking-card">
          <h1 className="font-bold text-4xl">7</h1>
          <div className="">
            <h1>Completed</h1>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1>Recent Bookings.</h1>
      </div>

      <div className="mt-5">
        {bookings && bookings.length ? (
          <Table>
            <TableCaption>A list of your recent bookings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Car name</TableHead>
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
                const {
                  cars: { name, price },
                  pickup_date,
                  pickup_time,
                  total_cost,
                  return_date,
                  return_time,
                } = booking;
                return (
                  <TableRow key={index}>
                    <TableCell className="w-[250px]">{name}</TableCell>
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
                    <TableCell className="">Completed</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="flex items-center justify-center flex-col gap-2 text-gray-800 w-[400px] text-center mt-5 mx-auto">
            <h1 className="text-xl font-bold">
              Oh no, you have no booking yet
            </h1>
            <Link className="" href="/collections">
              <Button className="bg-green-500 hover:bg-green-600">
                Book a car now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default BookingsPage;
