"use client";
import CustomButton from "@/components/app-components/button";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Collections = () => {
  const supabase = createClient();
  const [allCars, setCars] = useState<any[] | null>([]);
  const [errorFetching, setError] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const { data: cars, error } = await supabase.from("cars").select();
    if (errorFetching) {
      setError(true);
      setCars(null);
      return;
    }
    if (cars) {
      setCars(cars);
      setError(false);
    }
  };

  if (errorFetching) {
    return <p>Error happened</p>;
  }
  return (
    <main className=" lg:container ">
      <h1 className="my-5 text-2xl font-bold text-gray-700">
        Our collections.
      </h1>
      <section className="grid grid-cols-3 gap-[50px]">
        {allCars?.map((car, index) => {
          return (
            <div className="flex  flex-col justify-between" key={index}>
              <Image
                src={car.image_url}
                alt={car.name}
                width={500}
                height={500}
                className="w-auto h-auto"
              />
              <div className="">
                <div className="flex justify-between items-center">
                  <h2 className="my-3 font-medium">{car.name}</h2>
                  <span className="">
                    CA $ {car.price}{" "}
                    <span className="ml-1 text-xs">per day</span>
                  </span>
                </div>

                <div className="flex justify-end">
                  <CustomButton
                    title="Book now"
                    style="bg-green-500 hover:bg-green-600"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Collections;
