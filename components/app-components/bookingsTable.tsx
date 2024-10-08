import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Booking } from "@/lib/types";
import { combineDateAndTime } from "@/utils/dateFormat";
import { FC } from "react";
import { format } from "date-fns";
import { convertTime } from "@/lib/utils";
import { cn } from "@/utils/cn";
type TTable = {
  bookings: Booking[];
};
const TableComponent: FC<TTable> = ({ bookings }) => {
  return (
    <Table className="relative">
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Car name</TableHead>
          <TableHead>Price ($)</TableHead>
          <TableHead>Pickup date</TableHead>
          <TableHead>Pickup Time</TableHead>
          <TableHead>Return date</TableHead>
          <TableHead>Return time</TableHead>
          <TableHead>Total Cost ($)</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings?.map((booking, index) => {
          const {
            car,
            pickup_date,
            pickup_time,
            total_cost,
            return_date,
            return_time,
            status,
          } = booking;
          return (
            <TableRow key={index}>
              <TableCell>{car ? car.name : "Car deleted"}</TableCell>
              <TableCell>{car ? car.price : "Car deleted"}</TableCell>
              <TableCell>{format(pickup_date, "PPP")}</TableCell>
              <TableCell>{convertTime(pickup_date, pickup_time)}</TableCell>
              <TableCell>{format(return_date, "PPP")}</TableCell>
              <TableCell>{convertTime(return_date, return_time)}</TableCell>
              <TableCell>{total_cost}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "p-1 px-4 bg-gray-300 text-black rounded-full",
                    status === "confirmed"
                      ? "bg-green-500 text-white"
                      : "bg-orange-200"
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
  );
};

export default TableComponent;
