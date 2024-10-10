"use client";
import { getUserBookings } from "@/app/actions";
import { Booking, Car } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, FC, useContext, useEffect, useState } from "react";

type TDataContextProvider = {
  children: React.ReactNode;
};

type TIsBooked = {
  start: Date;
  end: Date;
};

type TDataContext = {
  bookings: Booking[];
  cars: Car[];
  user: User | null;
  bookedDates: TIsBooked[];
};

const dataContext = createContext<TDataContext>({
  cars: [],
  bookings: [],
  user: null,
  bookedDates: [],
});

const DataContextProvider: FC<TDataContextProvider> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const [bookedDates, setBookedDates] = useState<TIsBooked[]>([]);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    const bookings = await getUserBookings();

    if (bookings?.length) {
    }

    setBookings(bookings ?? []);
  };

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
  };
  return (
    <dataContext.Provider value={{ bookings, cars, user, bookedDates }}>
      {children}
    </dataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(dataContext);
};

export default DataContextProvider;
