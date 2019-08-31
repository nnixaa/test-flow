import { Action, createAction, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';

export interface Recorder {
  isRecording: boolean;
}

export interface RecorderState {
  recorder: Recorder;
}

const initialState: RecorderState = {
  recorder: { isRecording: false },
};

export const recorderStartAction = createAction('[Recorder] Start');
export const recorderStopAction = createAction('[Recorder] Stop');

const reducer = createReducer(initialState,
  on(recorderStartAction, (state) => ({ ...state, recorder: { isRecording: true } })),
  on(recorderStopAction, (state) => ({ ...state, recorder: { isRecording: false } })),
);

export function recorderReducer(state: RecorderState, action: Action) {
  return reducer(state, action);
}

export const recorderFeature = (state: AppState) => state.recorder;

export const getRecorder = createSelector(recorderFeature, (state: RecorderState) => state.recorder);
