"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const PaymentSuccessful = () => {
  const search = useSearchParams();
  const carName = search.get("car_name");
  return (
    <main className="py-8">
      <div className="max-w-[550px] space-y-2 p-4 shadow-sm mx-auto">
        <h1 className="text-5xl  font-bold">Payment successful</h1>
        <Suspense>
          <p>
            Thank you for booking <b>{carName}</b> with us, pleae make sure to
            bring your governent issued ID when coming for pickup.
          </p>
        </Suspense>
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
