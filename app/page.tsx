import CustomButton from "@/components/app-components/button";
import Navbar from "@/components/app-components/navabar";
import Hero from "@/components/hero";
import Testimonials from "@/components/home/customersReview";
import WhyChooseUsComponent from "@/components/home/whychooseus";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";

export default async function Index() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <Navbar />
        <div className="grid grid-cols-2 px-4 py-4 ">
          <section className=" space-y-8">
            <h1 className="text-8xl font-bold leading-[4.5rem]">
              Rent the perfect car for every journey
            </h1>
            <p>
              From luxury to economy, find the ideal car for your trip, whether
              it's a weekend getaway or a business meeting.
            </p>
            <div className="flex gap-2">
              <CustomButton
                title="Book a car now"
                style="bg-blue-500 hover:bg-blue-600"
              />
              <Link href={"/sign-up"}>
                <CustomButton
                  title="Signin"
                  style="bg-gray-200 hover:bg-gray-300 text-gray-800 px-10"
                />
              </Link>
            </div>
          </section>
          <section></section>
        </div>
        {/* why choose us */}
        <section className="p-4  text-center space-y-8">
          <h1 className="text-6xl font-bold">Why choose us?</h1>
          <p className="text-center mx-auto max-w-[700px] ">
            At Nasandan, we make car rentals simple, affordable, and
            hassle-free. With a wide range of vehicles to choose from, flexible
            rental periods, and unbeatable customer service, we ensure you get
            the best driving experience possible.
          </p>
          <WhyChooseUsComponent />
        </section>
        <Testimonials />
      </main>
    </>
  );
}
