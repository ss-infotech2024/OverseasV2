import { Mail } from "lucide-react";

const SubscribeSection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-white py-20 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 text-purple-700 p-3 rounded-full shadow-md">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
          Stay Informed, Stay Ahead
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-8">
          Get expert tips, visa alerts, deadline reminders, and the latest updates on study abroad programs—straight to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-72 px-5 py-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-800 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
