import { ConfirmAlert, ErrorAlert, SuccessAlert } from "./components";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <>
      <ConfirmAlert />
      <SuccessAlert />
      <ErrorAlert />
      <Routes />
    </>
  );
};

export default App;
