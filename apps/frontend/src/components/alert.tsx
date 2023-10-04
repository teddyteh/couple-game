import { Alert as AlertType } from "@/types/alert";

type Payload = { data: AlertType | null };

export const Alert = ({ data }: Payload) => {
  if (!data) return;

  const { title, message } = data;

  return (
    <div
      className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none rounded-xl flex w-5/6 m-auto"
      role="alert"
    >
      <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        {title}
      </span>
      <span className="font-semibold mr-2 text-left flex-auto">{message}</span>
    </div>
  );
};
