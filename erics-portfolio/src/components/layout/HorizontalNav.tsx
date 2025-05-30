"use client";

import Link from 'next/link';
import React from 'react';

const navLinks = [
    {name: "About", href: "/About"},
    {name: "Projects", href: "/Projects"},
    {name: "Skills", href: "/Skills"},
    {name: "Contact", href: "/Contact"},
];

export default function HorizontalNav() {
    // TODO: Add state for mobile menu toggle
    // TODO: add state for active section.

    return (
        <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              Eric Khodorenko 
            </Link>
          </div>

          {/* Desktop Navigation Links (hidden on small screens) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  // TODO: Add active link styling
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button (hidden on medium screens and up) */}
          <div className="-mr-2 flex md:hidden">
            <button
              // onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // TODO: Implement toggle
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500"              aria-controls="mobile-menu"
              aria-expanded="false" // TODO: Set based on state
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Heroicon name: menu */}
              {/* TODO: Use a proper SVG icon */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open. */}
              {/* Heroicon name: x */}
              {/* <svg className="hidden h-6 w-6" ...> <path ... d="M6 18L18 6M6 6l12 12" /> </svg> */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {/* TODO: Create MobileNavOverlay component and toggle its visibility */}
      {/* <div className="md:hidden" id="mobile-menu"> ... </div> */}
    </nav> 
    )
}