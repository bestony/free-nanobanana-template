import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Nanobanana?",
    answer:
      "Nanobanana is an AI creative platform that turns your prompts into high-quality images and stylized visuals in seconds.",
  },
  {
    question: "How do I write a good prompt?",
    answer:
      "Start with the subject, then add style, lighting, and camera details. Example: 'A neon-lit market street at dusk, cinematic lighting, 35mm film grain.'",
  },
  {
    question: "Can I control the style and color palette?",
    answer:
      "Yes. Use style keywords like 'minimalist', 'cyberpunk', or 'watercolor', and specify colors such as 'warm pastel palette' or 'deep teal shadows.'",
  },
  {
    question: "What image sizes are supported?",
    answer:
      "Common aspect ratios like 1:1, 4:3, 3:4, and 16:9 are supported, so you can generate images for social, web, or print use.",
  },
  {
    question: "Can I remix or iterate on previous results?",
    answer:
      "Absolutely. You can reuse a prompt, adjust key phrases, or combine prompts to evolve a concept across multiple generations.",
  },
  {
    question: "Is the generated content safe to use commercially?",
    answer:
      "You own the outputs you create. For commercial use, always verify that your prompts do not reference copyrighted characters or logos.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-gray-50/50 px-6 py-24">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nano-text md:text-4xl">FAQ</h1>
          <p className="mt-4 text-nano-gray">
            Answers to the most common questions about creating with Nanobanana.
          </p>
        </div>
        <Accordion
          className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          collapsible
          type="single"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-base font-semibold text-nano-text">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-nano-gray">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
