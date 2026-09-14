import { useRoutes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

/* Pages */
import Forside from "./pages/Forside";
import DetaljeSide from "./pages/Detaljeside";
import Personalet from "./pages/Personalet";
import Kontakt from "./pages/Kontakt";
import Kurv from "./pages/Kurv";
import Login from "./pages/login/login";
import Backoffice from "./pages/backoffice/backoffice";

/* Basic */
import Navigation from "./components/navigation/Navigation";
import PageFooter from "./components/pageFooter/PageFooter";
import PageHeader from "./components/pageHeader/PageHeader";

/* Auth */
import { AuthProvider } from "./context/AuthProvider";

function App() {
  const location = useLocation();

  const routes = useRoutes([
    { path: "/", element: <Forside /> },
    { path: "/detaljeside/:id", element: <DetaljeSide /> },
    { path: "/personalet", element: <Personalet /> },
    { path: "/kontakt", element: <Kontakt /> },
    { path: "/kurv", element: <Kurv /> },
    { path: "/login", element: <Login /> },

    { path: "/backoffice", element: <Backoffice /> },
  ]);

  // Tjekker om brugeren befinder sig i backoffice eller på login siden, for at kunne give et simpelt layout
  const isLoginPage = location.pathname === "/login";
  const isBackoffice = location.pathname === "/backoffice";

  // Login og backoffice skal have et simpelt/minimalt layout
  const minimalLayout = isLoginPage || isBackoffice;

  return (
    <AuthProvider>
      <Navigation />

      {!minimalLayout && <PageHeader />}

      {routes}

      {!minimalLayout && <PageFooter />}

      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme='light'
      />
    </AuthProvider>
  );
}

export default App;

