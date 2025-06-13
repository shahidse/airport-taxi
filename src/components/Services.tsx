const services = [
  { type: "Standard Taxi", desc: "Affordable and comfortable" },
  { type: "Luxury Vehicle", desc: "Premium ride with style" },
  { type: "Group Transport", desc: "Perfect for families or teams" },
];

export default function Services() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-12">Vehicle Types</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {services.map((s, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{s.type}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
