"use client";
import CustomButton from "@/components/app-components/button";
import CollectionSkeleton from "@/components/skeletons/collections";
import { Car } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const Collections = () => {
  const supabase = createClient();
  const [allCars, setCars] = useState<Car[]>([]);
  const [errorFetching, setError] = useState(false);
  const [fetchingCars, setFetchingCars] = useState(true);

  useEffect(() => {
    const channel = supabase
      .channel("car_update")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cars",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setCars((cars) => [...cars, payload.new as Car]);
            console.log("new car added");
          } else if (payload.eventType === "UPDATE") {
            setCars(
              (currentItems) =>
                currentItems?.map((item) =>
                  item.id === payload.new.id ? payload.new : item
                ) as Car[]
            );
          } else if (payload.eventType === "DELETE") {
            setCars((currentItems) =>
              currentItems?.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
    fetchCars();
    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  const fetchCars = async () => {
    const { data: cars, error } = await supabase.from("cars").select();
    if (errorFetching) {
      setError(true);
      setFetchingCars(false);
      setCars([]);
      return;
    }
    if (cars) {
      setCars(cars);
      setError(false);
      setFetchingCars(false);
    }
  };

  if (errorFetching) {
    return <p>Error happened</p>;
  }
  return (
    <main className=" lg:container ">
      <div className="p-4">
        <h1 className="my-5 text-xl  text-gray-700">Our collections.</h1>
      </div>

      {fetchingCars ? (
        <CollectionSkeleton />
      ) : (
        <section className="p-4 grid md:grid-cols-3 gap-[30px]">
          {allCars?.map((car, index) => {
            return (
              <div className=" flex   flex-col justify-between" key={index}>
                <Image
                  src={car.image_url!}
                  alt={car.name}
                  width={500}
                  height={500}
                  className="w-auto h-auto mb-5"
                />
                <div className="">
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <h2 className="mb-1 font-medium">{car.name}</h2>
                      <span className="text-sm">
                        CA $ {car.price} <span className="ml-1">per day</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src={"/icons/Gauge.svg"}
                        height={24}
                        width={24}
                        className="h-4 w-4"
                        alt="allowd km per day"
                      />
                      <span className="text-sm">
                        {car.allowed_kms} KM per day
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center justify-self-end ">
                    <div className="flex gap-2">
                      <FeatureComponent
                        img_path="/icons/Seat.svg"
                        value={car.doors.toString()}
                      />
                      <FeatureComponent
                        img_path="/icons/Users.svg"
                        value={car.seats.toString()}
                      />
                      <FeatureComponent
                        img_path="/icons/Engine.svg"
                        value={"Automatic"}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link href={`/rent?car_id=${car.id}`}>
                        <CustomButton
                          title="Book now"
                          style="bg-green-500 hover:bg-green-600"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
};

type TFeature = {
  img_path: string;
  value: string;
};

const FeatureComponent: FC<TFeature> = ({ img_path, value }) => {
  return (
    <span className="flex gap-1 items-center">
      <Image
        src={img_path}
        alt={value}
        height={24}
        width={24}
        className="w-5 h-5"
      />
      <span className="text-xs">{value}</span>
    </span>
  );
};

export default Collections;
