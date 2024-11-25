// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProfile } from "../features/Profile/ProfileSlice";
// import axios from "axios";
// function OrdersPage() {
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.Profile.profile);
//   const profileStatus = useSelector((state) => state.Profile.status);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchedOrders, setFetchedOrders] = useState([]);

//   useEffect(() => {
//     if (!profile) {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profile]);

//   useEffect(() => {
//     if (profileStatus === "idle") {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profileStatus]);

//   useEffect(() => {
//     setIsLoading(profileStatus === "loading");
//   }, [profileStatus]);
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/Billing",
//           { withCredentials: true }
//         );
//         setFetchedOrders(response.data.billingInfo); // Assuming the data is in billingInfo
//         console.log(response.data);

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (isLoading) {
//     return <div className="text-center mt-10 text-xl">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-[#f0f8f7] p-8">
//       <h1 className="text-4xl font-bold text-center text-[#1f7b6f] mb-8">
//         Orders List
//       </h1>
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <div className="bg-[#f7f7f7] rounded-lg p-4 mb-6 hover:bg-[#ebf0ef] transition duration-300">
//           <h2 className="text-2xl font-semibold mb-2 text-[#1a6960]">Orders</h2>
//           <p className="text-gray-700">
//             <span className="font-bold">Doctor:</span>
//             {fetchedOrders.amount}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-bold">Patient:</span>
//             {profile.users.name}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-bold">Appointment:</span>{" "}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-bold">Amount Paid:</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrdersPage;
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProfile } from "../features/Profile/ProfileSlice";
// import axios from "axios";
// import Navbar from "../components/NavBar";

// function OrdersPage() {
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.Profile.profile);
//   const profileStatus = useSelector((state) => state.Profile.status);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchedOrders, setFetchedOrders] = useState([]);

//   useEffect(() => {
//     if (!profile) {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profile]);

//   useEffect(() => {
//     if (profileStatus === "idle") {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profileStatus]);

//   useEffect(() => {
//     setIsLoading(profileStatus === "loading");
//   }, [profileStatus]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/Billing",
//           {
//             withCredentials: true,
//           }
//         );
//         console.log(response.data); // تحقق من البيانات هنا
//         setFetchedOrders(response.data.billingInfo || []); // تأكد من أن تكون مصفوفة
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (isLoading) {
//     return <div className="text-center mt-10 text-xl">Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="bg-white min-h-screen pt-20">
//         <h1 className="text-4xl font-bold text-center text-[#1f7b6f] mb-8">
//           My appointments
//         </h1>
//         <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//           <div className="bg-[#f7f7f7] rounded-lg p-4 mb-6 hover:bg-[#ebf0ef] transition duration-300">
//             <h2 className="text-2xl font-semibold mb-2 text-[#1a6960]">
//               appointments
//             </h2>
//             {fetchedOrders.length > 0 ? (
//               fetchedOrders.map((order) => (
//                 <div key={order.bill_id} className="mb-4">
//                   <p className="text-gray-700">
//                     <span className="font-bold">Doctor:</span>{" "}
//                     {order.doctor_name}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-bold">Patient:</span>{" "}
//                     {profile.users.name}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-bold">Appointment:</span>{" "}
//                     {order.appointment_start}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-bold">Amount Paid:</span>{" "}
//                     {order.amount}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-700">No orders found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrdersPage;
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProfile } from "../features/Profile/ProfileSlice";
// import axios from "axios";
// import Navbar from "../components/NavBar";
// import {
//   FaCalendarAlt,
//   FaUserMd,
//   FaUser,
//   FaClock,
//   FaDollarSign,
// } from "react-icons/fa";

// function OrdersPage() {
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.Profile.profile);
//   const profileStatus = useSelector((state) => state.Profile.status);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchedOrders, setFetchedOrders] = useState([]);

//   useEffect(() => {
//     if (!profile) {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profile]);

//   useEffect(() => {
//     if (profileStatus === "idle") {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profileStatus]);

