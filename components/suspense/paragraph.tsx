import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ParagraphSuspense = () => {
  const searchParams = useSearchParams();
  const carName = searchParams.get("car_name");
  return (
    <Suspense>
      <p>
        Thank you for booking <b>{carName}</b> with us, pleae make sure to bring
        your governent issued ID when coming for pickup.
      </p>
    </Suspense>
  );
};

export default ParagraphSuspense;
