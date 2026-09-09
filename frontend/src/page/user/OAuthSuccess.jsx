import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { userProfileData } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // কুকিতে টোকেন থাকায় সরাসরি প্রোফাইল এপিআই কল করা যাবে
        const user = await userProfileData();

        if (user) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("OAuth প্রোফাইল লোড এরর:", error);
        navigate("/login");
      }
    };

    loadProfile();
  }, [navigate, userProfileData]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h3>লগইন সফল হয়েছে, প্রোফাইল লোড হচ্ছে...</h3>
    </div>
  );
};

export default OAuthSuccess;
