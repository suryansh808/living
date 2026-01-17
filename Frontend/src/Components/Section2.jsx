import { Heart, Leaf, Users, Zap } from "lucide-react";

export default function Section2() {
  const features = [
    {
      icon: Heart,
      title: "Wellness Focused",
      description:
        "Holistic approaches to physical, mental, and emotional wellbeing",
    },
    {
      icon: Leaf,
      title: "Sustainable Living",
      description: "Eco-conscious practices for a better future",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Connect with like-minded individuals on your journey",
    },
    {
      icon: Zap,
      title: "Transformational",
      description:
        "Proven methodologies for lasting personal growth",
    },
  ];

  return (
    <section className=" px-2.5 py-17">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 text-center md:mb-20">
          <h2 className="mb-6 font-serif text-3xl font-bold text-gray-900 sm:text-4xl md:text-4xl">
            Why Choose Anantha Living
          </h2>
          <p className="mx-auto max-w-3xl text-md text-gray-600">
            Our integrated approach combines ancient wisdom with modern
            insights to create transformative experiences.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white px-4 py-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-100">
                  <Icon size={28} className="text-indigo-600" />
                </div>

                <h3 className="mb-3 font-serif text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
