import {
  customLitElement,
  html,
  LitElement,
  propertyLit,
  TemplateResult,
} from '@metaversejs/core';
import 'aframe-extras';
import 'aframe-physics-extras';
import 'aframe-physics-system/dist/aframe-physics-system.js';
import 'aframe-rounded';
import 'networked-aframe';
import './scene-container';

@customLitElement('meta-scene')
export class SceneElement extends LitElement {
  @propertyLit()
  private app: string;

  @propertyLit()
  private room!: string;

  @propertyLit()
  private serverURL = 'https://pinser-networked-server.onrender.com';

  @propertyLit()
  private adapter = 'easyrtc';

  @propertyLit()
  private audio = true;

  @propertyLit()
  private video = false;

  @propertyLit()
  private debug = false;

  private connectOnLoad = false;

  override connectedCallback() {
    super.connectedCallback();

    if (
      (!this.app && this.room) ||
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
        <meta-scene-container></meta-scene-container>
      </a-scene>
    `;
  }
}
