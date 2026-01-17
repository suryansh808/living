import img from "../assets/section1.jpg"
export default function Section1() {
  return (
    <section 
    className=" px-2.5 py-17">
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          
          {/* Content */}
          <div>
            <h2 className="mb-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl md:text-4xl">
              Transform Your Life
            </h2>

            <p className="mb-4 text-md leading-relaxed text-gray-700">
              Discover our comprehensive programs designed to guide you through
              meaningful transformation. From mindfulness practices to
              community engagement, we provide holistic solutions for conscious
              living.
            </p>

            <p className="mb-8 text-md leading-relaxed text-gray-700">
              Join thousands of individuals who have embarked on their journey
              toward authentic living with Anantha Living. Experience the
              profound impact of intentional lifestyle choices.
            </p>

            <a
              className="inline-block rounded-lg bg-indigo-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Start Your Journey
            </a>
          </div>

          {/* Image */}
          <div>
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl md:h-96">
              <img
                src={img}
                alt="Transformation Journey"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
