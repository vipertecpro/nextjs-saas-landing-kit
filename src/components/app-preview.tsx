/**
 * A drawing of the product, made with HTML and CSS, for the hero. Replace it
 * with a real screenshot (next/image) once you have one.
 */
export function AppPreview() {
  const columns = [
    { title: "Now", cards: ["Release notes AI", "SSO for Growth", "Faster search"] },
    { title: "Next", cards: ["Slack digests", "Custom fields"] },
    { title: "Later", cards: ["Mobile app", "Public API v2", "Zapier"] },
  ];

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-5xl">
      <div className="absolute -inset-x-10 -top-10 -bottom-4 -z-10 rounded-[3rem] bg-primary/15 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-amber-400/80" />
          <span className="size-3 rounded-full bg-green-400/80" />
          <span className="ms-4 h-5 w-48 rounded-md bg-muted" />
        </div>
        <div className="grid grid-cols-[10rem_1fr] max-sm:grid-cols-1">
          <div className="flex flex-col gap-2 border-e p-4 max-sm:hidden">
            {["Roadmap", "Feedback", "Releases", "Insights", "Settings"].map((item, index) => (
              <span key={item} className={`rounded-md px-2 py-1.5 text-xs ${index === 0 ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground"}`}>
                {item}
              </span>
            ))}
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-2 rounded-xl bg-muted/50 p-3">
                <p className="text-xs font-semibold text-muted-foreground">{column.title}</p>
                {column.cards.map((card, index) => (
                  <div key={card} className="rounded-lg border bg-background p-3 shadow-xs">
                    <p className="text-xs font-medium">{card}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="h-1.5 w-16 rounded-full bg-primary/30" />
                      <span className="text-[10px] text-muted-foreground">{12 + index * 7} votes</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
