export default function About() {
  return (
    <section className="container mx-auto p-6 grid md:grid-cols-2 gap-6 items-center">
  <img
    src="https://res.cloudinary.com/dwvihvwtn/image/upload/v1764166328/0764d2dd-1ced-4344-9efa-e954b84e46eb_xfjp0m.jpg"
    alt="About us"
    className="w-full rounded-lg shadow-lg"
  />
  <div>
    <h1 className="text-3xl font-bold mb-4">About Us</h1>
    <p className="text-gray-700 mb-2">
      Welcome to E-Shop! We provide a curated selection of high-quality products across multiple categories.
    </p>
    <p className="text-gray-700 mb-2">
      Our mission is to make online shopping simple, fast, and reliable. We value customer satisfaction and strive to provide the best user experience possible.
    </p>
    <p className="text-gray-700">
      This website is created by a university student for a learning project.
    </p>
  </div>
</section>

  );
}
