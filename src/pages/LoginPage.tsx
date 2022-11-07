import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import logo from "../assets/images/chat-app-logo.png";
import { Toast } from "../components/Toast";
import { auth, db } from "../firebase/firebase";
import { ToastType } from "../utils/enums/toast.enum";

function LoginPage() {
  const [pageMode, setPageMode] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSignin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          navigate("/");
          formik.resetForm();
        }
        // ...
      })
      .catch((error) => {
        setShowToast(true);
      });
  };
  const handleSignUp = async (email: string, password: string, displayName: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if (user && auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: displayName });
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: formik.values.email,
          displayName: formik.values.displayName,
          avatar: "",
        });
        await setDoc(doc(db, "conversations", res.user.uid), {});

        formik.resetForm();
        setPageMode(1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      password: "",
      "re-password": "",
    },
    validateOnBlur: true,
    validationSchema: Yup.object().shape(
      pageMode !== 1
        ? {
            displayName: Yup.string().required("Display name is required").min(5, "Display name must be at least 5 characters"),
            email: Yup.string().required("Email is required").email("Invalid email"),
            password: Yup.string().required("Password is required").min(5, "Password must have min 5 characters"),
            "re-password": Yup.string()
              .required("Confirm password is required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          }
        : {
            email: Yup.string().required("Email is required").email("Invalid email"),
            password: Yup.string().required("Password is required").min(5, "Password must have min 5 characters"),
          }
    ),
    onSubmit: (values) => {
      pageMode === 1 ? handleSignin(values.email, values.password) : handleSignUp(values.email, values.password, values.displayName);
    },
  });

  return (
    <div className="bg-light-green w-full h-full flex justify-center flex-col relative">
      <div className="bg-white xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full px-3 py-5 self-center text-center rounded-md shadow-lg">
        <img src={logo} alt="logo" width={100} height={100} className="mx-auto" />
        <div className="text-2xl font-semibold text-slate-800">{pageMode === 1 ? "Welcome Back" : "Sign Up Your Account"}</div>
        <div className="text-gray-400 text-base my-2">{pageMode === 1 ? "Enter your credentials to access your account" : "Fill up the information for registering"}</div>
        <form className="mx-auto p-4" onSubmit={formik.handleSubmit}>
          {/* email field */}
          <div className="relative mb-7">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring focus:ring-gray-200"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && <p className="absolute mt-1 text-xs text-red-400">{formik.errors.email}</p>}
          </div>
          {/* Display name field */}
          {pageMode !== 1 && (
            <div className="relative mb-7">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="displayName"
                name="displayName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring focus:ring-gray-200"
                placeholder="Enter your display name"
                onChange={formik.handleChange}
                value={formik.values.displayName}
              />
              {formik.touched.displayName && <p className="absolute mt-1 text-xs text-red-400">{formik.errors.displayName}</p>}
            </div>
          )}
          {/* Password field */}
          <div className="relative mb-7">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring focus:ring-gray-200"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && <p className="absolute mt-1 text-xs text-red-400">{formik.errors.password}</p>}
          </div>
          {/* Confirm password field */}
          {pageMode !== 1 && (
            <div className="relative mb-7">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                id="re-password"
                name="re-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring focus:ring-gray-200"
                placeholder="Confirm your password"
                onChange={formik.handleChange}
                value={formik.values["re-password"]}
              />
              {formik.touched["re-password"] && <p className="absolute mt-1 text-xs text-red-400">{formik.errors["re-password"]}</p>}
            </div>
          )}
          {/* Submit button */}
          <button type="submit" className="text-white bg-green hover:bg-green-hover-lighter focus:ring-4 w-full font-medium rounded-lg text-sm px-5 py-2.5 mr-2 uppercase">
            {pageMode === 1 ? "SIGN IN" : "SIGN UP"}
          </button>
          {pageMode === 1 ? (
            <div className="text-sm text-zinc-600 mt-3">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setPageMode(2);
                  formik.resetForm();
                }}>
                Sign up
              </span>
            </div>
          ) : (
            <div className="text-sm text-zinc-600 mt-3">
              Have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setPageMode(1);
                  formik.resetForm();
                }}>
                Sign in
              </span>
            </div>
          )}
        </form>
      </div>
      <Toast type={ToastType.ERROR} text="Wrong username or password!" show={showToast} setShow={setShowToast} />
    </div>
  );
}

export default LoginPage;
