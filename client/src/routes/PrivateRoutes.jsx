import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user, loading
    } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen bg-gradient-to-b from-pink-200 to-pink-50">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <div className="absolute w-full h-full animate-spin rounded-full border-4 border-t-pink-500 border-pink-200"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-1/2 -translate-y-1/2">
                  <img
                    src="https://img.icons8.com/?size=100&id=49205&format=png&color=D61A79"
                    alt="Loading"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="mt-4 text-pink-600 font-semibold">Finding Your Match...</p>
            </div>
          </div>
        );
      }
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace={true}></Navigate>
};

export default PrivateRoute;