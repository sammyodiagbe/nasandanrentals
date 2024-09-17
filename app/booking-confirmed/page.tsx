"use client";
import { Button } from "@/components/ui/button";
import { MouseEventHandler, useEffect, useState } from "react";
import { makeStripePayment } from "../actions";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";

const BookingConfirmed = () => {
  const supabase = createClient();
  const [booking, setBooking] = useState<any>(null);
  const search = useSearchParams();
  const [error, setError] = useState(false);

  const bookingId = search.get("booking_id");

  useEffect(() => {
    if (bookingId) {
      fetchBooking();
    }
  }, []);

  const fetchBooking = async () => {
    const { data: booking, error } = await supabase
      .from("bookings")
      .select(
        "created_at,status, pickup_date,total_cost, pickup_time, return_date, return_time, id, cars (name, price)"
      )
      .eq("id", bookingId);

    if (error) {
      setError(true);
      setBooking(null);
      return;
    }

    setBooking(booking[0]);
  };

  const makePurchase: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    console.log("Attempting to make stripe payment");
    const redirecturl: string | null = await makeStripePayment({
      name: booking.cars?.name,
      price: booking.cars.price,
    });

    if (redirecturl) {
      window.location.href = redirecturl;
    }
  };
  return (
    <main className=" lg:container space-y-5 ">
      <div className="w-[550px] space-y-4 py-4 mx-auto">
        <h1 className="text-5xl font-bold">Thank you</h1>
        <p>
          Your booking has been reserved, please confirm booking or click on pay
          now to complete your booking.Bookings that are past due pickup time
          are automatically voided. Please note that information on driver's
          license must match information provided
        </p>
        <div className="">
          <div className="flex justify-end gap-2">
            <Button
              onClick={makePurchase}
              className="bg-green-500 hover:bg-green-600"
            >
              Pay now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingConfirmed;
