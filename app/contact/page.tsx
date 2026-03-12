import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Contact Us - Bnan Real Estate",
  description: "Get in touch with Bnan Real Estate. Contact us for inquiries about off-plan properties, new projects, and investments in Dubai and UAE.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/bnan-realestate.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center items-center px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Get in touch with us for all your real estate needs in Dubai and UAE
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Phone */}
            {/* Phone */}
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-14 h-14 bg-[#d8b564]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+971 50 000 0000</p>
              <p className="text-gray-600">+971 4 000 0000</p>
            </div>

            {/* Email */}
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-14 h-14 bg-[#d8b564]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@bnanrealestate.com</p>
              <p className="text-gray-600">sales@bnanrealestate.com</p>
            </div>

            {/* Office / Location */}
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-14 h-14 bg-[#d8b564]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Office</h3>
              <p className="text-gray-600">Bay View Tower, 18th Floor</p>
              <p className="text-gray-600">Business Bay, Dubai, UAE</p>
            </div>


          </div>
          {/* Contact Form and Info */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d8b564] focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d8b564] focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d8b564] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d8b564] focus:border-transparent"
                    placeholder="+971 50 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Interested In
                  </label>
                  <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d8b564] focus:border-transparent">
                    <option value="">Select a property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="investment">Investment Property</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d8b564] focus:border-transparent"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d8b564] hover:bg-[#c9a653] text-white font-semibold py-4 rounded-xl transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At <strong>Bnan Real Estate</strong>, we are committed to helping you find
                your perfect property in Dubai and the UAE. Whether you are looking for a
                luxury apartment, a villa, or an investment opportunity, our team of
                experienced professionals is here to assist you every step of the way.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#d8b564]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">Sunday - Thursday: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Friday - Saturday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>

                {/* <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#d8b564]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Languages</h3>
                    <p className="text-gray-600">English, Arabic, Hindi, Russian</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#d8b564]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Service Areas</h3>
                    <p className="text-gray-600">Dubai, Abu Dhabi, Sharjah, Ras Al Khaimah, and all major UAE cities</p>
                  </div>
                </div> */}
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {/* Facebook */}
                  <a href="#" className="text-gray-500 hover:text-[#d8b564] transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 17 22 12z" />
                    </svg>
                  </a>

                  {/* Twitter */}
                  <a href="#" className="text-gray-500 hover:text-[#d8b564] transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482A13.945 13.945 0 011.671 3.149 4.917 4.917 0 003.195 9.723a4.902 4.902 0 01-2.229-.616v.062a4.918 4.918 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.918 4.918 0 004.59 3.417 9.867 9.867 0 01-6.102 2.104c-.396 0-.787-.023-1.175-.068a13.945 13.945 0 007.548 2.212c9.142 0 14-7.721 13.995-14.646a9.936 9.936 0 002.457-2.549z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a href="#" className="text-gray-500 hover:text-[#d8b564] transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.243 1.31 3.608.058 1.266.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.243 1.248-3.608 1.31-1.266.058-1.645.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.243-1.31-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.243-1.248 3.608-1.31C8.416 2.175 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 2.694.272.272 2.69.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072s3.668-.014 4.948-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our office in Dubai for a free consultation
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center w-full">
                <iframe
                  src="https://www.google.com/maps?q=Bay+View+Tower+Business+Bay+Dubai&output=embed"
                  width="100%"
                  height="400"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our curated collection of off-plan projects in Dubai and find your ideal home today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-[#d8b564] hover:bg-[#c9a653] text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-300"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="border-2 border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-300"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}