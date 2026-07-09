import { Header } from "../components/Header";
import './404.css';
import { NavLink } from "react-router";

export function NotFound() {
  return (
    <>
      <Header />
      <div className="not-found-page">
        <p>Page not found</p>
        <NavLink to="/">
          <button>
            Back to Home
          </button>
        </NavLink>
      </div>
    </>
  );
}