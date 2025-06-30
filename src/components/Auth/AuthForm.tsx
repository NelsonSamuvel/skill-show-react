import { useEffect, useState, type FormEvent } from "react";
import { signIn, signUp } from "../../services/authService";
import MiniSpinner from "../UI/MiniSpinner";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../../schema/authSchema";

type modeType = "signup" | "signin";
type FormDatatype = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const navigate = useNavigate();

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mode, setMode] = useState<modeType>("signup");

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<FormDatatype> = async (data) => {
    const { email, password } = data;

    try {
      setLoading(true);
      const { data, error } =
        mode === "signup"
          ? await signUp(email, password)
          : await signIn(email, password);
      if (error) {
        console.error(error);
        throw new Error("Authentication Failed");
      }
      alert(mode === "signup" ? "Account Created!" : "Logged in!");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset();
  }, [mode]);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="bg-surface rounded px-6 py-8 pb-12 w-full max-w-md md:max-w-lg">
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
                  disabled={loading}
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
                  disabled={loading}
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
            disabled={loading}
            type="submit"
            className="btn-max mt-8 flex justify-center"
          >
            {loading ? (
              <MiniSpinner />
            ) : mode === "signup" ? (
              "Sign up"
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          {mode === "signup"
            ? "Already have an account? "
            : "Don't have an account? "}

          <span
            className="text-green-dark cursor-pointer hover:opacity-90"
            onClick={() =>
              setMode((curMode) => (curMode === "signup" ? "signin" : "signup"))
            }
          >
            {mode === "signup" ? "login" : "signup"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default AuthForm;
