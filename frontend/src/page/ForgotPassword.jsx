import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // ফ্লো ট্র্যাকিং স্টেট: 1 = Email, 2 = OTP, 3 = New Password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  // অ্যালার্ট মেসেজ দেখানোর হেল্পার
  const showAlert = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // ধাপ ১: ইমেইল সাবমিট এবং ওটিপি পাঠানো
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        { email },
      );
      if (data.success) {
        showAlert("success", "আপনার ইমেইলে ওটিপি কোড পাঠানো হয়েছে।");
        setStep(2);
      }
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "কোড পাঠাতে ব্যর্থ হয়েছে।",
      );
    } finally {
      setLoading(false);
    }
  };

  // ধাপ ২: ওটিপি যাচাই এবং রিসেট টোকেন গ্রহণ
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/verify-otp",
        { email, otp },
      );
      console.log(data, "reset");

      if (data.success) {
        setResetToken(data.payload.resetToken); // টোকেনটি সেভ করে রাখা হচ্ছে
        showAlert("success", "ওটিপি সফলভাবে যাচাই করা হয়েছে।");
        setStep(3);
      }
    } catch (error) {
      showAlert("error", error.response?.data?.message || "ভুল ওটিপি কোড।");
    } finally {
      setLoading(false);
    }
  };

  // ধাপ ৩: নতুন পাসওয়ার্ড সেভ করা
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return showAlert("error", "পাসওয়ার্ড দুটি মিলছে না!");
    }
    setLoading(true);
    try {
      const { data } = await axios.put(
        "http://localhost:5000/auth/reset-password",
        { resetToken, newPassword },
      );
      if (data.success) {
        showAlert(
          "success",
          "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে। এখন লগইন করুন।",
        );
        // রিসেট সফল হলে ফর্ম ফ্লাশ এবং ধাপ ১ এ ব্যাক

        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/login");
          setStep(1);
        }, 2000);
      }
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে।",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8 dark">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-gray-800 p-8 shadow-xl border border-gray-700">
        {/* হেডার সেকশন */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            {step === 1 && "পাসওয়ার্ড ভুলে গেছেন?"}
            {step === 2 && "ওটিপি যাচাই করুন"}
            {step === 3 && "নতুন পাসওয়ার্ড সেট করুন"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {step === 1 && "আপনার রেজিস্টার্ড ইমেইলটি নিচে ইনপুট দিন।"}
            {step === 2 && `আমরা ${email} ইমেইলে একটি কোড পাঠিয়েছি।`}
            {step === 3 && "আপনার নতুন সুরক্ষিত পাসওয়ার্ডটি টাইপ করুন।"}
          </p>
        </div>

        {/* ডাইনামিক অ্যালার্ট মেসেজ */}
        {message.text && (
          <div
            className={`p-4 rounded-lg text-sm text-center font-medium ${
              message.type === "success"
                ? "bg-green-900/50 text-green-300 border border-green-700"
                : "bg-red-900/50 text-red-300 border border-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* ধাপ ১: ইমেইল ফর্ম */}
        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleSendOTP}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                ইমেইল অ্যাড্রেস
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                placeholder="example@mail.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "কোড পাঠানো হচ্ছে..." : "ওটিপি কোড পাঠান"}
            </button>
          </form>
        )}

        {/* ধাপ ২: ওটিপি ফর্ম */}
        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-300"
              >
                ৬ ডিজিটের ওটিপি কোড
              </label>
              <input
                id="otp"
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white tracking-widest text-center font-bold text-xl placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="0 0 0 0 0 0"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                ইমেইল পরিবর্তন করুন
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              {loading ? "যাচাই করা হচ্ছে..." : "ওটিপি নিশ্চিত করুন"}
            </button>
          </form>
        )}

        {/* ধাপ ৩: নতুন পাসওয়ার্ড ফর্ম */}
        {step === 3 && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  নতুন পাসওয়ার্ড
                </label>
                <input
                  id="newPassword"
                  type="password"
                  required
                  minLength="6"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  কনফার্ম পাসওয়ার্ড
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  minLength="6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
            >
              {loading ? "পাসওয়ার্ড আপডেট হচ্ছে..." : "পাসওয়ার্ড রিসেট করুন"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
