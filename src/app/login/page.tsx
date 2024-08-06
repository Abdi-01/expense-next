"use client";
import { UserContext } from "@/context/UserContext";
import { apiCall } from "@/helper/axiosInstance";
import { useRouter } from "next/navigation";
import * as React from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const router = useRouter();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const { user, setUser } = React.useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const onSubmit = async (): Promise<void> => {
    try {
      const { data } = await apiCall.post("/auth/login", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      toast(`Welcome ${data.result.email}`);
      // Menyimpan token pada localstorage
      localStorage.setItem("auth", data.result.token);

      // Menyimpan data email dan noTelp pada globalstate useContext
      setUser({ email: data.result.email, noTelp: data.result.noTelp });
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.error.message);
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
        className="w-96 bg-slate-100 m-auto shadow-lg rounded-md p-8"
      >
        <h1 className="w-full text-center font-semibold text-2xl">Login</h1>
        <div className="h-96 flex flex-col justify-between mt-16 px-8">
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

          <div className="flex gap-4">
            <button
              className="border border-slate-600 text-slate-600 p-3 w-full rounded-md shadow my-4"
              onClick={() => router.push("/register")}
            >
              Regis
            </button>
            <button
              className="bg-slate-500 text-white p-3 w-full rounded-md shadow my-4"
              onClick={onSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
