import { Button } from "@/components/ui/button";

const BookingConfirmed = () => {
  return (
    <main className=" lg:container space-y-5">
      <h1 className="text-5xl font-bold">Thank you</h1>
      <p>
        Your booking has been reserved, please confirm booking or click on pay
        now to complete your booking. Please note that information on driver's
        license must match information provided
      </p>
      <div className="">
        <div className="flex justify-end gap-2">
          <Button variant={"outline"}>Confirm Booking</Button>
          <Button className="bg-green-500 hover:bg-green-600">Pay now</Button>
        </div>
      </div>
    </main>
  );
};

export default BookingConfirmed;
