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
import { useDataContext } from "@/context/dataContext";

const BookingsPage = () => {
  const { user, bookings } = useDataContext()!;

  return (
    <main className="py-8">
      <div className="p-4 mb-8 space-y-2">
        <h1 className="text-5xl font-bold text-gray-800">
          Hi, {user ? user.user_metadata.fullname : "There"}.
        </h1>
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
