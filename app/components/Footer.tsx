import Link from "next/link";
import Image from "next/image";
import BnanBlack from "../../public/Bnan.png";
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
                {/* About */}
                <div>
                    <Image src={BnanBlack}
                        alt="Bnan Real Estate"
                        width={150}
                        height={50}
                        className="mb-4"
                    />
                    <p>Providing the best off-plan and ready properties across Dubai. Trusted by thousands of clients.</p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-bold text-lg mb-2">Quick Links</h3>
                    <ul>
                        <li><a href="/" className="hover:text-[#d8b564]  text-white transition">Home</a></li>
                        <li><a href="/projects" className="hover:text-[#d8b564]  text-white transition">Projects</a></li>
                        <li><a href="/about" className="hover:text-[#d8b564]  text-white transition">About Us</a></li>
                        <li><a href="/contact" className="hover:text-[#d8b564]  text-white transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold text-lg mb-2">Contact</h3>
                    <p>Email: info@bnanrealestate.com</p>
                    <p>Phone: +971 58 532 0443</p>
                    <p>Address: Dubai, UAE</p>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-4 text-center py-4 text-gray-400 text-sm">
                © {new Date().getFullYear()} Bnan Real Estate. All rights reserved.
            </div>
        </footer>
    );
}