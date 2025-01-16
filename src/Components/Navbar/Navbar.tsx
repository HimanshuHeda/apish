"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { IconMenu, IconX } from "@tabler/icons-react";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Generate",
    path: "/apikey",
  },
  {
    title: "Chatbot",
    path: "/Chatbot",
  },
  {
    title: "Test",
    path: "/chat",
  },
];

const NavBar = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 top-0 left-0 right-0 z-10 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white font-bold text-xl">
            <Link href="/" aria-label="Home">
              APIsh
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >
                  {link.title}
                </Link>
              ))}
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <IconX className="h-6 w-6" />
            ) : (
              <IconMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              {link.title}
            </Link>
          ))}
          {session ? (
            <button
              onClick={() => {
                signOut();
                closeMobileMenu();
              }}
              className="text-gray-300 hover:bg-red-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
