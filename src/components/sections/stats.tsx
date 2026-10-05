import { stats } from "@/content/landing";

export function Stats() {
  return (
    <section aria-label="Launchpad in numbers" className="py-16">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-6 rounded-2xl border bg-card p-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 text-center">
              <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
