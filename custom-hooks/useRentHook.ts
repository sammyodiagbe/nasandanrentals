import { bookVehicle } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { getNumberOfDays, isPastDate } from "@/utils/dateFormat";
import { createClient } from "@/utils/supabase/client";
import { generateTime } from "@/utils/timeOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  pickupDate: z.date(),
  pickupTime: z.string(),
  returnDate: z.date(),
  returnTime: z.string(),
  fullname: z.string(),
  emailAddress: z.string(),
  address: z.string(),
  phonenumber: z.string().regex(new RegExp(/^\d{10}$/)),
});

type FormSchema = z.infer<typeof formSchema>;

const useRentHook = () => {
  const searchParams = useSearchParams();
  const supabase = createClient();
  const carId = searchParams.get("car_id");
  const [car, setCar] = useState<any | null>(null);
  const { toast } = useToast();
  const {
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupTime: "7:00",
      returnTime: "7:00",
    },
  });

  const [pickupDate, returnDate, returnTime, pickupTime] = useWatch({
    control,
    name: ["pickupDate", "returnDate", "returnTime", "pickupTime"],
    defaultValue: {
      pickupDate: new Date(Date.now()),
      returnDate: new Date(Date.now()),
      pickupTime: "7:00",
      returnTime: "7:00",
      phonenumber: "",
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
    const { pickupDate, pickupTime, returnDate, returnTime } = formData;
    const numberOfDays: number = getNumberOfDays(
      pickupDate,
      pickupTime,
      returnDate,
      returnTime
    );

    const pastDate =
      isPastDate(pickupDate, pickupTime) || isPastDate(returnDate, returnTime);

    if (pastDate) {
      toast({
        title: "Date is in past",
        description: "One of the date is in the past please",
      });
      return;
    }

    if (numberOfDays < 1) {
      toast({
        title: "Invalid date selected",
        description:
          "You have selected an invalid date range, please make another selection please",
      });

      return;
    }
    await bookVehicle({
      ...formData,
      carId: carId!,
      totalCost: car.price * numberOfDays,
    });
  };

  let days = getNumberOfDays(pickupDate, pickupTime, returnDate, returnTime);
  const bookAction = (formData: FormData) => {
    console.log(formData);
  };

  return { book, car, handleSubmit, control, errors, days, isSubmitting };
};

export default useRentHook;
