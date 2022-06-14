import { customElement, MetaElement } from '@metaversejs/core';
import 'aframe-blink-controls';
import 'aframe-extras';
import 'aframe-physics-extras';
import 'aframe-physics-system/dist/aframe-physics-system.js';
import { html, nothing, TemplateResult } from 'lit';
import 'networked-aframe';
import 'super-hands';
import '../utils/Geometry.js';
import './avatar';

@customElement('meta-player')
export class PlayerElement extends MetaElement {
  private vrmode = false;
  private entervr = () => {
    this.vrmode = true;
    this.requestUpdate();
  };
  private exitvr = () => {
    this.vrmode = false;
    this.requestUpdate();
  };

  override init(): void {
    this.el.sceneEl?.addEventListener('enter-vr', this.entervr);
    this.el.sceneEl?.addEventListener('exit-vr', this.exitvr);
  }

  override remove(): void {
    this.el.sceneEl?.removeEventListener('enter-vr', this.entervr);
    this.el.sceneEl?.removeEventListener('exit-vr', this.exitvr);
  }

  override render(): TemplateResult {
    return html`
      <assets>
        <!-- Camera Rig / Player -->
        <template id="player-template">
          <a-entity></a-entity>
        </template>

        <!-- Head / Avatar -->
        <template id="avatar-template">
          <a-entity meta-avatar networked-audio-source></a-entity>
        </template>

        <!-- Hands -->
        <template id="left-hand-template">
          <a-entity>
            <a-gltf-model
              class="tracked-left-hand"
              rotation="0 0 90"
              src="https://pinser-demo.onrender.com/assets/objects/leftHandHigh.glb"
            ></a-gltf-model>
          </a-entity>
        </template>
        <template id="right-hand-template">
          <a-entity>
            <a-gltf-model
              class="tracked-right-hand"
              rotation="0 0 -90"
              src="https://pinser-demo.onrender.com/assets/objects/rightHandHigh.glb"
            ></a-gltf-model>
          </a-entity>
        </template>
      </assets>

      <a-entity
        id="player"
        networked="template: #player-template; attachTemplateToLocal: false;"
      >
        <a-entity
          id="camera"
          position="0 1.6 0"
          camera="fov: 40; zoom: 1;"
          look-controls="reverseMouseDrag: true; touchEnabled: false; magicWindowTrackingEnabled: false;"
          wasd-controls
          networked="template: #avatar-template; attachTemplateToLocal: false;"
        >
          <a-entity
            raycaster="objects: [selectable];"
            cursor="rayOrigin: mouse; fuse: false;"
          ></a-entity>

          <a-menu-button
            position="0.25 0.25 -1"
            scale="1.5 1.5 1"
          ></a-menu-button>
        </a-entity>

        ${!this.vrmode
          ? nothing
          : html`
              <a-entity
                super-hands
                sphere-collider="objects: a-box"
                static-body="shape: sphere; sphereRadius: 0.02"
                hand-controls="hand: left"
                laser-controls="hand: left;"
                blink-controls="cameraRig: #player; teleportOrigin: #camera; collisionEntities: [teleportable]; snapTurn: false;"
                raycaster="objects: [selectable];"
                networked="template: #left-hand-template; attachTemplateToLocal: false;"
              ></a-entity>
              <a-entity
                super-hands
                sphere-collider="objects: a-box"
                static-body="shape: sphere; sphereRadius: 0.02"
                hand-controls="hand: right"
                laser-controls="hand: right;"
                blink-controls="cameraRig: #player; teleportOrigin: #camera; collisionEntities: [teleportable]; snapTurn: false;"
                raycaster="objects: [selectable];"
                networked="template: #right-hand-template; attachTemplateToLocal: false;"
              ></a-entity>
            `}

        <!--
        <a-entity hand-tracking-controls="hand: left;"> </a-entity>
        <a-entity hand-tracking-controls="hand: right;"></a-entity>
        -->
      </a-entity>
    `;
  }
}
