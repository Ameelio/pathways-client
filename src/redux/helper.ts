import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { AppDispatch, RootState } from ".";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface ThunkApi {
  dispatch: AppDispatch;
  state: RootState;
}
