import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is Anantha Living?",
    answer:
      "Anantha Living is a holistic ecosystem dedicated to conscious, authentic living. We offer wellness programs, lifestyle coaching, transformational experiences, and community support to guide individuals toward meaningful change and sustainable growth.",
  },
  {
    id: 2,
    question: "Who can participate in Anantha Living programs?",
    answer:
      "Our programs are designed for anyone seeking meaningful personal transformation and conscious living, whether you are just starting out or looking to deepen your practice.",
  },
  {
    id: 3,
    question: "How do your other ventures complement Anantha Living?",
    answer:
      "Each venture serves a distinct purpose—transformative travel, wellness retreats, and vision workshops—together forming a unified ecosystem for holistic living.",
  },
  {
    id: 4,
    question: "What support is available after joining?",
    answer:
      "Members receive ongoing community support, workshops, optional coaching, and access to exclusive resources that foster long-term growth.",
  },
  {
    id: 5,
    question: "How can I join one of your programs?",
    answer:
      "Simply reach out through our contact form or explore our related platforms. We’ll guide you toward the program best aligned with your goals.",
  },
  {
    id: 6,
    question: "Are programs available online and in-person?",
    answer:
      "Yes. We offer both online and in-person experiences, giving you the flexibility to engage in a way that fits your lifestyle.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="px-2.5 py-17">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="mb-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-md text-gray-600">
            Find answers to common questions about Anantha Living and our programs.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-all"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="flex w-full items-center justify-between px-3 py-4 text-left transition hover:bg-gray-100"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`ml-4 shrink-0 text-indigo-600 transition-transform ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openId === faq.id && (
                <div className="border-t border-gray-200 bg-gray-50 px-3 py-4">
                  <p className="leading-relaxed text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
