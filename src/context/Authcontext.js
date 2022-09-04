import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase/firebase";

const Authcontext = React.createContext();

export function useAuth() {
  return useContext(Authcontext);
}

export function Authprovider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  //useeffect

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  //signup function

  function signup(email, password) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);

    //update profile
  }

  async function update(username) {
    const auth = getAuth();
    await updateProfile(auth.currentUser, { displayName: username });
    let user = auth.currentUser;
    setCurrentUser({ ...user });
  }

  //signin function
  function signin(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  //signout function
  function signout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signin,
    signout,
    signup,
    update,
  };

  return (
    <Authcontext.Provider value={value}>
      {!loading && children}
    </Authcontext.Provider>
  );
}
