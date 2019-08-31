import { Action, createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TfAssertType, TfCommandType, TfEventType } from 'src/app/@generator/generator-models';

export interface BaseCommand {
  // xpath
  target: string;
  type: TfCommandType;
  test: { id: string };
}

export interface AssertCommand extends BaseCommand {
  assertType: TfAssertType;
  expectedValue?: any;
}

export interface EventCommand extends BaseCommand {
  eventType: TfEventType;
  eventParams?: any;
}

export type Command = AssertCommand | EventCommand;

export interface CommandState extends EntityState<Command> {}

const adapter = createEntityAdapter<Command>();

const initialState: CommandState = adapter.getInitialState({});

export const commandInitAction = createAction('[Command] Init', props<{commandList: Command[]}>());
export const commandAddAction = createAction('[Command] Add', props<{command: Command}>());

const reducer = createReducer(initialState,
  on(commandInitAction, (state, action) => adapter.addAll(action.commandList, state)),
  on(commandAddAction, (state, action) => adapter.addOne(action.command, state)),
);

export function commandReducer(state: CommandState, action: Action) {
  return reducer(state, action);
}

export const commandFeature = (state: AppState) => state.commands;

export const getCommandList = createSelector(commandFeature, adapter.getSelectors().selectAll);
