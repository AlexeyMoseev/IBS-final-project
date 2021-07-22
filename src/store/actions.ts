import * as AppThunksCreators from "./app/thunks";
import * as DataActionCreators from "./data/actions";
import * as DataThunksCreators from "./data/thunks";

export const ActionCreators = {
  ...AppThunksCreators,
  ...DataActionCreators,
  ...DataThunksCreators,
};
