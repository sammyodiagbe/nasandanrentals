"use client";
import Image from "next/image";
import { Suspense } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateTime } from "@/utils/timeOptions";
import FormErrorMessage from "@/components/formErrorMessage";
import LabelComponent from "@/components/app-components/label";
import useRentHook from "@/custom-hooks/useRentHook";

const times = generateTime(7, 17);

const RentPage = () => {
  const {
    car,
    control,
    handleSubmit,
    book,
    errors,
    days,
    isSubmitting,
    isDateDisabled,
  } = useRentHook();
  return (
    <main className="lg:container py-4">
      <div className="p-4">
        <h1 className="font-medium text-3xl mb-5 ">
          <span className="text-md text-gray-800">Rent</span> {car && car.name}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-[1.9rem]">
        <div className="flex items-center justify-center md:w-[40.625rem] min-h-[25rem] flex-shrink-0 bg-gray-100 rounded-sm">
          <Image
            src={car?.image_url}
            alt="Rent this car today"
            height={500}
            width={500}
          />
        </div>
        <div className="flex-1 p-4 md:p-0">
          <h1 className="mb-5">Rent Details</h1>
          <div className="">
            <form onSubmit={handleSubmit(book)} className="space-y-3">
              <div className="grid md:grid-cols-2 gap-[1.9rem]">
                <Controller
                  control={control}
                  name="pickupDate"
                  render={({ field }) => {
                    return (
                      <div>
                        <LabelComponent
                          htmlFor="pickupDate"
                          value="Pickup date"
                        />
                        <Popover>
                          <PopoverTrigger asChild id="pickupDate">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              <span>
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Select pickup date"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              {...field}
                              onDayClick={field.onChange}
                              disabled={isDateDisabled}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormErrorMessage
                          message={errors.pickupDate?.message}
                        />
                      </div>
                    );
                  }}
                />

                <Controller
                  name="pickupTime"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="w-full">
                        <LabelComponent
                          htmlFor="pickupTime"
                          value="Pickup time"
                        />
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="" id="pickupTime">
                            <SelectValue placeholder="Choose Pickup Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {times.map((time, index) => {
                              return (
                                <SelectItem
                                  {...field}
                                  value={time}
                                  key={index}
                                  className="w-full"
                                >
                                  {time}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormErrorMessage
                          message={errors.pickupTime?.message}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-[1.9rem]">
                <Controller
                  control={control}
                  name="returnDate"
                  render={({ field }) => {
                    return (
                      <div>
                        <LabelComponent
                          htmlFor="returnDate"
                          value="Return date"
                        />
                        <Popover>
                          <PopoverTrigger asChild id="returnDate">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              <span>
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Select return date"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              {...field}
                              onDayClick={field.onChange}
                              disabled={isDateDisabled}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormErrorMessage
                          message={errors.returnDate?.message}
                        />
                      </div>
                    );
                  }}
                />
                <Controller
                  name="returnTime"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div>
                        <LabelComponent
                          htmlFor="returnTime"
                          value="Return time"
                        />
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="" id="returnTime">
                            <SelectValue placeholder="Choose return Time" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            {times.map((time, index) => {
                              return (
                                <div className="">
                                  <SelectItem
                                    {...field}
                                    value={time}
                                    key={index}
                                    className="w-full"
                                  >
                                    {time}
                                  </SelectItem>
                                </div>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormErrorMessage
                          message={errors.returnTime?.message}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-[1.9rem]">
                <Controller
                  control={control}
                  name="emailAddress"
                  render={({ field }) => {
                    return (
                      <div>
                        <LabelComponent htmlFor="email" value="email" />
                        <Input
                          type="email"
                          id="email"
                          placeholder="Your email"
                          onChange={field.onChange}
                        />
                        <FormErrorMessage
                          message={errors.emailAddress?.message}
                        />
                      </div>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="fullname"
                  render={({ field }) => {
                    return (
                      <div>
                        <LabelComponent htmlFor="fullname" value="Fullname" />
                        <Input
                          type="text"
                          id="fullname"
                          placeholder="Your fullname"
                          onChange={field.onChange}
                        />
                        <FormErrorMessage message={errors.fullname?.message} />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-[1.9rem]">
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => {
                    return (
                      <div>
                        <LabelComponent htmlFor="address" value="Address" />
                        <Input
                          type="text"
                          id="address"
                          placeholder="Your address"
                          onChange={field.onChange}
                        />
                        <FormErrorMessage message={errors.address?.message} />
                      </div>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="phonenumber"
                  render={({ field }) => {
                    return (
                      <div>
                        <LabelComponent
                          htmlFor="phonenumber"
                          value="Phone Number"
                        />
                        <div className="flex gap-2 w-full">
                          <Input
                            type="text"
                            readOnly
                            value={"+1"}
                            disabled
                            placeholder="+1"
                            className="max-w-[40px] flex-grow-0 font-bold disabled:bg-gray-300"
                          />
                          <Input
                            type="string"
                            placeholder="Phone number"
                            className="flex-1"
                            id="phonenumber"
                            onChange={field.onChange}
                          />
                        </div>

                        <FormErrorMessage
                          message={errors.phonenumber?.message}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                {days <= 0 || isNaN(days) ? (
                  <span className="">Invalid date</span>
                ) : (
                  <span className="text-sm font-bold">
                    {days} x ${parseInt(car?.price)} = $
                    {days * parseInt(car?.price)}
                  </span>
                )}
                <div className="space-x-4">
                  <Button
                    disabled={isSubmitting}
                    className="bg-green-500 hover:bg-green-500"
                  >
                    Book this car
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default function Page() {
  return (
    <Suspense>
      <RentPage />
    </Suspense>
  );
}
