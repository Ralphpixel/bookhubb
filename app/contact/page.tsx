"use client";

import { Formik, Form, Field } from "formik";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Contact Us
        </h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await addDoc(collection(db, "contactMessages"), {
                name: values.name,
                email: values.email,
                message: values.message,
                createdAt: serverTimestamp(),
              });

              resetForm();
              alert("Message sent successfully!");
            } catch (error) {
              console.error("Firebase error:", error);
              alert("Something went wrong. Try again.");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* NAME */}
              <Field
                name="name"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* EMAIL */}
              <Field
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* MESSAGE */}
              <Field
                as="textarea"
                name="message"
                placeholder="Your message"
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}