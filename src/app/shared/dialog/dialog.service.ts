import { NbDialogService, NbGlobalPositionStrategy } from '@nebular/theme';

export class DialogService extends NbDialogService {

  protected createPositionStrategy(): NbGlobalPositionStrategy {
    console.log('sdfsdfasf');
    return this.positionBuilder
      .global()
      .top('40px')
      .centerHorizontally();
  }
}
