export default function Hero() {
  return (
    <section className="rounded-lg overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white p-8 mb-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Shop smart. Buy happy.</h1>
          <p className="mt-3 max-w-xl">Browse our curated categories and find high-quality products with real user reviews. Responsive UI, fast searches and secure authentication.</p>

          <div className="mt-6 flex gap-3">
            <a href="#types" className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold shadow hover:translate-y-[-2px] transition">Browse Types</a>
            <a href="#about" className="px-4 py-2 rounded-md border border-white/40 hover:bg-white/10 transition">Learn more</a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dwvihvwtn/image/upload/v1764173891/ab82ab50-efd6-4964-bf75-881ae875a41c_uj0ghb.jpg"
            alt="hero"
            className="max-w-full h-48 md:h-56 object-contain rounded-lg shadow-lg bg-white/30 p-3"
          />
        </div>
      </div>
    </section>
  );
}
