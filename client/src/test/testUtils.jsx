import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppStore } from "../redux/AppStore";

export function renderWithProviders(ui) {
  return render(
    <Provider store={AppStore}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );
}
