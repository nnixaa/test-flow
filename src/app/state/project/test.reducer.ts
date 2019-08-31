import { Action, createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Spec } from './spec.reducer';

export interface Test {
  id: string;
  name: string;
  spec: Spec;
}

export interface TestState extends EntityState<Test> {}

const adapter = createEntityAdapter<Test>();

const initialState: TestState = adapter.getInitialState({});

export const testInitAction = createAction('[Test] Init', props<{testList: Test[]}>());
export const testAddAction = createAction('[Test] Add', props<{test: Test}>());

const reducer = createReducer(initialState,
  on(testInitAction, (state, action) => adapter.addAll(action.testList, state)),
  on(testAddAction, (state, action) => adapter.addOne(action.test, state)),
);

export function testReducer(state: TestState, action: Action) {
  return reducer(state, action);
}

export const testFeature = (state: AppState) => state.tests;

export const getTestList = createSelector(testFeature, adapter.getSelectors().selectAll);
