import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us - Bnan Real Estate",
  description: "Discover premium off-plan properties and new projects in Dubai and UAE with Bnan Real Estate. Your trusted partner in real estate investments.",
};

export default function AboutPage() {
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
            About Bnan Real Estate
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Your trusted partner in finding the perfect property in Dubai and UAE
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Trusted Real Estate Partner in Dubai
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Welcome to <strong>Bnan Real Estate</strong>, your premier destination for discovering 
                exceptional off-plan properties and new development projects across Dubai and the UAE. 
                With years of expertise in the dynamic real estate market, we specialize in connecting 
                discerning buyers with their dream homes.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our mission is to simplify the property search process by providing comprehensive, 
                up-to-date information on the most sought-after projects in the region. Whether you're 
                looking for luxury apartments, modern villas, or strategic investment opportunities, 
                our platform serves as your gateway to the finest real estate offerings.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At Bnan Real Estate, we believe that finding your perfect home should be an exciting 
                and rewarding experience. Our dedicated team works tirelessly to ensure that every client 
                receives personalized guidance throughout their property journey.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/bnan-realestate.jpg"
                alt="Bnan Real Estate - Dubai Skyline"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Bnan Real Estate?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We pride ourselves on delivering exceptional service and value to our clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-[#d8b564]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Curated Property Selection</h3>
              <p className="text-gray-600">
                We carefully curate our portfolio to include only the most promising and high-quality 
                off-plan projects from reputable developers in Dubai and UAE.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-[#d8b564]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Our team of experienced real estate professionals provides personalized advice 
                and support to help you make informed investment decisions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-[#d8b564]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#d8b564]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted & Transparent</h3>
              <p className="text-gray-600">
                We maintain complete transparency in all our transactions and only work with 
                verified developers and trusted projects in the UAE market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="text-center p-6 border border-gray-100 rounded-2xl hover:border-[#d8b564] transition-colors duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Off-Plan Projects</h3>
              <p className="text-gray-600 text-sm">
                Browse the latest off-plan developments from top developers in Dubai
              </p>
            </div>

            {/* Service 2 */}
            <div className="text-center p-6 border border-gray-100 rounded-2xl hover:border-[#d8b564] transition-colors duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Property Search</h3>
              <p className="text-gray-600 text-sm">
                Find your perfect home with our advanced search and filters
              </p>
            </div>

            {/* Service 3 */}
            <div className="text-center p-6 border border-gray-100 rounded-2xl hover:border-[#d8b564] transition-colors duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Investment Advisory</h3>
              <p className="text-gray-600 text-sm">
                Expert advice on profitable real estate investments in UAE
              </p>
            </div>

            {/* Service 4 */}
            <div className="text-center p-6 border border-gray-100 rounded-2xl hover:border-[#d8b564] transition-colors duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock customer support for all your queries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#d8b564] mb-2">500+</div>
              <div className="text-gray-300">Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#d8b564] mb-2">200+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#d8b564] mb-2">50+</div>
              <div className="text-gray-300">Projects Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#d8b564] mb-2">10+</div>
              <div className="text-gray-300">Years Experience</div>
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
            Let us help you discover the perfect property in Dubai. Browse our curated 
            collection of off-plan projects and find your ideal home today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-[#d8b564] hover:bg-[#c9a653] text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-300"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border-2 border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

