import { injectable, MetaProvider } from '@metaversejs/core';

@injectable()
export class PlayerProvider extends MetaProvider {
  teleport(position: string, rotation: string) {
    this.el.dispatchEvent(
      new CustomEvent('teleport', {
        detail: {
          position,
          rotation,
        },
      })
    );
  }
}
