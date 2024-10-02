"use client";
import { Button } from "@/components/ui/button";
import { MouseEventHandler, useEffect, useState } from "react";
import { makeStripePayment } from "../actions";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { CheckIcon } from "lucide-react";

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
      price: booking.total_cost,
    });

    if (redirecturl) {
      window.location.href = redirecturl;
    }
  };
  return (
    <main className=" lg:container space-y-4 pt-5 ">
      <div className="flex justify-center">
        <div className="  h-24 w-24 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-white">
            <CheckIcon size={40} />
          </span>
        </div>
      </div>
      <div className="md:w-[550px] space-y-4 p-4 mx-auto text-center md:text-left">
        <h1 className="text-5xl font-bold text-center">Thank you</h1>
        <p className="text-center">
          Your booking has been reserved, you can choose to pay now or pay on
          arrival. Please note that information on driver's license must match
          information provided
        </p>
        <div className="">
          <div className="py-2 text-center">
            <Button
              onClick={makePurchase}
              className="bg-green-500 hover:bg-green-600"
            >
              Pay {booking.total_cost} now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingConfirmed;
