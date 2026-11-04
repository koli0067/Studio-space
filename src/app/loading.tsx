import { Spinner } from "@/components/ui/spinner"

const RootLoading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F1E8]">
        <Spinner className="size-8" />
      
    </div>
  );
};

export default RootLoading;
