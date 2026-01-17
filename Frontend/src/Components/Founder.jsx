import founder from "../assets/founder.webp";
import founder2 from "../assets/founder2.jpg";
export default function Founder() {
  return (
    <section id="founder" className="px-2.6 py-17">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-5">
          <h2 className="mb-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl md:text-4xl">
            Meet Our Founders
          </h2>
          <div className="h-1 w-20 rounded-full bg-indigo-600" />
        </div>

        <div className="grid items-center p-2 gap-12 md:grid-cols-2">
          {/* Founder Image */}

          <div className="relative overflow-hidden rounded-xl h-130">
            <img
              src={founder}
              alt="Founder Portrait"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </div>

          {/* Founder Details */}
          <div className=" ">
            <div className="flex items-center gap-2">
              <h3 className=" font-serif text-3xl font-bold text-gray-900 md:text-3xl">
                Dhananjaya Lakshmikanth
              </h3>
              <span className="">
                <a href="https://www.linkedin.com/in/dhananjaya-lakshmikanth-dj-455536339?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BTVVuMKi5RHu4VYKcoCGAIA%3D%3D">
                  <i class="fa fa-linkedin text-blue-600 mt-2.5 cursor-pointer"></i>
                </a>{" "}
              </span>
            </div>
            <p className="mb-4 font-semibold text-indigo-600">
              Founder & Chief Strategist
            </p>

            <p className="mb-2 text-[16px] leading-tight text-gray-700">
              Dhananjaya Lakshmikanth is an accomplished business leader and
              strategic advisor with over 17 years of cross-sector experience
              spanning construction, infrastructure, event management,
              manufacturing, hospitality, and purpose-driven enterprises.
            </p>

            <p className="mb-2 text-[16px] leading-tight text-gray-700">
              He has served in senior leadership capacities including CEO and
              Business Head, driving large-scale teams, high-value initiatives,
              and complex multi-stakeholder operations in alignment with global
              best practices.
            </p>

            <p className="mb-2 text-[16px] leading-tight text-gray-700">
              As Founder & Chief Strategist of the Anantha Living ecosystem, he
              integrates structured business frameworks with human-centered
              leadership to architect scalable, resilient ventures across
              tourism, wellness, education, and services.
            </p>

            <p className="mb-2 text-[16px] leading-tight text-gray-700">
              Recognized for his clarity of thought, execution discipline, and
              long-term vision, he consistently delivers sustainable value for
              organizations, communities, and stakeholders.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "17+", label: "Years Experience" },
                { number: "10K+", label: "Lives Transformed" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-indigo-600 md:text-3xl">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid items-center p-2 gap-12 md:grid-cols-2">
          {/* Founder Image */}
          <div className="relative overflow-hidden rounded-xl h-130">
            <img
              src={founder2}
              alt="Founder Portrait"
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </div>

          {/* Founder Details */}
          <div className=" ">
            <div className="flex items-center gap-2">
              <h3 className=" font-serif text-3xl font-bold text-gray-900 md:text-3xl">
                Damodara R
              </h3>
            </div>
            <p className="mb-4 font-semibold text-indigo-600">Co-Founder</p>

            <p className="mb-2 text-[16px] leading-tight text-gray-700">
              Damodara R brings over three decades of distinguished public
              service experience, having completed a 33-year career with the
              Coir Board, Government of India, retiring at the level of Manager.
              His professional journey is deeply rooted in service, discipline,
              and India’s spiritual heritage.
            </p>

            <p className="mb-2 text-[16px] leading-tight text-gray-700">
              His tenure in government service cultivated strong foundations in
              accountability, people-centric leadership, and operational
              governance. Parallel exposure to the event management sector
              further strengthened his expertise in execution excellence and
              guest experience.
            </p>

            <p className="mb-2 text-[16px] leading-tight text-gray-700">
              With hands-on involvement in Indian real estate, he developed a
              robust understanding of land strategy, development viability, and
              long-term value creation capabilities that now underpin his
              approach to hospitality development.
            </p>

            <p className="mb-2 text-[16px] leading-tight text-gray-700">
              As Co-Founder of Anantha Hospitality, he is fully committed to
              advancing India’s spiritual hospitality landscape, with a focused
              emphasis on temple hotels and pilgrimage resorts designed to offer
              pilgrims meaningful, transformative experiences rooted in Sanātana
              Dharma.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "33+", label: "Years Experience" },
                { number: "23K+", label: "Lives Transformed" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-indigo-600 md:text-3xl">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
