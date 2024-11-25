// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react"; // Import useState and useEffect
// import logo from "../assets/logo.png";

// const NavBar = () => {
//   const [scrolled, setScrolled] = useState(false); // Initialize scrolled state

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     document.addEventListener("scroll", handleScroll);
//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled]);

//   return (
//     <nav
//       className={`py-2 fixed w-full top-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-white shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo Section */}
//         <div className="text-mint text-xl font-bold">
//           <Link to="/">
//             <img src={logo} alt="Logo" width="70px" />
//           </Link>
//         </div>

//         {/* Nav Links */}
//         <div className="space-x-6">
//           {["/", "/profile", "/appointments", "/billing", "/admin"].map(
//             (path, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="inline-block"
//               >
//                 <Link
//                   to={path}
//                   className="text-mint font-bold text-l hover:text-mint transition duration-300"
//                 >
//                   {path === "/"
//                     ? "Home"
//                     : path.split("/")[1].charAt(0).toUpperCase() +
//                       path.split("/")[1].slice(1)}
//                 </Link>
//               </motion.div>
//             )
//           )}
//         </div>

//         {/* Login Button */}
//         <motion.div
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className="inline-block"
//         >
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-mintD text-white rounded-md hover:bg-mint transition duration-300"
//           >
//             Login
//           </Link>
//         </motion.div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice"; // Ensure this path is correct
import logo from "../assets/logo.png";

const NavBar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProtectedLink = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/profile", label: "Profile", protected: true },
    { path: "/appointments", label: "Appointments", protected: true },
    { path: "/contactus", label: "Contact Us" },
  ];

  if (user && user.role === "admin") {
    navLinks.push({ path: "/admin", label: "Admin" });
  }

  return (
    <nav
      className={`py-2 fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-mint text-xl font-bold">
          <Link to="/">
            <img src={logo} alt="Logo" width="70px" />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="space-x-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block"
            >
              {link.protected ? (
                <button
                  onClick={() => handleProtectedLink(link.path)}
                  className="text-mintD font-bold text-l hover:text-mint transition duration-300"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="text-mintD font-bold text-l hover:text-mint transition duration-300"
                >
                  {link.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Login/Logout Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-block"
        >
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-mintD text-white rounded-md hover:bg-mint transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-mintD text-white rounded-md hover:bg-mint transition duration-300"
            >
              Login
            </Link>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

export default NavBar;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice"; // Ensure this path is correct
// import logo from "../assets/logo.png";

// const NavBar = () => {
//   const [scrolled, setScrolled] = React.useState(false);
//   const user = useSelector((state) => state.auth.user);
//   const isLoggedIn = !!user;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     document.addEventListener("scroll", handleScroll);

//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled]);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   const handleProtectedLink = (path) => {
//     if (isLoggedIn) {
//       navigate(path);
//     } else {
//       navigate("/login");
//     }
//   };

//   const navLinks = [
//     { path: "/", label: "Home" },
//     { path: "/profile", label: "Profile", protected: true },
//     { path: "/appointments", label: "Appointments", protected: true },
//     { path: "/contactus", label: "Contact Us" },
//   ];

//   if (user && user.role === "admin") {
//     navLinks.push({ path: "/admin", label: "Admin" });
//   }

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className={`py-4 fixed w-full top-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-white shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center px-6">
//         {/* Logo Section */}
//         <motion.div className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
//           <Link to="/">
//             <img src={logo} alt="Logo" className="h-12 w-auto" />
//           </Link>
//         </motion.div>

//         {/* Nav Links */}
//         <div className="space-x-6 hidden md:flex">
//           {navLinks.map((link, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.1, color: "#34D399" }} // Green hover effect
//               whileTap={{ scale: 0.9 }}
//               className="inline-block"
//             >
//               {link.protected ? (
//                 <button
//                   onClick={() => handleProtectedLink(link.path)}
//                   className="text-gray-700 font-semibold hover:text-mint transition duration-300"
//                 >
//                   {link.label}
//                 </button>
//               ) : (
//                 <Link
//                   to={link.path}
//                   className="text-gray-700 font-semibold hover:text-mint transition duration-300"
//                 >
//                   {link.label}
//                 </Link>
//               )}
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <motion.div
//           className="md:hidden flex items-center"
//           whileHover={{ scale: 1.1 }}
//         >
//           <button className="text-gray-700 hover:text-mint">
//             <svg
//               className="w-8 h-8"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </motion.div>

//         {/* Login/Logout Button */}
//         <motion.div
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className="inline-block ml-4"
//         >
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-mintD text-white rounded-md hover:bg-mint transition duration-300"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               to="/login"
//               className="px-4 py-2 bg-mintD text-white rounded-md hover:bg-mint transition duration-300"
//             >
//               Login
//             </Link>
//           )}
//         </motion.div>
//       </div>
//     </motion.nav>
//   );
// };

// export default NavBar;
