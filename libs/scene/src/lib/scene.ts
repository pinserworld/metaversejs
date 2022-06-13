import 'aframe';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('meta-scene')
export class SceneElement extends LitElement {
  @property()
  private serverURL = 'https://pinser-networked-server.onrender.com';

  @property()
  private adapter = 'wseasyrtc';

  @property()
  private debug = false;

  @property()
  private connectOnLoad = false;

  protected override createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  private scene() {
    return html`${unsafeHTML(
      this.querySelector('[slot=scene]')?.innerHTML || ''
    )}`;
  }

  override render(): TemplateResult {
    return html`
      <a-scene
        networked-scene="
          serverURL: ${this.serverURL};
          adapter: ${this.adapter};
          debug: ${this.debug};
          connectOnLoad: ${this.connectOnLoad};
        "
      >
        <a-entity
          raycaster="objects: [selectable];"
          cursor="rayOrigin: mouse; fuse: false;"
        ></a-entity>

        ${this.scene()}
      </a-scene>
    `;
  }
}
