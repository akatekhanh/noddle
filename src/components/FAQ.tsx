import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  no: string;
  question: string;
  answer: string;
}

const items: FAQItem[] = [
  {
    no: "01",
    question: "Are these products in production?",
    answer:
      "HeroPrompt is live at heroprompt.store with paying users. Noddle Data Platform is deployed on bare-metal Kubernetes and serving an internal customer. Dinh Discovery has a public legacy demo and a SaaS rewrite in active deployment.",
  },
  {
    no: "02",
    question: "How small is the crew?",
    answer:
      "Three — one operator leading (Khanh), plus two contributors. Backend, frontend, data engineering, infra, payments, deploys are all owned in-house. Each product runs as a complete service, not a slice of someone else's codebase.",
  },
  {
    no: "03",
    question: "Can I see the source code?",
    answer:
      "Selected modules can be shared during a walkthrough — the platform is closed-source, but I'm happy to screen-share through the architecture, key migrations, executor logic, and a production deploy.",
  },
  {
    no: "04",
    question: "What can I hire you for?",
    answer:
      "Greenfield data platforms, AI product MVPs that need to ship, taking a prototype to production (auth + payments + deploy + monitoring). Equally comfortable as IC, tech lead, or founding engineer.",
  },
  {
    no: "05",
    question: "How long did each product take?",
    answer:
      "Each one was built incrementally over months alongside other work — the goal is depth and reliability, not throwaway demos. Ask in the walkthrough for a detailed timeline.",
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<string | null>(items[0].no);

  return (
    <section id="faq" className="border-t border-border">
      <div className="container py-24 sm:py-32 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-3 flex flex-col gap-2">
          <div className="eyebrow">
            <span className="text-primary">07</span> &mdash; FAQ
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            Asked, answered.
          </p>
        </div>

        <div className="lg:col-span-9">
          <ul className="border-t border-border">
            {items.map(({ no, question, answer }) => {
              const isOpen = open === no;
              return (
                <li key={no} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : no)}
                    className="w-full py-6 flex items-start gap-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-mono text-xs text-muted-foreground pt-1.5 w-6 group-hover:text-primary transition-colors">
                      {no}
                    </span>
                    <span className="flex-1 font-display text-xl sm:text-2xl tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {question}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 mt-1.5 text-muted-foreground group-hover:text-primary transition-colors"
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-[3rem_1fr] gap-6 pb-6 -mt-2">
                        <span></span>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
