
export default function Notification({ message }: { message: string }) {
  return (
    <div className="bg-green-100 text-green-700 px-4 py-2 rounded my-2">
      {message}
    </div>
  );
}