//   useEffect(() => {
//     setIsLoading(profileStatus === "loading");
//   }, [profileStatus]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/Billing",
//           {
//             withCredentials: true,
//           }
//         );
//         setFetchedOrders(response.data.billingInfo || []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mint"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen pt-20">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold text-center text-mintD mb-12">
//             My Appointments
//           </h1>
//           <div className="max-w-4xl mx-auto">
//             {fetchedOrders.length > 0 ? (
//               fetchedOrders.map((order) => (
//                 <div
//                   key={order.bill_id}
//                   className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
//                 >
//                   <div className="flex items-center mb-4">
//                     <FaCalendarAlt className="text-3xl text-mint mr-4" />
//                     <h2 className="text-2xl font-semibold text-mintD">
//                       Appointment Details
//                     </h2>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="flex items-center">
//                       <FaUserMd className="text-xl text-mint mr-2" />
//                       <p className="text-gray-700">
//                         <span className="font-bold">Doctor:</span>{" "}
//                         {order.doctor_name}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <FaUser className="text-xl text-mint mr-2" />
//                       <p className="text-gray-700">
//                         <span className="font-bold">Patient:</span>{" "}
//                         {profile.users.name}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <FaClock className="text-xl text-mint mr-2" />
//                       <p className="text-gray-700">
//                         <span className="font-bold">Appointment:</span>{" "}
//                         {new Date(order.appointment_start).toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <FaDollarSign className="text-xl text-mint mr-2" />
//                       <p className="text-gray-700">
//                         <span className="font-bold">Amount Paid:</span> $
//                         {order.amount}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//                 <p className="text-xl text-gray-700">No appointments found.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrdersPage;
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProfile } from "../features/Profile/ProfileSlice";
// import axios from "axios";
// import Navbar from "../components/NavBar";
// import {
//   FaCalendarAlt,
//   FaUserMd,
//   FaUser,
//   FaClock,
//   FaDollarSign,
//   FaSearch,
//   FaFilter,
// } from "react-icons/fa";

// function OrdersPage() {
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.Profile.profile);
//   const profileStatus = useSelector((state) => state.Profile.status);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchedOrders, setFetchedOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 5;

//   useEffect(() => {
//     if (!profile) {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profile]);

//   useEffect(() => {
//     if (profileStatus === "idle") {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profileStatus]);

//   useEffect(() => {
//     setIsLoading(profileStatus === "loading");
//   }, [profileStatus]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/Billing",
//           {
//             withCredentials: true,
//           }
//         );
//         setFetchedOrders(response.data.billingInfo || []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const filteredOrders = fetchedOrders.filter(
//     (order) =>
//       order.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (!filterDate ||
//         new Date(order.appointment_start).toLocaleDateString() === filterDate)
//   );

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mint"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen pt-20">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold text-center text-mintD mb-12">
//             My Appointments
//           </h1>

