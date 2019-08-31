import { Action, createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';

export interface Project {
  name: string;
}

export interface ProjectState {
  project: Project;
}

const initialState: ProjectState = {
  project: { name: '' },
};

export const projectInitAction = createAction('[Project] Init', props<Project>());

const reducer = createReducer(initialState,
  on(projectInitAction, (state, action) => ({ ...state, project: action })),
);

export function projectReducer(state: ProjectState, action: Action) {
  return reducer(state, action);
}

export const projectFeature = (state: AppState) => state.project;

export const getProject = createSelector(projectFeature, (state: ProjectState) => state.project);
