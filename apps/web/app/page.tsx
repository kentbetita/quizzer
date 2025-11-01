import { DEFAULT_API_URL } from "@/lib/constants";
import { Quiz } from "@/modules/quiz";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

  return (
    <div className="min-h-screen bg-background">
      <Quiz apiUrl={apiUrl} />
    </div>
  );
}
