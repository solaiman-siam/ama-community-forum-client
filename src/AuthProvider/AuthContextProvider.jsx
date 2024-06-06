import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import useAxiosCommon from "../hooks/useAxiosCommon";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // google provider
  const googleProvider = new GoogleAuthProvider();

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   logOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // set current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // save current user to db
      const name = currentUser?.displayName;
      const email = currentUser?.email;
      const role = "guest";
      const date = new Date();
      const userData = { name, email, role, date };
      if (currentUser) {
        const { data } = await axiosCommon.post("/users", userData);
        console.log(data);

        const res = await axiosSecure.post("/jwt", email);
        console.log(res.data);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosCommon, axiosSecure]);

  // update profile
  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });
  };

  const authInfo = {
    user,
    loading,
    googleLogin,
    createUser,
    loginUser,
    updateUserProfile,
    logOut,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
