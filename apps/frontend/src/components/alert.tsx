import { Alert as AlertType } from "@/hooks/context";

type Payload = { data: AlertType | null };

export const Alert = ({ data }: Payload) => {
  if (!data) return;

  const { title, message } = data;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-3 rounded z-50"
      role="alert"
    >
      <strong className="font-bold">{title}</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
