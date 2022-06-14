import { injectable, internalProperty, MetaProvider } from '@metaversejs/core';

@injectable()
export class PlayerProvider extends MetaProvider {
  @internalProperty()
  position = '0 0 0';

  @internalProperty()
  rotation = '0 0 0';
}
