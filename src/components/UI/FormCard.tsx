interface FormCardTypes {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
}

const FormCard = ({ children, title, subTitle }: FormCardTypes) => {
  return (
    <section className="padding-md flex border justify-center items-center viewport-full">
      <div className="border border-surface w-full bg-surface max-w-screen-lg mx-auto padding-sm rounded-sm">
        {title || subTitle ? (
          <div className="space-y-1 border-b pb-4">
            <h4 className="font-medium text-lg">{title}</h4>
            <p className="text-sm text-light-gray">{subTitle}</p>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
};

export default FormCard;
