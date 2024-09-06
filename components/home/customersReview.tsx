import { FC } from "react";
import CustomButton from "../app-components/button";
import { cn } from "@/lib/utils";

type TUserTestimonial = {
  review: string;
  customer: string;
  profile_img_url?: string;
};
const reviews = [
  {
    review:
      "Amazing service! The car was in perfect condition, and the booking process was so easy.",
    customer: "Nolan Dejarno",
  },
  {
    review:
      "Great selection of cars and very affordable pricess. Highly recommend",
    customer: "Alejandro Simons",
  },
  {
    review:
      "The support team was super helpful and made sure everything went smoothly.",
    customer: "Mike T",
  },
  {
    review:
      "Renting a car with Nasandan was a breeze! The booking process was simple, and the customer service team was incredibly helpful. The car was in excellent condition, and I appreciated the transparent pricing with no hidden fees.",
    customer: "Emily B",
  },
];

const Testimonials = () => {
  return (
    <div className="p-4 flex gap-[30px] items-center">
      <div className="space-y-5 w-[35rem]">
        <h1 className="text-6xl font-bold">What our customers have to say.</h1>
        <p>We are trusted by our customers. Here's what they have to say.</p>
        <CustomButton
          title="Book a car now"
          style="bg-blue-500 hover:bg-blue-600"
        />
      </div>
      <div
        className={cn(
          "h-full flex flex-1 gap-8 overflow-x-auto flex-nowrap",
          "no-scrollbar"
        )}
      >
        {reviews.map((review, index) => {
          const { customer, review: text } = review;
          return (
            <UserTestimonial customer={customer} review={text} key={index} />
          );
        })}
      </div>
    </div>
  );
};

const UserTestimonial: FC<TUserTestimonial> = ({
  review,
  customer,
  profile_img_url,
}) => {
  return (
    <div className="flex-shrink-0 w-[29rem] min-h-[20rem]  inline-flex bg-gray-100  flex-col justify-between p-4 rounded-sm">
      <h1 className="text-2xl text-gray-900">{review}</h1>
      <div className="flex space-x-2 items-center">
        <span className="h-10 w-10 flex bg-gray-200 items-center justify-center text-lg font-bold rounded-full">
          {customer[0]}
        </span>
        <p>{customer}</p>
      </div>
    </div>
  );
};

export default Testimonials;
