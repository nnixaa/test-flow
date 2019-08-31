import { Action, createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface Spec {
  id: string;
  name: string;
}

export interface SpecState extends EntityState<Spec> {}

const adapter = createEntityAdapter<Spec>();

const initialState: SpecState = adapter.getInitialState({});

export const specInitAction = createAction('[Spec] Init', props<{specList: Spec[]}>());
export const specAddAction = createAction('[Spec] Add', props<{spec: Spec}>());

const reducer = createReducer(initialState,
  on(specInitAction, (state, action) => adapter.addAll(action.specList, state)),
  on(specAddAction, (state, action) => adapter.addOne(action.spec, state)),
);

export function specReducer(state: SpecState, action: Action) {
  return reducer(state, action);
}

export const specFeature = (state: AppState) => state.specs;

export const getSpecList = createSelector(specFeature, adapter.getSelectors().selectAll);
