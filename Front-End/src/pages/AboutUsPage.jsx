import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-mintL min-h-screen p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-mintD mb-8 text-center">
          About EYECARE
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-mint">
              What is EYECARE?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-mint">
            <p>
              EYECARE is an innovative web application designed to enhance eye
              care and vision management. Our platform provides comprehensive
              features for managing patient records, scheduling appointments,
              handling billing, and facilitating communication between
              healthcare providers and patients.
            </p>
            <p className="mt-4">
              Our mission is to streamline hospital operations, improve patient
              care, and offer a seamless experience for both medical staff and
              patients.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold text-mint mb-4">
          Why Choose EYECARE?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Efficient Patient Management",
              description:
                "Easily create, edit, and manage patient records, including medical histories and treatment plans.",
            },
            {
              title: "Appointment Scheduling",
              description:
                "Simplify the booking, rescheduling, and cancellation of appointments with a user-friendly calendar interface.",
            },
            {
              title: "Billing and Payments",
              description:
                "View and manage medical bills with secure payment options, ensuring a smooth billing experience.",
            },
            {
              title: "Healthcare Provider Tools",
              description:
                "Access and update staff schedules, patient records, and appointment details efficiently.",
            },
            {
              title: "Patient Engagement",
              description:
                "Allow patients to access their health information, book appointments, and provide feedback on services.",
            },
            {
              title: "Enhanced Communication",
              description:
                "Facilitate direct communication between healthcare providers and patients for better care coordination.",
            },
            {
              title: "Administrative Oversight",
              description:
                "Admins can manage roles, permissions, user reports, and system operations effectively.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-mint">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-mint-500">
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <Button className="bg-mint hover:bg-mint text-white">
            Get Started with EYECARE
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
