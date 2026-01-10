import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { createAppStore } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Root() {
  const [user, setUser] = React.useState(localStorage.getItem("user") || "");

  React.useEffect(() => {
    const onAuthChanged = () => {
      setUser(localStorage.getItem("user") || "");
    };

    window.addEventListener("authChanged", onAuthChanged);
    window.addEventListener("storage", onAuthChanged); // якщо відкрито 2 вкладки

    return () => {
      window.removeEventListener("authChanged", onAuthChanged);
      window.removeEventListener("storage", onAuthChanged);
    };
  }, []);

  const store = React.useMemo(() => createAppStore(user), [user]);

  return (
    <Provider store={store}>
      <App />
      <ToastContainer position="top-right" autoClose={1500} />
    </Provider>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();
