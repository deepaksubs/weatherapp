import { Action } from '@ngrx/store';

export const initialState = '';
export const location = 'location';

export function locations(state = initialState, action: any) {
  switch (action.type) {
    case location:
        state = action.payload;
        return state;
    default:
        return state;
  }
}
