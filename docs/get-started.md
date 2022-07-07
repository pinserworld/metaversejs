# Get started

## Project initialisation

To generate our project skeleton, we will use [nx](https://nx.dev/).

On a bash / DOS terminal, execute the following command:

```bash
$ npx create-nx-workspace helloworld --appName="helloWorld" --preset="web-components" --style="css" --nx-cloud=false
```

Open the created directory "helloworld" in your favorite IDE ([VisualStudio code](https://code.visualstudio.com/) ?)

## Start the development server

On a bash / DOS terminal, execute the following command in your project directory:

```bash
nx serve
```

Open `http://localhost:4200/` in your browser to see the result

## Add required library

On a bash / DOS terminal, execute the following command in your project directory:

```bash
npm install aframe @metaversejs/core @metaversejs/scene @metaversejs/player
```

- [aframe](https://aframe.io/): wonderful 3D engine from HTML tags
- [@metaversejs/core](https://github.com/pinserworld/metaversejs/): create 3D web components
- [@metaversejs/scene](https://github.com/pinserworld/metaversejs/): create 3D scene
- [@metaversejs/player](https://github.com/pinserworld/metaversejs/): create 3D player

## Import required library in source code

In apps/web-components/src/app/app.element.ts  
replace

```typescript
import './app.element.css';
```

by

```typescript
import 'aframe'; // main 3d engine

import '@metaversejs/scene'; // default 3d environment
import { MetaElement, customElement, html } from '@metaversejs/core'; // used to create a 3d component
```

## Create an empty 3d scene

In apps/web-components/src/index.html  
replace the body by

by

```html
<meta-scene app="" room="">
    <template slot="scene">
        <hello-world></hello-world>
    </template>
</meta-scene>
```

The following line display our amazing custom component, but who doesn't exist yet:

```typescript
<hello-world></hello-world>
```

## Add our custom HelloWorld component

In apps/web-components/src/app/app.element.ts  
replace the generated code by the following code at end of the file

```typescript
@customElement('hello-world')
export class HelloWorldElement extends AFrameElement {
  render() {
    return html`
      <a-box
        material="color: grey;"
        position="0.090 0.5 -3.05"
        scale="1.2 0.3 0.1"
      ></a-box>
      <a-text value="Hello World" position="-0.5 0.5 -3"></a-text>
    `;
  }
}
```

Our element display the text "Hello world" on a grey box in our environment.
![hello world aframe-element component](./assets/get-started-hello-world.png)

**Congratulation, you created your first metaversejs scene compatible VR / 3D.**

demo online: 
https://metaversejs-examples-get-started.onrender.com

source code: 
https://github.com/pinserworld/metaversejs-examples/tree/get-started
