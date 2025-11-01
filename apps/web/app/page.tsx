import { DEFAULT_API_URL } from "@/lib/constants";
import { Quiz } from "@/modules/quiz";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Quiz apiUrl={DEFAULT_API_URL} />
    </div>
  );
}
