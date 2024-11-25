import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorById } from "../features/Doctors/doctorThunks";
import { fetchDoctorAppointments } from "../features/Doctors/doctorThunksA";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  XCircle,
  Calendar,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const {
    selectedDoctor,
    status: doctorStatus,
    error: doctorError,
  } = useSelector((state) => state.doctors);
  const {
    data: appointments,
    status: appointmentsStatus,
    error: appointmentsError,
  } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchDoctorById(id));
    dispatch(fetchDoctorAppointments(id));
    fetchFeedback();
  }, [dispatch, id]);

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${id}`);
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/feedback`,
        {
          doctor_id: id,
          comment: feedback,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setFeedback("");
        fetchFeedback();
        Swal.fire({
          title: "Feedback Submitted",
          text: "Thank you for your feedback!",
          icon: "success",
          confirmButtonColor: "#10B981",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit feedback. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const handleBookAppointment = (appointment) => {
    Swal.fire({
      title: "Confirm Booking",
      text: "Are you sure you want to book this appointment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const bookingDetails = {
          doctor: {
            name: selectedDoctor.name,
            email: selectedDoctor.email,
            gender: selectedDoctor.gender,
            profile_image:
              selectedDoctor.profile_image || "/default-doctor-image.jpg",
          },
          appointment: {
            start_time: appointment.start_time,
            end_time: appointment.end_time,
            is_available: appointment.is_available,
          },
        };
        Cookies.set("bookedAppointment", JSON.stringify(bookingDetails), {
          expires: 7,
        });
        navigate("/checkout");
      }
    });
  };

  const filterAppointments = () => {
    if (!Array.isArray(appointments)) return [];
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.start_time);
      return (
        appointmentDate.toDateString() === selectedDate.toDateString() &&
        (!selectedTimeSlot ||
          (appointmentDate.getHours() >= selectedTimeSlot[0] &&
            appointmentDate.getHours() < selectedTimeSlot[1]))
      );
    });
  };

  const filteredAppointments = filterAppointments();

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  if (doctorStatus === "loading" || appointmentsStatus === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen bg-gray-100"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-mintD"></div>
      </motion.div>
    );
  }

  if (doctorStatus === "failed" || appointmentsStatus === "failed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <XCircle className="text-red-500 w-16 h-16 mb-4" />
        <p className="text-xl text-gray-800">
          Error: {doctorError || appointmentsError}
        </p>
      </motion.div>
    );
  }

  if (!selectedDoctor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <User className="text-gray-400 w-16 h-16 mb-4" />
        <p className="text-xl text-gray-800">No doctor found.</p>
      </motion.div>
    );
  }

  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen "
      >
        <div className="container mx-auto py-12 px-4 mt-20">
          <div className="bg-mintD rounded-lg shadow-md mb-8 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={
                  selectedDoctor.profile_image || "/default-doctor-image.jpg"
                }
                alt={selectedDoctor.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-8"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {selectedDoctor.name}
                </h1>
                <div className="flex items-center mb-2">
                  <Clock className="text-mintL mr-1" size={20} />
                  <span className="text-xl">
                    {selectedDoctor.years_of_exprience} years
                  </span>
                </div>
                <p className="text-lg mb-2">{selectedDoctor.specialization}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <p className="flex items-center">
                    <Mail className="mr-2 text-mintL" size={18} />{" "}
                    {selectedDoctor.email}
                  </p>
                  <p className="flex items-center">
                    <User className="mr-2 text-mintL" size={18} />{" "}
                    {selectedDoctor.gender}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md mb-8 p-8">
            <h2 className="text-2xl font-semibold mb-4">
              About Dr. {selectedDoctor.name}
            </h2>
            <p className="text-gray-700">
              {selectedDoctor.bio || "No bio available."}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md mb-8 p-8">
            <h2 className="text-3xl font-bold text-mintD mb-6">
              Book an Appointment
            </h2>
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button
                  onClick={() => changeDate(-1)}
                  className="p-2 rounded-full bg-mintL hover:bg-mintD transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="text-xl font-semibold">
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }).format(selectedDate)}
                </div>
                <button
                  onClick={() => changeDate(1)}
                  className="p-2 rounded-full bg-mintL hover:bg-mintD transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <select
                onChange={(e) =>
                  setSelectedTimeSlot(JSON.parse(e.target.value))
                }
                className="border border-gray-300 rounded-lg p-2 bg-mintL"
              >
                <option value="">Select a time slot</option>
                <option value="[9,10]">9:00 AM - 10:00 AM</option>
                <option value="[10,11]">10:00 AM - 11:00 AM</option>
                <option value="[11,12]">11:00 AM - 12:00 PM</option>
                <option value="[13,14]">1:00 PM - 2:00 PM</option>
                <option value="[14,15]">2:00 PM - 3:00 PM</option>
                <option value="[15,16]">3:00 PM - 4:00 PM</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`bg-white rounded-lg shadow-md p-4 ${
                    appointment.is_available ? "bg-mintL" : "bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Calendar className="mr-2 text-mintD" size={18} />
                      <p className="text-lg font-semibold">
                        {new Date(appointment.start_time).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}{" "}
                        -{" "}
                        {new Date(appointment.end_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        appointment.is_available
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {appointment.is_available ? "Available" : "Not Available"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBookAppointment(appointment)}
                    className={`w-full py-2 px-4 rounded-md text-white ${
                      appointment.is_available
                        ? "bg-mintD hover:bg-mint"
                        : "bg-gray-400 cursor-not-allowed"
                    } transition-colors`}
                    disabled={!appointment.is_available}
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-mintL rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-mintD mb-6">
              Feedback for Dr. {selectedDoctor.name}
            </h2>
            <form onSubmit={handleSubmitFeedback} className="mb-6">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                rows="4"
                placeholder="Leave your feedback here..."
                required
              />
              <button
                type="submit"
                className="bg-mintD text-white py-2 px-4 rounded-md hover:bg-mint transition-colors"
              >
                Submit Feedback
              </button>
            </form>

            {feedbackList.length > 0 ? (
              <div className="space-y-4">
                {feedbackList.map((item) => (
                  <div
                    key={item.feedback_id}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        <span className="text-xl font-semibold text-gray-600">
                          {item.patient_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{item.patient_name}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{item.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No feedback available.</p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DoctorDetails;
