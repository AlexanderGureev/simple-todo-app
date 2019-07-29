import { createStore } from "easy-peasy";
import model from "./model";
import Api from "../services/api";

export default initialModel =>
  createStore(initialModel || model, {
    injections: { Api }
  });
