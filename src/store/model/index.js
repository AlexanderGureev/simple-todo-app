import { action } from "easy-peasy";
import { authModel } from "./auth";
import { categoryModel } from "./category";
import { filterModel } from "./filter";
import { profileModel } from "./profile";
// import { statisticsModel } from "./statistics";
import { todoModel } from "./todo";
import { fileModel } from "./file";

const actions = {
  resetState: action(() => ({
    ...model
  }))
};

const model = {
  session: authModel,
  category: categoryModel,
  filter: filterModel,
  profile: profileModel,
  // statistics: statisticsModel,
  todo: todoModel,
  file: fileModel,
  ...actions
};

export default model;
