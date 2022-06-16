import { customElement, MetaElement } from '@metaversejs/core';
import { PlayerProvider } from '@metaversejs/player';
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('meta-scene-container', {
  providers: [PlayerProvider],
})
export class SceneContainerElement extends MetaElement {
  private scene(): TemplateResult {
    return html`${unsafeHTML(
      this.el
        .closest(`meta-scene`)
        .querySelector(':scope > template[slot=scene]')?.innerHTML || ''
    )}`;
  }

  override render(): TemplateResult {
    return html`
      <meta-player></meta-player>

      ${this.scene()}
    `;
  }
}
