"use client";

import React from "react";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagramSquare, FaMapPin, FaPaperPlane } from "react-icons/fa";

import Link from "next/link";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/main/ContactPage/ContactForm"), {
  loading: () => <p>loading...</p>,
})
const ContactPage = () => {
  const socialMedia = [
    {
      icon: <FaInstagramSquare size={26} />,
      href: "#",
      label: "Instagram",
    },
    {
      icon: <IoLogoLinkedin size={26} />,
      href: "#",
      label: "LinkedIn",
    },
  ]


  return (
    <div className="w-full min-h-screen bg-white text-black py-30 overflow-hidden">
      <div className="w-full px-4 md:px-16">
        {/* Header Section */}
        <header className="text-left mb-16">
          <div className="relative inline-block mb-6">
            <h1
              className="text-2xl md:text-4xl  font-black text-gray-900 mb-6 tracking-tight"
              style={{
                fontSize: "clamp(2rem, 0.3723rem + 7.234vw, 6.25rem)",
                lineHeight: 1.1,
              }}
            >
              Let's Build Something Unexpected
            </h1>
            <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-black z-0"></div>
          </div>

          <p
            className="text-lg md:text-2xl font-medium text-gray-600"
          >
            Whether you're exploring a collaboration, applying for a role, or
            just curious about our work, we're always open to conversations that
            lead to new ideas.
          </p>
        </header>

        {/*  Contact Sections - Two Columns */}
        <div className="w-full flex flex-col justify-center gap-12">
          {/* Enhanced Contact Form Section */}
          <div className="w-full md:w-8/12 mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
              <div className="flex items-center mb-8">
                <div className="bg-gray-200 p-3 rounded-full mr-4">
                  <FaPaperPlane className="text-black text-xl" />
                </div>
                <h2 className="text-3xl font-bold">
                  Let's Start the Conversation
                </h2>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Contact with us */}
          <div className="w-full md:w-8/12 mx-auto flex justify-center items-center ">
            <div className="flex flex-col gap-6">
              <h3 className="font-medium text-gray-600 mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                {socialMedia.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    className="flex flex-col items-center group"
                    aria-label={social.label}
                  >
                    <div className="bg-gray-200 p-3 rounded-full group-hover:bg-gray-300 transition-colors duration-300">
                      {social.icon}
                    </div>
                    <span className="mt-2 text-sm text-gray-600 group-hover:text-black transition-colors">
                      {social.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default ContactPage;
