import React from "react";

type Cell =
  | { type: "text"; value: string; muted?: boolean }
  | { type: "check" }
  | { type: "dash" };

type Row = {
  label: string;
  hint?: string;
  highlight?: boolean;
  values: {
    free: Cell;
    starter: Cell;
    enterprise: Cell;
  };
};

type Section = {
  title: string;
  rows: Row[];
};

const CheckDot = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-200 ring-1 ring-neutral-300">
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path
        d="M7.5 12.4l2.4 2.4 6-6.3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white-900"
      />
    </svg>
  </span>
);

const InfoIcon = () => (
  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[10px] font-semibold text-neutral-600">
    i
  </span>
);

function CellView({ cell }: { cell: Cell }) {
  if (cell.type === "check") return <CheckDot />;
  if (cell.type === "dash")
    return <span className="text-neutral-400">—</span>;
  return (
    <span className={cell.muted ? "text-neutral-500" : "text-neutral-900"}>
      {cell.value}
    </span>
  );
}

export default function CompareFeaturesVoidVel() {
  const sections: Section[] = [
    {
      title: "USAGE",
      rows: [
        {
          label: "Project seats",
          hint: "How many stakeholders can collaborate.",
          values: {
            free: { type: "text", value: "2" },
            starter: { type: "text", value: "5" },
            enterprise: { type: "text", value: "Unlimited" },
          },
        },
        {
          label: "Active projects",
          hint: "How many builds we run in parallel.",
          highlight: true,
          values: {
            free: { type: "text", value: "1 / month" },
            starter: { type: "text", value: "2 / month" },
            enterprise: { type: "text", value: "Custom" },
          },
        },
      ],
    },
    {
      title: "DELIVERY",
      rows: [
        {
          label: "Dedicated project manager",
          values: { free: { type: "dash" }, starter: { type: "check" }, enterprise: { type: "check" } },
        },
        {
          label: "Weekly progress updates",
          highlight: true,
          values: { free: { type: "dash" }, starter: { type: "check" }, enterprise: { type: "check" } },
        },
        {
          label: "Revision rounds",
          values: {
            free: { type: "text", value: "1" },
            starter: { type: "text", value: "2" },
            enterprise: { type: "text", value: "Custom" },
          },
        },
        {
          label: "Priority delivery lane",
          highlight: true,
          values: { free: { type: "dash" }, starter: { type: "dash" }, enterprise: { type: "check" } },
        },
      ],
    },
    {
      title: "DESIGN & UX",
      rows: [
        {
          label: "UX structure & wireframes",
          values: { free: { type: "dash" }, starter: { type: "check" }, enterprise: { type: "check" } },
        },
        {
          label: "UI design (Figma)",
          highlight: true,
          values: {
            free: { type: "text", value: "Basic", muted: true },
            starter: { type: "text", value: "Standard" },
            enterprise: { type: "text", value: "Advanced" },
          },
        },
        {
          label: "Design system components",
          values: { free: { type: "dash" }, starter: { type: "text", value: "Core" }, enterprise: { type: "text", value: "Full" } },
        },
      ],
    },
    {
      title: "ENGINEERING",
      rows: [
        {
          label: "Performance optimization",
          values: {
            free: { type: "text", value: "Basic", muted: true },
            starter: { type: "text", value: "Core Web Vitals" },
            enterprise: { type: "text", value: "Advanced + audits" },
          },
        },
        {
          label: "SEO foundation",
          highlight: true,
          values: {
            free: { type: "text", value: "Meta + sitemap" },
            starter: { type: "text", value: "Technical SEO" },
            enterprise: { type: "text", value: "Technical + strategy" },
          },
        },
        {
          label: "Integrations (payments/CRM/analytics)",
          values: { free: { type: "dash" }, starter: { type: "text", value: "1–2" }, enterprise: { type: "text", value: "Custom" } },
        },
        {
          label: "CI/CD & deployment pipeline",
          highlight: true,
          values: { free: { type: "dash" }, starter: { type: "check" }, enterprise: { type: "check" } },
        },
      ],
    },
    {
      title: "SUPPORT",
      rows: [
        {
          label: "Post-launch support",
          values: {
            free: { type: "text", value: "7 days", muted: true },
            starter: { type: "text", value: "30 days" },
            enterprise: { type: "text", value: "90+ days" },
          },
        },
        {
          label: "Maintenance options",
          highlight: true,
          values: { free: { type: "dash" }, starter: { type: "check" }, enterprise: { type: "check" } },
        },
        {
          label: "Dedicated support channel",
          values: { free: { type: "dash" }, starter: { type: "dash" }, enterprise: { type: "check" } },
        },
      ],
    },
  ];

  return (
    <section className="w-full ">
      <div className="mx-auto max-w-[90rem] px-6 pb-24 pt-10">
        <h2 className="text-center font-sans text-[34px] sm:text-[44px] md:text-[52px] font-normal tracking-tight text-neutral-900">
          Compare platform features
        </h2>

        <div className="mt-10 overflow-hidden rounded-2xl bg-transparent">
          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center px-6 py-4 text-sm text-neutral-700">
            <div className="font-medium">Platform</div>
            <div className="text-center font-medium">Free</div>
            <div className="text-center font-medium">Starter</div>
            <div className="text-center font-medium">Enterprise</div>
          </div>

          <div className="h-px bg-neutral-200" />

          {/* Sections */}
          <div className="space-y-10 px-6 py-6">
            {sections.map((sec) => (
              <div key={sec.title}>
                <div className="text-[11px] font-semibold tracking-wide text-neutral-600">
                  {sec.title}
                </div>

                <div className="mt-3 divide-y divide-neutral-200">
                  {sec.rows.map((row) => (
                    <div
                      key={row.label}
                      className={[
                        "grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-4 py-4 px-3",
                        row.highlight ? "bg-neutral-100/70" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2 text-[13px] font-medium text-neutral-900">
                        <span>{row.label}</span>
                        {row.hint ? (
                          <span
                            className="inline-flex"
                            title={row.hint}
                            aria-label={row.hint}
                          >
                            <InfoIcon />
                          </span>
                        ) : null}
                      </div>

                      <div className="text-center text-[13px]">
                        <CellView cell={row.values.free} />
                      </div>

                      <div className="text-center text-[13px]">
                        <CellView cell={row.values.starter} />
                      </div>

                      <div className="text-center text-[13px]">
                        <CellView cell={row.values.enterprise} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* tiny note */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-neutral-500">
          Need something in-between? VoidVel can tailor scope, timeline, and
          deliverables to match your product stage and goals.
        </p>
      </div>
    </section>
  );
}
