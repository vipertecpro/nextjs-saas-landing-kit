import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="py-32">
      <div className="container-page flex flex-col items-center gap-4 text-center">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="max-w-md text-muted-foreground">The page you’re looking for doesn’t exist or has moved.</p>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-2 h-10 px-5")}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
