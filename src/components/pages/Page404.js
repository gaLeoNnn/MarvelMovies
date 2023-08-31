import { Link } from "react-router-dom";
import ErrorMessage from "../error/error";
const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <Link style={{ display: "block", textAlign: "center", fontWeight: "bold", fontSize: "24px" }} to="/">
        {" "}
        Back to Main page
      </Link>
    </div>
  );
};
export default Page404;
