import { createStore } from "easy-peasy";
import model from "./model";
import Api from "../services/api";
import Cache from "../services/cache";

export default initialModel =>
  createStore(initialModel || model, {
    injections: { Api, cache: new Cache() }
  });
