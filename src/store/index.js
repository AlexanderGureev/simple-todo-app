import { createStore } from "easy-peasy";

import model from "./model";
import Api from "../services/api";
import Cache from "../services/cache";

const store = createStore(model, {
  injections: { Api, cache: new Cache() },
  disableImmer: true
});

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./model", () => {
      store.reconfigure(model);
    });
  }
}
export default store;
