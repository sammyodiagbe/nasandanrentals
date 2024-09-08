"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const formSchema = z.object({
  pickupDate: z.date(),
  pickupTime: z.string(),
  returnDate: z.string(),
  returnTime: z.string(),
  fullname: z.string(),
  emailAddress: z.string(),
  address: z.string(),
});

const RentPage = () => {
  const searchParams = useSearchParams();
  const supabase = createClient();
  const carId = searchParams.get("car_id");
  const [errorFetching, setError] = useState(false);
  const [car, setCar] = useState<any | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupDate: undefined,
      pickupTime: "",
      returnDate: "",
      returnTime: "",
      fullname: "",
      emailAddress: "",
    },
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
      console.log(error);
      setError(true);
      return;
    }
    if (car) {
      setCar(car[0]);
      setError(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-[1.9rem] w-ful">
                  <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Date</FormLabel>
                        <FormControl className="w-full">
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
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Time</FormLabel>
                        <FormControl>
                          <Input placeholder="Pickup time" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-[1.9rem] w-full">
                  <FormField
                    control={form.control}
                    name="returnDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return Date</FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Pickup Date"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return Time</FormLabel>
                        <FormControl>
                          <Input placeholder="Pickup time" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-[1.9rem] w-full ">
                  <FormField
                    control={form.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Email Address"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fullname</FormLabel>
                        <FormControl>
                          <Input placeholder="Pickup time" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <h1>Total CA $100 </h1>
                  <div className="space-x-1">
                    <Button className="bg-gray-100 hover:bg-gray-100 text-gray-800">
                      Reserve
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default RentPage;
