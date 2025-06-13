const features = [
  { title: "24/7 Support", desc: "We're here whenever you need us." },
  { title: "Flight Tracking", desc: "We monitor your flight and adjust for delays." },
  { title: "Fixed Pricing", desc: "No surge pricing or hidden charges." },
];

export default function Features() {
  return (
    <section className="py-20 bg-neutral text-neutral-dark dark:bg-neutral-dark dark:text-neutral">
      <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, i) => (
          <div 
            key={i} 
            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition
                       border-l-4 border-primary hover:border-primary-dark"
          >
            <h3 className="text-xl font-semibold mb-2 text-primary dark:text-primary-light">
              {f.title}
            </h3>
            <p className="text-neutral-dark dark:text-neutral-light">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}