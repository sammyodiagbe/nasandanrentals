"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [animateIcon, setAnimateIcon] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setAnimateIcon(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableRef.current) {
            event.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          if (document.activeElement === lastFocusableRef.current) {
            event.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      firstFocusableRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={menuRef}
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden bg-white shadow-lg z-50 w-64 transition duration-300 ease-in-out`}
      >
        <div className="p-6">
          <button
            ref={firstFocusableRef}
            className="mb-8 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${animateIcon ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="block hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="block hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/bookings"
                  className="block hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Bookings
                </Link>
              </li>
              <li>
                <a
                  ref={lastFocusableRef}
                  href="#"
                  className="block hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Rent now
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
