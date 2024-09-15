"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import ParagraphSuspense from "@/components/suspense/paragraph";

const PaymentSuccessful = () => {
  return (
    <main className="py-8">
      <div className="max-w-[550px] space-y-2 p-4 shadow-sm mx-auto">
        <h1 className="text-5xl  font-bold">Payment successful</h1>

        <ParagraphSuspense />

        <div className="flex justify-end items-center gap-1 pt-8">
          <Link href="/bookings">
            <Button variant={"link"}> View your bookings</Button>
          </Link>
          <Link href={"/collections"}>
            <Button variant={"link"}>View Collections</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccessful;