//           {/* Search and Filter Section */}
//           <div className="max-w-4xl mx-auto mb-8">
//             <div className="bg-white shadow-md rounded-lg p-6">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                 <div className="flex items-center mb-4 md:mb-0">
//                   <FaSearch className="text-mint mr-2" />
//                   <input
//                     type="text"
//                     placeholder="Search by doctor name"
//                     className="border-2 border-mint rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <FaFilter className="text-mint mr-2" />
//                   <input
//                     type="date"
//                     className="border-2 border-mint rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint"
//                     value={filterDate}
//                     onChange={(e) => setFilterDate(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Appointments List */}
//           <div className="max-w-4xl mx-auto">
//             {currentOrders.length > 0 ? (
//               currentOrders.map((order) => (
//                 <div
//                   key={order.bill_id}
//                   className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
//                 >
//                   <div className="flex items-center mb-4">
//                     <FaCalendarAlt className="text-3xl text-mint mr-4" />
//                     <h2 className="text-2xl font-semibold text-mintD">
//                       Appointment Details
//                     </h2>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="flex items-center">
//                       <FaUserMd className="text-xl text-mint mr-2" />
//                       <p className="text-gray-700">
//                         <span className="font-bold">Doctor:</span>{" "}
//                         {order.doctor_name}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <FaUser className="text-xl text-mint mr-2" />
//                       <p className="text-gray-700">
//                         <span className="font-bold">Patient:</span>{" "}
//                         {profile.users.name}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <FaClock className="text-xl text-mint mr-2" />
//                       <p className="text-gray-700">
//                         <span className="font-bold">Appointment:</span>{" "}
//                         {new Date(order.appointment_start).toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <FaDollarSign className="text-xl text-mint mr-2" />
//                       <p className="text-gray-700">
//                         <span className="font-bold">Amount Paid:</span> $
//                         {order.amount}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//                 <p className="text-xl text-gray-700">No appointments found.</p>
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           {filteredOrders.length > ordersPerPage && (
//             <div className="flex justify-center mt-8">
//               {Array.from(
//                 { length: Math.ceil(filteredOrders.length / ordersPerPage) },
//                 (_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => paginate(i + 1)}
//                     className={`mx-1 px-4 py-2 rounded ${
//                       currentPage === i + 1
//                         ? "bg-mint text-white"
//                         : "bg-white text-mint hover:bg-mint hover:text-white"
//                     } transition duration-300`}
//                   >
//                     {i + 1}
//                   </button>
//                 )
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrdersPage;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/Profile/ProfileSlice";
import axios from "axios";
import Navbar from "../components/NavBar";
import {
  FaCalendarAlt,
  FaUserMd,
  FaUser,
  FaClock,
  FaDollarSign,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

function OrdersPage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Profile.profile);
  const profileStatus = useSelector((state) => state.Profile.status);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [dispatch, profileStatus]);

  useEffect(() => {
    setIsLoading(profileStatus === "loading");
  }, [profileStatus]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/Billing",
          {
            withCredentials: true,
          }
        );
        setFetchedOrders(response.data.billingInfo || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = fetchedOrders.filter((order) => {
    // فلترة اسم الطبيب
    const isDoctorMatch =
      searchTerm === "" ||
      order.doctor_name.toLowerCase().includes(searchTerm.toLowerCase());

    // فلترة التاريخ
    const isDateMatch =
      filterDate === "" ||
      new Date(order.appointment_start).toISOString().split("T")[0] ===
        filterDate;

    // إرجاع الطلب إذا تحقق كلا الشرطين
    return isDoctorMatch && isDateMatch;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mint"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-mintD mb-12">
            My Appointments
          </h1>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <FaSearch className="text-mint mr-2" />
                  <input
                    type="text"
                    placeholder="Search by doctor name"
                    className="border-2 border-mint rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <FaFilter className="text-mint mr-2" />
                  <input
                    type="date"
                    className="border-2 border-mint rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="max-w-4xl mx-auto">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <div
                  key={order.bill_id}
                  className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-3xl text-mint mr-4" />
                    <h2 className="text-2xl font-semibold text-mintD">
                      Appointment Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaUserMd className="text-xl text-mint mr-2" />
                      <p className="text-gray-700">
                        <span className="font-bold">Doctor:</span>{" "}
                        {order.doctor_name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="text-xl text-mint mr-2" />
                      <p className="text-gray-700">
                        <span className="font-bold">Patient:</span>{" "}
                        {profile.users.name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-xl text-mint mr-2" />
                      <p className="text-gray-700">
                        <span className="font-bold">Appointment:</span>{" "}
                        {new Date(order.appointment_start).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaDollarSign className="text-xl text-mint mr-2" />
                      <p className="text-gray-700">
                        <span className="font-bold">Amount Paid:</span> $
                        {order.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <p className="text-xl text-gray-700">No appointments found.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredOrders.length > ordersPerPage && (
            <div className="flex justify-center mt-8">
              {Array.from(
                { length: Math.ceil(filteredOrders.length / ordersPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? "bg-mint text-white"
                        : "bg-white text-mint hover:bg-mint hover:text-white"
                    } transition duration-300`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
