import {
  Action, ActionReducer, ActionReducerMap, MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { projectReducer, ProjectState } from 'src/app/state/project/project.reducer';
import { specReducer, SpecState } from 'src/app/state/project/spec.reducer';
import { testReducer, TestState } from './project/test.reducer';
import { commandReducer, CommandState } from './project/command.reducer';
import { recorderReducer, RecorderState } from 'src/app/state/project/recorder.reducer';

export const nextId = () => `${new Date().getTime() + Math.random()}`;

export interface AppState {
  project: ProjectState;
  specs: SpecState;
  tests: TestState;
  commands: CommandState;
  recorder: RecorderState;
}

export const reducers: ActionReducerMap<AppState> = {
  project: projectReducer,
  specs: specReducer,
  tests: testReducer,
  commands: commandReducer,
  recorder: recorderReducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: Action): AppState => {
    const result = reducer(state, action);

    console.groupCollapsed(action.type);
    // tslint:disable-next-line
    console.info('prev state', state);
    // tslint:disable-next-line
    console.info('action', action);
    // tslint:disable-next-line
    console.info('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [logger];
