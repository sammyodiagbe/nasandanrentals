export type TbookingRequired = {
  car_id: number;
  total_cost: number;
};

export type TBooking = {
  pickupDate: Date;
  pickupTime: string;
  returnDate: Date;
  returnTime: string;
  emailAddress: string;
  fullname: string;
  address: string;
  totalCost: number;
  carId: string;
  phonenumber: string;
};

export type TIsBooked = {
  start: Date;
  end: Date;
};
