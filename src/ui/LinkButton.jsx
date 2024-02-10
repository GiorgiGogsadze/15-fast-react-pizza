import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const classes = "text-sm text-blue-500 hover:text-blue-600 hover:underline";
  if (to === "-1")
    return (
      <button className={classes} onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    );
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}
