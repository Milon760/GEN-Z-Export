// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiGithub,
//   FiFacebook,
//   FiInstagram,
//   FiTwitter,
//   FiArrowRight,
//   FiMail,
//   FiMapPin,
//   FiPhone,
// } from "react-icons/fi";

// export default function Footer() {
//   const [email, setEmail] = useState("");

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email.trim()) {
//       alert(`Subscribed successfully with: ${email}`);
//       setEmail("");
//     }
//   };

//   const footerLinks = {
//     shop: [
//       { name: "All Drops", path: "/" },
//       { name: "Elite Panjabi", path: "/shop/category/panjabi" },
//       { name: "Resort Shirts", path: "/shop/category/shirt" },
//       { name: "Cyber Tees", path: "/shop/category/tshirt" },
//       { name: "Cargo Pants", path: "/shop/category/pant" },
//     ],
//     support: [
//       { name: "Track Order", path: "/track" },
//       { name: "Return & Exchange", path: "/returns" },
//       { name: "Shipping Info", path: "/shipping" },
//       { name: "Privacy Policy", path: "/privacy-policy" },
//     ],
//     company: [
//       { name: "About GEN-Z", path: "/aboutus" },
//       { name: "Contact Us", path: "/contactus" },
//       { name: "Store Locator", path: "/stores" },
//       { name: "Careers", path: "/careers" },
//     ],
//   };

//   return (
//     <footer className="w-full bg-white dark:bg-[#0a0a0a] text-neutral-600 dark:text-neutral-400 font-sans border-t border-neutral-200 dark:border-neutral-800/80 transition-colors duration-300 select-none antialiased">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-neutral-200 dark:border-neutral-800/80">
//           {/* Brand Info Section */}
//           <div className="sm:col-span-2 space-y-5 text-left">
//             <div className="w-fit ">
//               <Link
//                 to="/"
//                 className="flex items-center gap-3 group focus:outline-none"
//               >
//                 {/* Creative Geometric Diamond Badge */}
//                 <div className="relative flex items-center justify-center ">
//                   {/* Background Subtle Glow on Hover */}
//                   <div className="absolute inset-0 rotate-45 bg-[#C5A059]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                   {/* Diamond Shape Box */}
//                   <div
//                     className="relative w-10 h-10 rotate-45 border-2 border-[#C5A059]
//                         bg-slate-100/80 dark:bg-neutral-900/80 backdrop-blur-sm
//                         group-hover:border-neutral-900 dark:group-hover:border-white
//                         shadow-sm group-hover:shadow-lg group-hover:shadow-[#C5A059]/20
//                         transition-all duration-500 rounded-lg flex items-center justify-center"
//                   >
//                     {/* Inner GZ Text */}
//                     <span
//                       className="-rotate-45 font-black text-base text-[#C5A059]
//                     dark:text-[#E6C687] group-hover:scale-110 transition-all duration-300 select-none"
//                     >
//                       GZ
//                     </span>
//                   </div>
//                 </div>

//                 {/* Brand Identity Typography */}
//                 <div className="flex flex-col">
//                   <div className="flex items-center gap-1.5 leading-none">
//                     {/* High-Contrast Dynamic Title */}
//                     <span
//                       className="font-black text-xl tracking-wide
//                     text-neutral-900 dark:text-neutral-100
//                     group-hover:text-[#C5A059] dark:group-hover:text-[#E6C687]
//                     transition-colors duration-300 drop-shadow-xs"
//                     >
//                       GEN
//                       <span className="text-[#C5A059] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
//                         -
//                       </span>
//                       Z
//                     </span>

//                     {/* Eye-Catching Rotating Diamond Accent */}
//                     <span className="w-2 h-2 rotate-45 bg-[#C5A059] shadow-md transition-all duration-500 group-hover:scale-125 group-hover:rotate-[225deg]" />
//                   </div>

//                   {/* EXPORT Subtitle */}
//                   <div className="flex items-center ml-0.5">
//                     <span
//                       className="text-[9px] font-extrabold tracking-[0.35em] uppercase
//                     text-neutral-700 dark:text-[#C5A059]
//                     group-hover:text-neutral-950 dark:group-hover:text-white
//                     transition-colors duration-300"
//                     >
//                       EXPORT
//                     </span>

//                     {/* Expanding Decorative Glow Line */}
//                     <span className="h-[2px] w-3 bg-[#C5A059] opacity-80 group-hover:w-5 transition-all duration-300 shadow-[0_0_6px_#C5A059]" />
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             <p className="text-sm leading-relaxed max-w-sm text-neutral-500 dark:text-neutral-400">
//               Redefining urban street culture with premium aesthetics and
//               dynamic drops. Engineered for the next generation of global
//               trends.
//             </p>

//             {/* Contact Info Block */}
//             <div className="space-y-2.5 text-sm pt-2">
//               <div className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">
//                 <FiMapPin className="text-[#C5A059] flex-shrink-0" size={16} />
//                 <span>Ranpur, Bangladesh</span>
//               </div>
//               <div className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">
//                 <FiPhone className="text-[#C5A059] flex-shrink-0" size={16} />
//                 <span>+880 1782671468</span>
//               </div>
//             </div>
//           </div>

//           {/* Category: Shop */}
//           <div className="text-left">
//             <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
//               Shop Drops
//             </h4>
//             <ul className="space-y-2.5 text-sm font-semibold">
//               {footerLinks.shop.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.path}
//                     className="inline-block transition-all duration-300 hover:text-[#C5A059] hover:translate-x-1"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Category: Support & Policies */}
//           <div className="text-left">
//             <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
//               Support & Info
//             </h4>
//             <ul className="space-y-2.5 text-sm font-semibold">
//               {footerLinks.support.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.path}
//                     className="inline-block transition-all duration-300 hover:text-[#C5A059] hover:translate-x-1"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//               {footerLinks.company.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.path}
//                     className="inline-block transition-all duration-300 hover:text-[#C5A059] hover:translate-x-1"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter Box */}
//           <div className="text-left sm:col-span-2 lg:col-span-1">
//             <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
//               Join the Crew
//             </h4>
//             <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
//               Subscribe to receive early access to dynamic shock drops, events,
//               and premium updates.
//             </p>

//             <form
//               onSubmit={handleSubscribe}
//               className="relative flex items-center"
//             >
//               <FiMail className="text-neutral-400 dark:text-neutral-500 absolute left-3.5 text-base pointer-events-none" />
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-neutral-100 dark:bg-neutral-900/60 pl-10 pr-12 py-2.5 rounded-xl text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all duration-300"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="absolute right-1.5 p-2 bg-neutral-950 text-white dark:bg-[#C5A059] dark:text-neutral-950 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
//                 aria-label="Subscribe"
//               >
//                 <FiArrowRight size={14} />
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Bottom Section: Copyright & Socials */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-xs font-medium">
//           <div className="text-neutral-500 dark:text-neutral-400 tracking-wide text-center sm:text-left order-2 sm:order-1">
//             &copy; {new Date().getFullYear()}{" "}
//             <span className="font-bold text-neutral-800 dark:text-white">
//               GEN-Z Export
//             </span>
//             . All Rights Reserved. Engineered with precision.
//           </div>

//           {/* Social Connect Icons */}
//           <div className="flex items-center space-x-2 order-1 sm:order-2">
//             {[
//               {
//                 icon: <FiFacebook size={16} />,
//                 url: "https://facebook.com/genzexport",
//               },
//               { icon: <FiInstagram size={16} />, url: "https://instagram.com" },
//               { icon: <FiTwitter size={16} />, url: "https://twitter.com" },
//               { icon: <FiGithub size={16} />, url: "https://github.com" },
//             ].map((social, idx) => (
//               <a
//                 key={idx}
//                 href={social.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-[#C5A059] dark:hover:text-[#C5A059] bg-neutral-100 dark:bg-neutral-900/60 hover:bg-neutral-200 dark:hover:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 hover:scale-110 active:scale-95 transition-all duration-300"
//               >
//                 {social.icon}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// 2

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiArrowRight,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed successfully with: ${email}`);
      setEmail("");
    }
  };

  const footerLinks = {
    shop: [
      { name: "All Drops", path: "/shop" },
      { name: "Elite Panjabi", path: "/shop/category/panjabi" },
      { name: "Resort Shirts", path: "/shop/category/shirts" },
      { name: "Cyber Tees", path: "/shop/category/tshirts" },
      { name: "Cargo Pants", path: "/shop/category/pants" },
    ],
    support: [
      { name: "Track Order", path: "/track" },
      { name: "Return & Exchange", path: "/returns" },
      { name: "Shipping Info", path: "/shipping" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
    company: [
      { name: "About GEN-Z", path: "/aboutus" },
      { name: "Contact Us", path: "/contactus" },
      { name: "Store Locator", path: "/stores" },
      { name: "Careers", path: "/careers" },
    ],
  };

  return (
    <footer className="w-full bg-white dark:bg-[#0a0a0a] text-neutral-600 dark:text-neutral-400 font-sans border-t border-neutral-200 dark:border-neutral-800/80 transition-colors duration-300 select-none antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-5 pb-12 border-b border-neutral-200 dark:border-neutral-800/80">
          {/* Brand Info Section (Mobile-e Full Width col-span-2) */}
          <div className="col-span-2 sm:col-span-2 space-y-5 text-left">
            <div className="w-fit">
              <Link
                to="/"
                className="flex items-center gap-3 group focus:outline-none"
              >
                {/* Creative Geometric Diamond Badge */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rotate-45 bg-[#C5A059]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 rotate-45 border-2 border-[#C5A059] bg-slate-100/80 dark:bg-neutral-900/80 backdrop-blur-sm group-hover:border-neutral-900 dark:group-hover:border-white shadow-sm group-hover:shadow-lg group-hover:shadow-[#C5A059]/20 transition-all duration-500 rounded-lg flex items-center justify-center">
                    <span className="-rotate-45 font-black text-base text-[#C5A059] dark:text-[#E6C687] group-hover:scale-110 transition-all duration-300 select-none">
                      GZ
                    </span>
                  </div>
                </div>

                {/* Brand Identity Typography */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-black text-xl tracking-wide text-neutral-900 dark:text-neutral-100 group-hover:text-[#C5A059] dark:group-hover:text-[#E6C687] transition-colors duration-300 drop-shadow-xs">
                      GEN
                      <span className="text-[#C5A059] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                        -
                      </span>
                      Z
                    </span>
                    <span className="w-2 h-2 rotate-45 bg-[#C5A059] shadow-md transition-all duration-500 group-hover:scale-125 group-hover:rotate-[225deg]" />
                  </div>

                  <div className="flex items-center ml-0.5">
                    <span className="text-[9px] font-extrabold tracking-[0.35em] uppercase text-neutral-700 dark:text-[#C5A059] group-hover:text-neutral-950 dark:group-hover:text-white transition-colors duration-300">
                      EXPORT
                    </span>
                    <span className="h-[2px] w-3 bg-[#C5A059] opacity-80 group-hover:w-5 transition-all duration-300 shadow-[0_0_6px_#C5A059]" />
                  </div>
                </div>
              </Link>
            </div>

            <p className="text-sm leading-relaxed max-w-sm text-neutral-500 dark:text-neutral-400">
              Redefining urban street culture with premium aesthetics and
              dynamic drops. Engineered for the next generation of global
              trends.
            </p>

            {/* Contact Info Block */}
            <div className="space-y-2.5 text-sm pt-2">
              <div className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">
                <FiMapPin className="text-[#C5A059] flex-shrink-0" size={16} />
                <span>Rangpur, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">
                <FiPhone className="text-[#C5A059] flex-shrink-0" size={16} />
                <span>+880 1782671468</span>
              </div>
            </div>
          </div>

          {/* Category: Shop (Mobile-e Pashapashi col-span-1) */}
          <div className="col-span-1 text-left">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
              Shop Drops
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-block transition-all duration-300 hover:text-[#C5A059] hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category: Support & Policies (Mobile-e Pashapashi col-span-1) */}
          <div className="col-span-1 text-left">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
              Support & Info
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-block transition-all duration-300 hover:text-[#C5A059] hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-block transition-all duration-300 hover:text-[#C5A059] hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box (Mobile-e Full Width col-span-2) */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 text-left">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
              Join the Crew
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
              Subscribe to receive early access to dynamic shock drops, events,
              and premium updates.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="relative flex items-center"
            >
              <FiMail className="text-neutral-400 dark:text-neutral-500 absolute left-3.5 text-base pointer-events-none" />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-neutral-900/60 pl-10 pr-12 py-2.5 rounded-xl text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 bg-neutral-950 text-white dark:bg-[#C5A059] dark:text-neutral-950 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                aria-label="Subscribe"
              >
                <FiArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-xs font-medium">
          <div className="text-neutral-500 dark:text-neutral-400 tracking-wide text-center sm:text-left order-2 sm:order-1">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-neutral-800 dark:text-white">
              GEN-Z Export
            </span>
            . All Rights Reserved. Engineered with precision.
          </div>

          {/* Social Connect Icons */}
          <div className="flex items-center space-x-2 order-1 sm:order-2">
            {[
              {
                icon: <FiFacebook size={16} />,
                url: "https://facebook.com/genzexport",
              },
              { icon: <FiInstagram size={16} />, url: "https://instagram.com" },
              { icon: <FiTwitter size={16} />, url: "https://twitter.com" },
              { icon: <FiGithub size={16} />, url: "https://github.com" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-[#C5A059] dark:hover:text-[#C5A059] bg-neutral-100 dark:bg-neutral-900/60 hover:bg-neutral-200 dark:hover:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 hover:scale-110 active:scale-95 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
