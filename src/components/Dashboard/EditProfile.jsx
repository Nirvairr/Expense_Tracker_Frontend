import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";

const EditProfile = () => {
  const { updateUser } = useContext(UserContext);
  const [image, setImage] = useState({ file: null, url: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const id = localStorage.getItem("user");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user info on first load
  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      if (response.data) {
        setDashboardData(response.data);
        setName(response.data.fullName || "");
        setEmail(response.data.email || "");
        setImage({
          file: null,
          url: response.data.profileImageUrl || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage({ file, url: imageUrl });
    }
  };
  console.log(dashboardData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let profileImageUrl = image.url;

      // Upload new image if selected
      if (image.file) {
        const imgUploadRes = await uploadImage(image.file);
        profileImageUrl = imgUploadRes.imageUrl || image.url;
      }

      // Prepare payload
      const payload = {
        fullName: name,
        email,
        profileImageUrl,
      };

      if (password.trim() !== "") {
        payload.password = password;
      }

      const response = await axios.post(
        `https://expense-tracker-backend-hp7a.onrender.com/api/v1/auth/edituser/${id}`,
        payload
      );

      navigate("/dashboard");
      console.log(response);
      updateUser(response.user);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <main className="bg-white w-full max-w-3xl p-10 rounded-lg shadow-md relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-blue-500 font-semibold hover:text-blue-700"
        >
          &lt; Back
        </button>

        <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shadow-inner mb-4">
              {image.url ? (
                <img
                  src={image.url}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <div className="flex justify-center items-center h-full text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition text-sm"
            >
              Select Photo
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-1">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
