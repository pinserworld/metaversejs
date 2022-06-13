import {
  customElement,
  inject,
  injectable,
  internalProperty,
  MetaElement,
  MetaProvider,
  property,
} from '@metaversejs/core';
import '@metaversejs/scene';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement as customElementLit } from 'lit/decorators.js';

@customElementLit('metaversejs-root')
export class RootElement extends LitElement {
  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  render(): TemplateResult {
    return html`
      <meta-scene connectOnLoad="true">
        <template slot="scene">
          <tic-tac-toe position="0 0 -5"></tic-tac-toe>
        </template>
      </meta-scene>
    `;
  }
}

@injectable({
  networked: true,
})
class TictactoeService extends MetaProvider {
  @internalProperty()
  player = 'X';

  @internalProperty()
  pawns = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  public async add(line: number, column: number) {
    const pawns = this.pawns;
    const player = this.player;

    if (pawns[line][column] !== '') {
      return;
    }
    pawns[line][column] = player;
    this.pawns = pawns;
    this.player = player === 'X' ? 'O' : 'X';
  }

  public reset() {
    this.pawns = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }
}

@customElement('tic-tac-toe', {
  providers: [TictactoeService],
})
export class TicTacToeElement extends MetaElement {
  @inject()
  private tictactoeService!: TictactoeService;

  private reset() {
    this.tictactoeService.reset();
  }

  override render(): TemplateResult {
    return html`
      <tic-tac-toe-pawn
        positionline="0"
        positioncolumn="0"
        position="-1.1 2.8 0"
      ></tic-tac-toe-pawn>
      <tic-tac-toe-pawn
        positionline="0"
        positioncolumn="1"
        position="0 2.8 0"
      ></tic-tac-toe-pawn>
      <tic-tac-toe-pawn
        positionline="0"
        positioncolumn="2"
        position="1.1 2.8 0"
      ></tic-tac-toe-pawn>
      <!-- line 2 -->
      <tic-tac-toe-pawn
        positionline="1"
        positioncolumn="0"
        position="-1.1 1.7 0"
      ></tic-tac-toe-pawn>
      <tic-tac-toe-pawn
        positionline="1"
        positioncolumn="1"
        position="0 1.7 0"
      ></tic-tac-toe-pawn>
      <tic-tac-toe-pawn
        positionline="1"
        positioncolumn="2"
        position="1.1 1.7 0"
      ></tic-tac-toe-pawn>
      <!-- line 3 -->
      <tic-tac-toe-pawn
        positionline="2"
        positioncolumn="0"
        position="-1.1 0.6 0"
      ></tic-tac-toe-pawn>
      <tic-tac-toe-pawn
        positionline="2"
        positioncolumn="1"
        position="0 0.6 0"
      ></tic-tac-toe-pawn>
      <tic-tac-toe-pawn
        positionline="2"
        positioncolumn="2"
        position="1.1 0.6 0"
      ></tic-tac-toe-pawn>
      <a-sphere
        selectable
        @click=${() => this.reset()}
        position="2.5 0 0"
        scale="0.5 0.5 0.5"
      ></a-sphere>
    `;
  }
}

@customElement('tic-tac-toe-pawn', {
  networked: true,
})
export class PawnElement extends MetaElement {
  @inject()
  private tictactoeService!: TictactoeService;

  @property()
  positionline!: number;

  @property()
  positioncolumn!: number;

  @internalProperty()
  background = 'grey';

  private onClick() {
    this.tictactoeService.add(this.positionline, this.positioncolumn);
  }

  override render() {
    const pawns = this.tictactoeService.pawns;
    const player = pawns[this.positionline][this.positioncolumn];

    return html`
      <a-box
        selectable
        scale="1 1 0.1"
        material="color: ${this.background}"
        @click=${() => this.onClick()}
        @mouseenter=${() => (this.background = '#AAAAAA')}
        @mouseleave=${() => (this.background = 'grey')}
      ></a-box>
      <a-text value="${player}" position="-0.29 0 0.1" scale="3 3 1"></a-text>
    `;
  }
}
