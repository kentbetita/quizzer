import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { QuizErrorProps } from "@/types";

export function QuizError({ error, onRetry }: QuizErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        {onRetry && (
          <div className="mt-4 flex justify-center">
            <Button onClick={onRetry}>Retry</Button>
          </div>
        )}
      </div>
    </div>
  );
}
