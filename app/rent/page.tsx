"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import {
  MouseEventHandler,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import {
  SubmitHandler,
  useForm,
  Controller as FormController,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { bookVehicle, testStripe } from "../actions";
import FormErrorMessage from "@/components/formErrorMessage";

const formSchema = z.object({
  pickupDate: z.date(),
  pickupTime: z.string(),
  returnDate: z.date(),
  returnTime: z.string(),
  fullname: z.string(),
  emailAddress: z.string(),
  address: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const times = generateTime(7, 17);

const RentPage = () => {
  const searchParams = useSearchParams();
  const supabase = createClient();
  const carId = searchParams.get("car_id");
  const [car, setCar] = useState<any | null>(null);
  const {
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    getCarData();
  }, [carId]);

  const getCarData = async () => {
    const { data: car, error } = await supabase
      .from("cars")
      .select()
      .eq("id", carId);
    if (error) {
      return;
    }
    if (car) {
      setCar(car[0]);
      // setError(false);
    }
  };

  const book: SubmitHandler<FormSchema> = async (formData) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("booking vehicle");
    await bookVehicle({ ...formData, carId: parseInt(carId!), totalCost: 200 });
  };

  const bookAction = (formData: FormData) => {
    console.log(formData);
  };
  return (
    <main className="lg:container py-4">
      <h1 className="font-medium text-3xl mb-5 ">
        <span className="text-md text-gray-800">Rent</span> {car && car.name}
      </h1>
      <div className="flex gap-[1.9rem]">
        <div className="flex items-center justify-center w-[40.625rem] min-h-[25rem] flex-shrink-0 bg-gray-100 rounded-sm">
          <Image
            src={car?.image_url}
            alt="Rent this car today"
            height={500}
            width={500}
          />
        </div>
        <div className="flex-1">
          <h1>Rent Details</h1>
          <div className="">
            <form onSubmit={handleSubmit(book)} className="space-y-3">
              <div className="grid grid-cols-2 gap-[1.9rem]">
                <Controller
                  control={control}
                  name="pickupDate"
                  render={({ field }) => {
                    return (
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
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
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Choose Pickup Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {times.map((time, index) => {
                              return (
                                <SelectItem
                                  {...field}
                                  value={time}
                                  key={Math.random()}
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
              <div className="grid grid-cols-2 gap-[1.9rem">
                <Controller
                  control={control}
                  name="returnDate"
                  render={({ field }) => {
                    return (
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
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
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Choose return Time" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            {times.map((time, index) => {
                              return (
                                <div className="">
                                  <SelectItem
                                    {...field}
                                    value={time}
                                    key={Math.random()}
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
              <div className="grid grid-cols-2 gap-[1.9rem]">
                <Controller
                  control={control}
                  name="emailAddress"
                  render={({ field }) => {
                    return (
                      <div>
                        <Input
                          type="email"
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
                        <Input
                          type="text"
                          placeholder="Your fullname"
                          onChange={field.onChange}
                        />
                        <FormErrorMessage message={errors.fullname?.message} />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => {
                    return (
                      <div>
                        <Input
                          type="text"
                          placeholder="Your address"
                          onChange={field.onChange}
                        />
                        <FormErrorMessage message={errors.address?.message} />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <h2>Total CA $ 100</h2>
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
