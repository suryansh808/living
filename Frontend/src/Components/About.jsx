import Founder from "./Founder";

export default function About() {
  return (
   <>
        <section  id="about" className="px-2.5 py-17" >
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-5">
          <h2 className="mb-2 font-serif text-3xl font-bold text-gray-900 sm:text4xl md:text-4xl">
            About Anantha Living
          </h2>
          <div className="h-1 w-20 rounded-full bg-indigo-600" />
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          
          {/* Mission */}
          <div>
            <h3 className="mb-6 font-serif text-2xl font-bold text-gray-900">
              Our Mission
            </h3>
            <p className="mb-6 leading-relaxed text-gray-600">
              Anantha Living is dedicated to creating a holistic ecosystem for
              conscious, authentic living. We empower individuals to make
              intentional choices aligned with their values and aspirations.
            </p>
            <p className="leading-relaxed text-gray-600">
              Through curated experiences, wellness programs, and community
              initiatives, we enable personal growth and meaningful connection
              in an increasingly complex world.
            </p>
          </div>

          {/* Offerings */}
          <div>
            <h3 className="mb-6 font-serif text-2xl font-bold text-gray-900">
              What We Offer
            </h3>
            <ul className="space-y-4">
              {[
                "Premium Wellness Solutions",
                "Conscious Lifestyle Coaching",
                "Community Experiences",
                "Transformational Programs",
                "Sustainable Living Guidance",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 text-lg font-bold text-indigo-600">
                    ✦
                  </span>
                  <span className="text-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
       </section>
       <Founder/>
   </>
  );
}
