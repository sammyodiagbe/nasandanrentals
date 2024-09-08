import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BookingsPage = () => {
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
        <Table>
          <TableCaption>A list of your recent bookings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Car name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Pickup date</TableHead>
              <TableHead className="text-right">Return date</TableHead>
              <TableHead className="text-right">Return time</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-[250px]">2019 Chevy Malibu</TableCell>
              <TableCell>$78</TableCell>
              <TableCell>July 17, 2024</TableCell>
              <TableCell className="text-right">July 31, 2024</TableCell>
              <TableCell className="text-right">3:45pm</TableCell>
              <TableCell className="text-right">Completed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[250px]">2019 Chevy Malibu</TableCell>
              <TableCell>$78</TableCell>
              <TableCell>July 17, 2024</TableCell>
              <TableCell className="text-right">July 31, 2024</TableCell>
              <TableCell className="text-right">3:45pm</TableCell>
              <TableCell className="text-right">Completed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[250px]">2019 Chevy Malibu</TableCell>
              <TableCell>$78</TableCell>
              <TableCell>July 17, 2024</TableCell>
              <TableCell className="text-right">July 31, 2024</TableCell>
              <TableCell className="text-right">3:45pm</TableCell>
              <TableCell className="text-right">Completed</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default BookingsPage;
