import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { toast } from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";



export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading(
      <div className="flex items-center gap-2">
        <AiOutlineLoading3Quarters className="animate-spin" size={20} />
        <span>Sending message…</span>
      </div>
    );

    try {
      const res = await fetch(
        "https://wallcraft-website-backend.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      let data = null;
      try {
        data = await res.json();
      } catch (_) {
        // ignore parse errors
      }

      toast.dismiss(loadingId);

      if (res.ok) {
        toast.success(
          <div className="flex items-center gap-2">
            <AiOutlineCheckCircle size={20} />
            <span>Message sent successfully!</span>
          </div>
        );
        
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        
        toast.error(
          <div className="flex items-center gap-2">
            <AiOutlineCloseCircle size={20} />
            <span>Failed to send message. Try again.</span>
          </div>
        );
        
      }
    } catch (err) {
      
      toast.dismiss(loadingId);
      toast.error(
        <div className="flex items-center gap-2">
          <AiOutlineCloseCircle size={20} />
          <span>Failed to send message. Try again.</span>
        </div>
      );
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Get In Touch
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* FORM */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                />

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option value="">Select Service</option>
                  <option>Fluted Panels</option>
                  <option>PVC Panels</option>
                  <option>Wainscoting</option>
                  <option>Custom Design</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* CONTACT DETAILS */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg text-white group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+1 (416) 820-6060</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-lg text-white group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@wallcrafter.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-lg text-white group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">Hamilton, Ontario, Canada</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
