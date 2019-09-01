import { authModel } from "./auth";
import { categoryModel } from "./category";
import { filterModel } from "./filter";
import { profileModel } from "./profile";
import { statisticsModel } from "./statistics";
import { todoModel } from "./todo";
import { commonModel } from "./common";

export default {
  session: {
    ...authModel,
    ...categoryModel,
    ...filterModel,
    ...profileModel,
    ...statisticsModel,
    ...todoModel,
    ...commonModel
  }
};
