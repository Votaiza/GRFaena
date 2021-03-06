import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { AppRouter } from "./routers/AppRouter";

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  );
};