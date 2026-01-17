import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header({
  OnHero,
  OnAbout,
  OnOurWebsite,
  OnInquriyForm,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", onClick: OnHero },
    { label: "About", onClick: OnAbout },
    { label: "Our Websites", onClick: OnOurWebsite },
    { label: "Blog", to: "/blog" },
    { label: "Contact", onClick: OnInquriyForm, isCTA: true },
  ];

  // Helper to handle clicks and close menu
  const handleNavClick = (action) => {
    if (action) action();
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg" 
          : "bg-gray-900/80 lg:bg-transparent"
      } ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" onClick={() => handleNavClick(OnHero)}>
            <img 
              src={logo} 
              alt="logo" 
              className={`transition-all duration-300 object-contain ${
                scrolled ? "h-10" : "h-14"
              }`} 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm font-medium tracking-widest uppercase text-white/90 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full"></span>
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`text-sm font-medium cursor-pointer tracking-widest uppercase transition-all ${
                    item.isCTA 
                    ? "bg-white text-gray-900 px-5 py-2 rounded-full hover:bg-gray-200" 
                    : "text-white/90 hover:text-white cursor-pointer"
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 text-white transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown (Simple & Reliable) */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-100px opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col pb-6 border-t border-white/10 pt-4">
            {navLinks.map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-4 text-lg font-medium text-white border-b border-white/5"
                >
                  {item.label}
                  <ChevronRight size={16} className="text-gray-500" />
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.onClick)}
                  className={`flex items-center text-white justify-between py-4 text-lg font-medium text-left border-b border-white/5 ${
                    item.isCTA ? "text-accent font-bold" : "text-white"
                  }`}
                >
                  {item.label}
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}