import { useState } from "react";

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      title: "Nerandate norimos prekes?",
      content: `Mes nuolat pridedame naujų prekių. Jei turite pageidavimų, visada galite parašyti mums el. paštu: fakeemail@example.com.`,
    },
    {
      title: "Niekas nepadėjo?",
      content: `Pagalba nuotoliu: +370 123 45678, el. paštas: fakeemail@example.com\nPagalba gyvai: Adresas: Fake gatvė 1, Vilnius, Lietuva.`,
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pagalba / Help</h1>

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
