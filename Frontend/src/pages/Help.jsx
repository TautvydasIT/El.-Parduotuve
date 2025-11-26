import { useState } from "react";

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      title: "Cant find a product?",
      content: `We are constantly adding new products, if you have any suggestions - contact us through email`,
    },
    {
      title: "Nothing helped?",
      content: `Help online: phone: +370 123 45678, el. paštas: fakeemail@example.com\nPagalba gyvai: Adresas: Fake street 1, Vilnius, Lithuania.`,
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 transition flex justify-between items-center font-medium"
            >
              {faq.title}
              <span className="ml-2">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 bg-white text-gray-700 whitespace-pre-line">
                {faq.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
