const BasicFormSkeleton = () => {
  return (
    <section className="padding-md flex border justify-center items-center viewport-full">
      <div className="border border-surface bg-surface padding-sm rounded-sm w-full max-w-screen-lg">
        <div className="space-y-1 border-b pb-4">
          <div className="h-6 w-32 bg-input/60 rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-input/60 rounded animate-pulse" />
        </div>
        <form className="my-4">
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <div className="h-4 w-24 bg-input/60 rounded animate-pulse mb-1" />
            <div className="h-10 w-full bg-input/60 rounded animate-pulse" />
          </div>
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <div className="h-4 w-24 bg-input/60 rounded animate-pulse mb-1" />
            <div className="h-10 w-full bg-input/60 rounded animate-pulse" />
          </div>
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <div className="h-4 w-24 bg-input/60 rounded animate-pulse mb-1" />
            <div className="h-10 w-full bg-input/60 rounded animate-pulse" />
          </div>
          <div className="flex flex-col md:flex-row gap-2 mb-8">
            <div className="h-4 w-24 bg-input/60 rounded animate-pulse mb-1" />
            <div className="h-24 w-full bg-input/60 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-input/60 rounded animate-pulse" />
        </form>
      </div>
    </section>
  );
};

export default BasicFormSkeleton;
