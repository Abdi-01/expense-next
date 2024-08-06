"use client";
import { UserContext } from "@/context/UserContext";
import { apiCall } from "@/helper/axiosInstance";
import { useRouter } from "next/navigation";
import * as React from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";

interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  const router = useRouter();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

  const { user } = React.useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const onSubmit = async (): Promise<void> => {
    try {
      if (passwordRef.current?.value === confirmPasswordRef.current?.value) {
        const regis = await apiCall.post("/auth/regis", {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        });
        toast(regis.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (user?.email) {
      router.replace("/");
    }
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1500);
  }, [user, isAuthenticated]);

  if (!isAuthenticated) {
    return <p className="text-center text-5xl my-8">LOADING</p>;
  }

  return (
    <div className="bg-slate-50 h-screen flex items-center">
      <div
        id="container"
        className="w-4/12 bg-slate-100 m-auto shadow-lg rounded-md p-8"
      >
        <h1 className="w-full text-center font-semibold text-2xl">
          Create Your Account
        </h1>
        <div className="h-96 flex flex-col justify-between mt-16 px-24">
          <div>
            <label className="block text-xl my-2">Email</label>
            <input
              className="w-full p-2 rounded-md flex-1"
              type="text"
              ref={emailRef}
            />
          </div>
          <div>
            <label className="block text-xl my-2">Password</label>
            <div className="relative flex items-center">
              <input
                className="w-full p-2 rounded-md flex-1"
                type={isVisible ? "text" : "password"}
                ref={passwordRef}
              />
              <button
                className="absolute right-4"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <MdVisibility size={24} />
                ) : (
                  <MdVisibilityOff size={24} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xl my-2">Confirmation Password</label>
            <div className="relative flex items-center">
              <input
                className="w-full p-2 rounded-md flex-1"
                type={isVisible ? "text" : "password"}
                ref={confirmPasswordRef}
              />
              <button
                className="absolute right-4"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <MdVisibility size={24} />
                ) : (
                  <MdVisibilityOff size={24} />
                )}
              </button>
            </div>
          </div>
          <button
            className="bg-slate-500 text-white p-3 w-full rounded-md shadow my-4"
            onClick={onSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
