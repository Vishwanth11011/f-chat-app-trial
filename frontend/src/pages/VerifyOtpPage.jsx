import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { verifyOtp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    setIsVerifying(true);
    try {
      await verifyOtp(otp);
      toast.success("Verification successful! You are now signed in.");
      navigate("/"); // Redirect to homepage or dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Verify Your Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
        <input
          type="text"
          maxLength={6}
          className="input input-bordered w-full text-center text-xl tracking-widest"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;