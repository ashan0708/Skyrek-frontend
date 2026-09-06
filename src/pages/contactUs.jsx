export default function ContactUs() {
  return (
    <div className="min-h-screen bg-primary text-secondary">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-center mb-4">
          Contact Us
        </h1>

        <p className="text-center mb-12">
          Have a question? We would love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Get In Touch
            </h2>

            <p className="mb-4">
              📍 Colombo, Sri Lanka
            </p>

            <p className="mb-4">
              📞 +94 11 234 5678
            </p>

            <p className="mb-4">
              📧 support@icomputers.lk
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              Opening Hours
            </h3>

            <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
            <p>Sunday: 10:00 AM - 4:00 PM</p>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg text-black"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg text-black"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 rounded-lg text-black"
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full p-3 rounded-lg text-black"
              ></textarea>

              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-black text-white border-2 border-black font-semibold hover:bg-transparent hover:text-black transition duration-300"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>

      </div>

    </div>
  );
}