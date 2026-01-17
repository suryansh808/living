import { useState } from "react";
import emailjs from "@emailjs/browser";
export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


 const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch((error) => {
        console.error("Email failed:", error);
        alert("Something went wrong. Please try again.");
      });
  };


  return (
    <section
      id="contact"
      className="px-2.5 py-17"
    >
      <div className="mx-auto max-w-3xl">
        
        {/* Header */}
        <div className=" text-center  mb-5">
          <h2 className="mb-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl md:text-4xl">
            Connect With Us
          </h2>
          <p className="mx-auto max-w-2xl text-md text-gray-600">
            Ready to begin your transformation? Reach out to us with any
            questions or to learn more about our programs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>

          </div>

          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Program inquiry, coaching, etc."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <div>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us more about your inquiry..."
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-indigo-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            Send Inquiry
          </button>

          {submitted && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center font-semibold text-emerald-700">
              ✓ Thank you! We&apos;ll be in touch soon.
            </div>
          )}

        </form>
      </div>
    </section>
  );
}
