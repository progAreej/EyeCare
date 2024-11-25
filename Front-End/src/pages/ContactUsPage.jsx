// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Loader2, Send } from "lucide-react";
// import {
//   submitContactForm,
//   resetContactForm,
// } from "../features/Contact us/ContactAction";

// const ContactUsPage = () => {
//   const dispatch = useDispatch();
//   const { isSubmitting, isSubmitted, error } = useSelector(
//     (state) => state.contact
//   );
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(submitContactForm(formData));
//   };

//   const handleReset = () => {
//     setFormData({ name: "", email: "", message: "" });
//     dispatch(resetContactForm());
//   };

//   return (
//     <div className="min-h-screen bg-[#F0FFF4] flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card className="w-full max-w-md bg-white shadow-lg">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-mint">
//               Contact Us
//             </CardTitle>
//             <CardDescription>We'd love to hear from you!</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div>
//                   <Input
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full border-[#98FB98] focus:border-mintL"
//                     required
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="Your Email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full border-[#98FB98] focus:border-mint"
//                     required
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div>
//                   <Textarea
//                     name="message"
//                     placeholder="Your Message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className="w-full border-[#98FB98] focus:border-mint"
//                     required
//                     disabled={isSubmitting}
//                   />
//                 </div>
//               </div>
//               <CardFooter className="flex justify-end mt-4 space-x-2">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={handleReset}
//                     disabled={isSubmitting}
//                   >
//                     Reset
//                   </Button>
//                 </motion.div>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     type="submit"
//                     className="bg-mint hover:bg-[#45a049]"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     ) : (
//                       <Send className="mr-2 h-4 w-4" />
//                     )}
//                     {isSubmitting ? "Sending..." : "Send Message"}
//                   </Button>
//                 </motion.div>
//               </CardFooter>
//             </form>
//           </CardContent>
//         </Card>
//         <AnimatePresence>
//           {isSubmitted && !error && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Alert className="mt-4 bg-mint text-white">
//                 <AlertDescription>
//                   Thank you for your message! We'll get back to you soon.
//                 </AlertDescription>
//               </Alert>
//             </motion.div>
//           )}
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Alert className="mt-4 bg-red-500 text-white">
//                 <AlertDescription>
//                   Error: {error}. Please try again.
//                 </AlertDescription>
//               </Alert>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default ContactUsPage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../assets/undraw_contact_us_re_4qqt.svg";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Send } from "lucide-react";
import {
  submitContactForm,
  resetContactForm,
} from "../features/Contact us/ContactAction";

const ContactUsPage = () => {
  const dispatch = useDispatch();
  const { isSubmitting, isSubmitted, error } = useSelector(
    (state) => state.contact
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  // const handleReset = () => {
  //   setFormData({ name: "", email: "", message: "" });
  //   dispatch(resetContactForm());
  // };

  return (
    <>
      <div className=" w-[750px]wrapper flex items-center justify-center">
        <div className="">
          <img className="w-[38rem]" src={image} alt="" />
        </div>

        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
          <h1 className=" text-4xl text-center text font-bold text-[#0a3d62] mb-6">
            Message Us
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <Card className="w-full bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label
                          htmlFor="name"
                          className="block w text-sm font-medium text-gray-700 mb-1"
                        >
                          Your name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-96  border-[#4cbb7e] focus:border-[#3cb371] focus-visible:ring-[#3cb371]"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full  border-[#4cbb7e] focus:border-[#3cb371] focus-visible:ring-[#3cb371]"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="comments"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Comments
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full border-[#4cbb7e] focus:border-[#3cb371] focus-visible:ring-[#3cb371]"
                        rows={6}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      type="submit"
                      className="w-full bg-[#3cb371] hover:bg-[#2e8b57] text-white font-semibold py-2 px-4 rounded"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {isSubmitting ? "Sending..." : "SUBMIT"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <AnimatePresence>
              {isSubmitted && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Alert className="mt-4 bg-[#3cb371] text-white">
                    <AlertDescription>
                      Thank you for your message! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Alert className="mt-4 bg-green-500 text-white">
                    <AlertDescription>
                      Thank you for your message! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
