import { Skeleton } from "../ui/skeleton";

const CollectionSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-[30px] py-10">
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
    </div>
  );
};

const Content = () => {
  return (
    <div className="space-y-20">
      <Skeleton className="h-40" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="p-4 px-8" />
      </div>
    </div>
  );
};

export default CollectionSkeleton;
