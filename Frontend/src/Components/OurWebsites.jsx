import { ExternalLink } from "lucide-react";
import img1 from "../assets/websitesimg/ananthaliving.png"
import img2 from "../assets/websitesimg/ananthatourism.png"
import img3 from "../assets/websitesimg/soulreset.png"
import img4 from "../assets/websitesimg/visionboard.png"

export default function OurWebsites() {
  const websites = [
    {
      id: 1,
      name: "Anantha Living",
      description: "Anantha Living offers handcrafted spiritual products like energy bracelets designed to inspire balance, mindfulness, and inner peace, supporting a more meaningful, conscious lifestyle.",
      image: `${img1}`,
      url: "https://ananthaliving.com/",
      accent: "from-amber-500 to-orange-500",
    },
    {
      id: 2,
      name: "Anantha Tourism",
      description:
        "Embark on a spiritually curated Maha Magh Snan 2026 pilgrimage at the holy Triveni Sangam in Prayagraj. Our priest-guided snan assistance, Sankalpa Puja support, senior-friendly care, structured logistics.",
     image: `${img2}`,
      url: "https://www.ananthatourism.com/",
      accent: "from-emerald-500 to-teal-500",
    },
    {
      id: 3,
      name: "SoulRest 2026",
      description: "Soul Reset is a curated 11-day inner-transformation immersion hosted at the sacred confluence of the Sangam, Prayagraj. Designed for entrepreneurs, professionals, and seekers navigating burnout or transition .",
     image: `${img3}`,
      url: "https://anantaliving.in/soulreset2026/",
      accent: "from-rose-500 to-pink-500",
    },
    {
      id: 4,
      name: "VisionBoard Workshop 2026",
      description: "Don't let another year slip by. Join our live session to visualize and claim your future today. Seats are limited for this transformative experience, so reserve your spot before they fill up.",
     image: `${img4}`,
      url: "https://anantaliving.in/visionboardworkshop2026/",
      accent: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      id="websites"
      className="px-2.5 py-17"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-10">
           <div className="mb-5">
             <h2 className="mb-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl md:text-4xl">
            Our Ecosystem
          </h2>
          <div className="h-1 w-20 rounded-full bg-indigo-600" />
           </div>
          <p className="max-w-2xl text-md text-gray-600">
            Explore our carefully crafted portfolio of ventures, each designed
            to support your journey toward authentic living.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-6">
          {websites.map((website) => (
            <div
              key={website.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={website.image}
                  alt={website.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 bg-linear-to-br ${website.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
                />
              </div>

              {/* Content */}
              <div className="px-3 py-5">
                <h3 className="mb-3 font-serif text-2xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
                  {website.name}
                </h3>

                <p className="mb-8 h-14 text-base leading-relaxed text-gray-600">
                  {website.description}
                </p>

                <a
                 target="_blank"
                  href={website.url}
                  className="group/link mt-12 lg:mt-0 inline-flex items-center gap-3 font-semibold text-indigo-600 transition-all hover:gap-4"
                >
                  <span>Explore</span>
                  <ExternalLink
                    size={18}
                    className="transition-transform group-hover/link:translate-x-1 group-hover/link:translate-y-1"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
