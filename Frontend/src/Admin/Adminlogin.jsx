import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import API from "../API";
import { Toaster, toast } from "react-hot-toast";

const Adminlogin = () => {
  const navigate = useNavigate();

  const checkAuthGmail = async (email) => {
    try {
      const response = await axios.post(`${API}/checkauthgmail`, {email});
      if (response.status === 200) {
        localStorage.setItem("adminTkn", response.data.token);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  const handleGoogleSuccess = (response) => {
    try {
      const credential = response.credential;
      const decodedToken = JSON.parse(atob(credential.split(".")[1]));
      checkAuthGmail(decodedToken.email);
    } catch (err) {
      console.log("Error decoding Google token", err);
    }
  };
  const handleGoogleFailure = () => {
    toast.error("Google Login Failed!");
  };

  return (
 <div className="min-h-screen flex items-center justify-center bg-lineara-to-br from-slate-100 to-slate-200 px-4">
  <Toaster />

  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
    <form  className="space-y-6">
      

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
          Login
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Access your account securely
        </p>
      </div>

      {/* Google Login */}
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
      </div>
    </form>
  </div>
</div>

  );
};

export default Adminlogin;