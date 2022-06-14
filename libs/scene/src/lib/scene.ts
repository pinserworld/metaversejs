import '@metaversejs/player';
import 'aframe';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('meta-scene')
export class SceneElement extends LitElement {
  @property()
  private app!: string;

  @property()
  private room!: string;

  @property()
  private serverURL = 'https://pinser-networked-server.onrender.com';

  @property()
  private adapter = 'easyrtc';

  @property()
  private audio = true;

  @property()
  private video = true;

  @property()
  private debug = false;

  private connectOnLoad = false;

  override connectedCallback() {
    super.connectedCallback();

    if (
      !this.app ||
      !/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/.test(
        this.app.toUpperCase()
      )
    ) {
      throw new Error('meta-scene: property "app" unset or not valide');
    }

    if (this.room) {
      if (
        !/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/.test(
          this.room.toUpperCase()
        )
      ) {
        throw new Error('meta-scene: property "room" not valide');
      }

      this.connectOnLoad = true;
    }
  }

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
          app: ${this.app.replace(/-/g, '').toLowerCase()};
          room: ${this.room
          ? this.room.replace(/-/g, '').toLowerCase()
          : 'default'};
          adapter: ${this.adapter};
          audio: ${this.audio};
          video: ${this.video};
          debug: ${this.debug};
          connectOnLoad: ${this.connectOnLoad};
        "
      >
        <meta-player></meta-player>

        ${this.scene()}
      </a-scene>
    `;
  }
}
