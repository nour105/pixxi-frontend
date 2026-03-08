import Link from "next/link";
import Image from "next/image";
import BnanBlack from "../../public/Bnan-Black.png";

export default function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src={BnanBlack}
                        alt="Bnan Real Estate"
                        width={100}
                        height={40}
                        className=""
                    />
                </Link>

                {/* Navigation */}
                <nav className="space-x-6 hidden md:flex">
                    <Link href="/" className="hover:text-[#d8b564]  text-black transition">Home</Link>
                    <Link href="/projects" className="hover:text-[#d8b564]  text-black transition">Off-Plan</Link>
                    <Link href="/about" className="hover:text-[#d8b564]  text-black transition">About Us</Link>
                    <Link href="/contact" className="hover:text-[#d8b564]  text-black transition">Contact</Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-gray-700">
                        {/* Simple hamburger icon */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}