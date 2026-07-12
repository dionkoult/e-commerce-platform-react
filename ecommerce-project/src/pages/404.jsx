import { Header } from "../components/Header";
import './404.css';
import { Link } from "react-router";

export function NotFound({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <div className="not-found-page">
        <p>Page not found</p>
        <Link to="/">
          <button>
            Back to Home
          </button>
        </Link>
      </div>
    </>
  );
}