import error from "../../resources/error.gif";

const ErrorMessage = () => {
  return <img src={error} style={{ display: "block", margin: "0 auto", width: 200, height: 200 }} alt="error" />;
};
export default ErrorMessage;
