import { useEffect, useState } from "react";
import { signIn, signUp } from "../../services/authService";
import MiniSpinner from "../UI/MiniSpinner";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../../schema/authSchema";
import toast from "react-hot-toast";
import { useUiStore, type UiStateType } from "@/store/useUiStore";
import Loader from "../UI/Loader";

type modeType = "signup" | "signin";
type FormDatatype = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const navigate = useNavigate();
  const { isGlobalLoading: isLoading, setIsGlobalLoading: setIsLoading } =
    useUiStore();

  const [searchParams] = useSearchParams();
  const urlMode = searchParams.get("mode");

  const [mode, setMode] = useState<modeType>(() => {
    const modeName = localStorage.getItem("mode") as modeType | undefined;
    return modeName ? modeName : urlMode === "login" ? "signin" : "signup";
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDatatype>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormDatatype> = async (data) => {
    const { email, password } = data;

    try {
      setIsLoading(true);
      const { data, error } =
        mode === "signup"
          ? await signUp(email, password)
          : await signIn(email, password);
      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
      toast.success(mode === "signup" ? "Account Created!" : "Logged in!");

      mode === "signup" ? setMode("signin") : navigate("/", { replace: true });
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMode = () => {
    setMode((curMode) => {
      localStorage.setItem("mode", curMode == "signup" ? "signin" : "signup");
      return curMode === "signup" ? "signin" : "signup";
    });
  };

  useEffect(() => {
    reset();
  }, [mode]);

  return (
    <section className="min-h-screen flex justify-center items-center">
      {isLoading && <Loader />}
      <div className="dark:bg-surface rounded px-6 py-8 pb-12 w-full max-w-md md:max-w-lg">
        <div className="flex justify-center flex-col items-center gap-2">
          <img src="logo.svg" alt="logo" className="" />
          <p className="text-sm md:text-md text-light-gray">
            {`${
              mode === "signup" ? "Sign up" : "Login"
            } to showcase your skills`}
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
        >
          <div className="space-y-4">
            <div>
              <div className="space-y-2">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  {...register("email")}
                  placeholder="Enter your Email ID"
                  className="input"
                  autoComplete="off"
                />
              </div>
              {errors?.email ? (
                <p className="text-red-500 ml-2 text-xs mt-2">
                  {errors?.email?.message}
                </p>
              ) : null}
            </div>
            <div>
              <div className="space-y-2">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  {...register("password")}
                  className="input "
                />
              </div>
              {errors?.password ? (
                <p className="text-red-500 ml-2 text-xs mt-2">
                  {errors?.password?.message}
                </p>
              ) : null}
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="btn-max mt-8 flex justify-center"
          >
            {mode === "signup" ? "Sign up" : "Login"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          {mode === "signup"
            ? "Already have an account? "
            : "Don't have an account? "}

          <span
            className="text-green-dark cursor-pointer hover:opacity-90"
            onClick={handleMode}
          >
            {mode === "signup" ? "login" : "signup"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default AuthForm;
