import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useUiStore, type UiStateType } from "./store/useUiStore";
import Spinner from "./components/UI/Spinner";
import { useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import { useAuthStore } from "./store/useAuthStore";
import Loader from "./components/UI/Loader";

function App() {
  const { pathname } = useLocation();
  const isGlobalLoading = useUiStore(
    (state: UiStateType) => state.isGlobalLoading
  );

  const { user, isLoading: isSessionLoading, updateSession } = useAuthStore();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      updateSession();
    });
  }, []);

  if (isSessionLoading) {
    return <Loader />;
  }

  return (
    <>
      {pathname !== "/auth" && <Navbar user={user} />}
      <Outlet />
    </>
  );
}

export default App;
