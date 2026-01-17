import logo from "../assets/logo.png"


export default function Footer({
  OnHero,OnAbout,OnOurWebsite,OnInquriyForm
}) {
  const currentYear = new Date().getFullYear();
    const navLinks = [
    {label: "Home" , action: OnHero },
    {  label: "About" , action: OnAbout },
    { label: "Our Websites" , action: OnOurWebsite },
    {  label: "Contact" , action: OnInquriyForm },
  ]; 

      const websiteLinks = [
    {label: "Anantha Living" , link: "https://ananthaliving.com/" },
    {  label: "Anantha Tourism" , link: "https://www.ananthatourism.com/" },
    {  label: "SoulRest 2026" , link: "/soulreset2026" },
    { label: "VisionBoard Workshop" , link: "/visionboardworkshop2026" },
  ]; 


  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        
        <div className="mb-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
          
          {/* Brand */}
          <div>
              <img src={logo} alt="logo" className="h-18 mb-2" />
            <p className="text-sm leading-relaxed text-white/80">
              Transforming lives through conscious, authentic living and
              meaningful experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-5 text-lg font-semibold">Navigation</h4>
            <ul className="space-y-3">
              { navLinks.map(({label ,action})=>(
                 <li key={label}>
                    <button
                      onClick={()=> action()}
                      className="text-sm cursor-pointer text-white/70 transition-colors hover:text-white"
                    >
                      {label}
                    </button>
                  </li>
              ))}
            </ul>
          </div>

          {/* Ventures */}
          <div>
            <h4 className="mb-5 text-lg font-semibold">Our Ventures</h4>
            <ul className="space-y-3">
              {websiteLinks.map(({label, link}) => (
                <li key={label}>
                  <a
                    href={link}
                    target="_blank"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-5 text-lg font-semibold">Connect</h4>
            <div className="mb-6 flex gap-4">
              {[
                { icon: <i class="fa fa-instagram"></i>, label: "Instagram" , link:"https://www.instagram.com/anantha.living/" },
                { icon: <i class="fa fa-facebook"></i>, label: "Facebook" , link:"https://www.facebook.com/profile.php?id=61584838405136" },
                { icon: <i class="fa fa-pinterest"></i>, label: "Pinterest" , link:"https://in.pinterest.com/ananthaliving" },
              ].map(({ icon, label , link}) => (
                <a
                  key={label}
                  target="_blank"
                  href={link}
                  aria-label={label}
                  className="rounded-lg bg-white/20 text-xl text-white px-4 py-2 transition-colors hover:bg-white/30"
                >
                 {icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-white/70">
              support@ananthaliving.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/70 sm:flex-row">
          <p>© {currentYear} Anantha Living. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
