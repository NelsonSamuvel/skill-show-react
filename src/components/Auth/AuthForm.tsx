import { useState, type FormEvent } from "react";
import { signIn, signUp } from "../../services/authService";
import MiniSpinner from "../UI/MiniSpinner";
import { useNavigate } from "react-router-dom";

type modeType = "signup" | "signin";

const AuthForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mode, setMode] = useState<modeType>("signup");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("please fill all the fields");
      return;
    }

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

      mode === "signup" ? setMode("signin") : navigate("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email ID"
                className="input"
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <button className="btn-max mt-8 flex justify-center">
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
