import { createSelector, MemoizedSelector } from '@ngrx/store';

import { TfCommandType, TfEventType, TfProject } from '../@generator/generator-models';
import { Command, getCommandList } from './project/command.reducer';
import { getProject, Project } from './project/project.reducer';
import { getSpecList, Spec } from './project/spec.reducer';
import { getTestList, Test } from './project/test.reducer';
import { AppState } from './root-reducer';

export const getConvertedState: MemoizedSelector<AppState, TfProject> = createSelector(getProject,
  getSpecList,
  getTestList,
  getCommandList,
  (
    project: Project,
    specList: Spec[],
    testList: Test[],
    commandList: Command[]) => {
    return {
      name: project.name,
      specList: specList.map((spec: Spec) => {
        return {
          name: spec.name,
          url: '#/',
          testList: convertTestListForSpec(spec.id, testList, commandList),
        };
      }),
    };
  },
);

function convertTestListForSpec(specId: string, testList: Test[], commandList: Command[]) {
  return testList
    .filter((test: Test) => test.spec.id === specId)
    .map((test: Test) => ({
      name: test.name,
      commandList: covertCommandListForTest(test.id, commandList),
    }));
}

function covertCommandListForTest(testId: string, commandList: Command[]) {
  return commandList
    .filter((command: Command) => command.test.id === testId)
    .map((command: Command) => ({
      // name: command.name,
      type: TfCommandType.EVENT,
      eventType: TfEventType.CLICK,
      target: command.target,
    }));
}
