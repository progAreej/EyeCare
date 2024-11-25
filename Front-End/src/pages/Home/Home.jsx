// import NavBar from "../../components/NavBar";
// import Hero from "./Hero";
// import Footer from "@/components/Footer";

// export default function Home() {
//   return (
//     <>
//       <NavBar />
//       <Hero />
//       <Footer />
//     </>
//   );
// }

import { motion } from "framer-motion";
import { Eye, Monitor, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";
import img5 from "../../assets/doc1.svg";
import {
  FaQuoteLeft,
  FaStar,
  FaEye,
  FaLaptopMedical,
  FaUserMd,
} from "react-icons/fa";
import about from "../../assets/scroll.svg";
function HomePage() {
  // const services = [
  //   { id: 1, name: "Comprehensive Eye Care", description: "Get the best care for your vision." },
  //   { id: 2, name: "Advanced Technologies", description: "Using the latest in eye care tech." },
  //   { id: 3, name: "Qualified Specialists", description: "Meet our team of certified professionals." }
  // ];

  const services = [
    {
      id: 1,
      name: "Comprehensive Eye Care",
      description: "Get the best care for your vision.",
      icon: FaEye,
    },
    {
      id: 2,
      name: "Advanced Technologies",
      description: "Using the latest in eye care tech.",
      icon: FaLaptopMedical,
    },
    {
      id: 3,
      name: "Qualified Specialists",
      description: "Meet our team of certified professionals.",
      icon: FaUserMd,
    },
  ];
  const testimonials = [
    {
      id: 1,
      quote: "EyeCare has changed my life. The specialists are amazing!",
      author: "John Doe",
    },
    {
      id: 2,
      quote: "Best eye care services I’ve ever received!",
      author: "Jane Smith",
    },
    {
      id: 3,
      quote: "Highly recommend EyeCare to anyone needing vision care.",
      author: "Michael Brown",
    },
  ];

  const [doctors, setDoctors] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleMouseEnter = (index) => {
    setFlippedIndex(index);
  };

  const handleMouseLeave = () => {
    setFlippedIndex(null);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = doctors.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(doctors.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <NavBar />

      {/* Hero Section الجديد */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 align-middle p-4 mx-4 sm:mx-8 md:mx-12 lg:mx-32 sm:p-8 md:p-12 rounded-3xl items-center min-h-96 bg-gradient-to-br from-[#eafffb] to-[#1f7b6f] mt-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1f544c]">
              See Clearly, <br />
              Live Fully.
            </h1>
            <p className="text-xl text-slate-700">
              Discover more than{" "}
              <span className="text-[#1f7b6f]">50 years of expertise</span> in
              eye care. We're here to help you find the best solution for your
              vision needs.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/services"
              className="bg-[#1f544c] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-[#1f7b6f] transition-colors duration-200"
            >
              Explore Services
            </Link>
            <Link
              to="/appointments"
              className="bg-white text-[#1f7b6f] border-2 border-[#1f544c] px-6 py-3 rounded-xl font-bold shadow-md hover:bg-[#eafffb] transition-colors duration-200"
            >
              Book Appointment
            </Link>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <img
            src={about}
            alt="Eye Care"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-white dark:bg-gray-800 py-6 sm:py-8 lg:py-8  ">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 mt-32 mb-16 ">
          <div className="mb-4 flex items-center justify-center gap-8 sm:mb-8 md:mb-12 ">
            <h2 className="text-3xl font-semibold mb-8 text-mintD">Gallery</h2>
          </div>

          <div className="flex flex-wrap gap-10 justify-center">
            {currentCards.map((doctor, index) => (
              <div
                key={doctor.id}
                className="group relative flex h-32 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 w-80"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={doctor.profile_image}
                  loading="lazy"
                  alt={doctor.name}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition duration-200 ${
                    flippedIndex === index ? "scale-110" : ""
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                  {doctor.name}
                </span>
                {flippedIndex === index && (
                  <div className="absolute inset-0 bg-white text-gray-800 flex items-center justify-center rounded-lg shadow-lg">
                    <div className="p-2">
                      <h3 className="text-lg font-bold">{doctor.name}</h3>
                      <p className="text-sm">
                        Experience: {doctor.years_of_experience} years
                      </p>
                      <p className="text-sm">{doctor.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className="mx-1 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      {/* <section className="px-10 py-20 text-center mt-16">
        <h2 className="text-3xl font-semibold mb-8 text-mintD">What Our Clients Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-gradient-to-br from-[#eafffb] to-[#1f7b6f] p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <h4 className="text-lg font-semibold">- {testimonial.author}</h4>
            </div>
          ))}
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section className="px-10 py-20 text-center mt-16 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-mintD">Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-gradient-to-br from-[#eafffb] to-[#1f7b6f] p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-mintD mb-4">{service.id === 1 ? <Eye /> : service.id === 2 ? <Monitor /> : <UserCheck />}</div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section> */}
      {/* Testimonial Section */}
      <section className="px-10 py-20 text-center mt-16 mb-32 ">
        <h2 className="text-3xl font-semibold mb-8 text-mintD">
          What Our Patients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-gradient-to-br from-[#eafffb] to-[#1f7b6f] p-6 rounded-lg shadow-lg "
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaQuoteLeft className="text-[#1f544c] text-3xl mb-4" />
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <h4 className="text-lg font-semibold">- {testimonial.author}</h4>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <div
        className="relative h-96 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${img5})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500">
            <h2 className="text-3xl font-bold text-mintD mb-4">
              About EyeCare
            </h2>
            <p className="text-gray-700 text-center">
              EyeCare is dedicated to providing world-class eye care with the
              most advanced technology and best specialists.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="px-10 py-20 text-center mt-16 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-mintD">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-[#1f7b6f] text-5xl mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <service.icon />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-mintD">
                {service.name}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
