"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MouseEventHandler, Suspense, useEffect, useState } from "react";
import ParagraphSuspense from "@/components/suspense/paragraph";
import { testStripe } from "../actions";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const PaymentSuccessful = () => {
  const supabase = createClient();
  const [car, setCar] = useState<any>(null);
  const search = useSearchParams();
  const [error, setError] = useState(false);

  const carId = search.get("user_id");

  useEffect(() => {
    if (carId) {
      fetchCar();
    }
  }, []);

  const fetchCar = async () => {
    const { data: cars, error } = await supabase
      .from("cars")
      .select()
      .eq("id", carId);
    if (error) {
      setError(true);
      setCar(null);
      return;
    }

    setCar(cars[0]);
  };

  const makePurchase: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    const redirecturl: string | null = await testStripe({
      name: car?.name,
      price: car.price,
    });

    if (redirecturl) {
      window.location.href = redirecturl;
    }
  };
  return (
    <main className="py-8">
      <Suspense>
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
      </Suspense>
    </main>
  );
};

export default PaymentSuccessful;
