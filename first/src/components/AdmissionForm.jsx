import React, { useState } from "react";

const AdmissionForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    fatherName: "",
    motherName: "",
    studentEmail: "",
    parentEmail: "",
    studentContact: "",
    parentContact: "",
    Paddress: "",
    Caddress: "",
    ScoreOf10th: "",
    ScoreOf12th: "",
    markesheet10th: null,
    markesheet12th: null,
    appliedCourse: "",
    fatherOccupation: "",
    aadharCardNo: "",
    aadharCardFile: null,
    TC: null,
    photo: null,
    signature: null,
    Hostel: false,
    Transport: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  // Step labels
  const steps = ["Student Info", "Contact & Address", "Academics & Docs", "Course & Options"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Student Admission Form
        </h1>

        {/* Progress Bar */}
        <div className="flex justify-between mb-8">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`flex-1 text-center text-sm font-medium ${
                step === index + 1
                  ? "text-blue-600"
                  : step > index + 1
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  step === index + 1
                    ? "bg-blue-600 text-white"
                    : step > index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              {label}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Father’s Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Mother’s Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">Student Email</label>
                <input
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Parent Email</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Student Contact</label>
                <input
                  type="number"
                  name="studentContact"
                  value={formData.studentContact}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Parent Contact</label>
                <input
                  type="number"
                  name="parentContact"
                  value={formData.parentContact}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Permanent Address</label>
                <textarea
                  name="Paddress"
                  value={formData.Paddress}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Current Address</label>
                <textarea
                  name="Caddress"
                  value={formData.Caddress}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">10th Score (%)</label>
                <input
                  type="number"
                  name="ScoreOf10th"
                  value={formData.ScoreOf10th}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">12th Score (%)</label>
                <input
                  type="number"
                  name="ScoreOf12th"
                  value={formData.ScoreOf12th}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">10th Marksheet</label>
                <input
                  type="file"
                  name="markesheet10th"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">12th Marksheet</label>
                <input
                  type="file"
                  name="markesheet12th"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Aadhar Card No.</label>
                <input
                  type="text"
                  name="aadharCardNo"
                  value={formData.aadharCardNo}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Upload Aadhar</label>
                <input
                  type="file"
                  name="aadharCardFile"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Transfer Certificate (TC)</label>
                <input
                  type="file"
                  name="TC"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Upload Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Upload Signature</label>
                <input
                  type="file"
                  name="signature"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">Course Applied</label>
                <input
                  type="text"
                  name="appliedCourse"
                  value={formData.appliedCourse}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Father’s Occupation</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="Hostel"
                  checked={formData.Hostel}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label>Require Hostel?</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="Transport"
                  checked={formData.Transport}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label>Require Transport?</label>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
