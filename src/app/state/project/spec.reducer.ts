import { Action, createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { projectFeature, ProjectState } from 'src/app/state/project/project.reducer';

export interface Spec {
  id: string;
  name: string;
}

export interface SpecState extends EntityState<Spec> {}

const adapter = createEntityAdapter<Spec>();

const initialState: SpecState = adapter.getInitialState({});

export const specInitAction = createAction('[Spec] Init', props<{specList: Spec[]}>());

const reducer = createReducer(initialState,
  on(specInitAction, (state, action) => adapter.addAll(action.specList, state)),
);

export function specReducer(state: SpecState, action: Action) {
  return reducer(state, action);
}

export const specFeature = (state: AppState) => state.specs;

export const getSpecList = createSelector(specFeature, adapter.getSelectors().selectAll);
