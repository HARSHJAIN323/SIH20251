import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Student ERP System</h1>
        <nav>
          <ul className="flex gap-6 text-gray-700">
            <li><a href="#about" className="hover:text-blue-600">About</a></li>
            <li><a href="#features" className="hover:text-blue-600">Features</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          ERP-based Integrated Student Management System
        </h2>
        <p className="max-w-3xl mx-auto text-lg">
          Streamlined admissions, fee collection, hostel allocation, and real-time dashboards — 
          bringing automation and transparency to educational institutions.
        </p>
        <div className="mt-6">
          <a
            href="#features"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg shadow hover:bg-gray-200 font-semibold"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Admissions</h4>
            <p>Online admission intake with a unified database and automated workflows.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Fee Collection</h4>
            <p>Automated receipts, real-time transactions, and secure digital payments.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Hostel & Exams</h4>
            <p>Live hostel occupancy tracking and exam records in a central system.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16 px-6">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-8">About the Problem Statement</h3>
        <div className="max-w-4xl mx-auto text-center text-gray-700">
          <p>
            Proposed by the <strong>Government of Rajasthan</strong>, under the{" "}
            <strong>Directorate of Technical Education (DTE)</strong>. The system 
            focuses on <strong>Smart Automation</strong> to unify admission, hostel, fee, and exam management 
            into one integrated ERP solution.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-4">Get in Touch</h3>
        <p className="text-gray-700">For more details, contact the organizing team or visit DTE official site.</p>
        <div className="mt-6">
          <a
            href="mailto:info@example.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center p-4 mt-10">
        © 2025 Student ERP Hackathon Project | Team XYZ
      </footer>
    </div>
  );
};

export default HomePage;
