import { SinglePropertySchema } from 'aframe';
import { MetaElement } from '../classes/meta-element';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const NAF: any;

export const internalProperty =
  () => (target: MetaElement, property: string) => {
    if (!(target.constructor as typeof MetaElement).__INTERNAL_PROPERTIES__) {
      (target.constructor as typeof MetaElement).__INTERNAL_PROPERTIES__ = [];
    }
    (target.constructor as typeof MetaElement).__INTERNAL_PROPERTIES__.push(
      property
    );

    if (!(target.constructor as typeof MetaElement).schema) {
      (target.constructor as typeof MetaElement).schema = {};
    }
    (
      (target.constructor as typeof MetaElement).schema as {
        [key: string]: SinglePropertySchema<unknown>;
      }
    )[property] = {
      type: 'string',
    };

    Object.defineProperty(target, property, {
      get() {
        return JSON.parse(this.data[property]);
      },
      set(value: unknown) {
        if (!this.constructor.schema[property].default) {
          this.constructor.schema[property].default = JSON.stringify(value);
        }

        if (!this.__AFRAME_INSTANCE__) {
          return;
        }

        this.el.setAttribute(
          this.constructor.__ELEMENT_NAME__,
          property,
          JSON.stringify(value)
        );

        if (
          this.constructor.__NETWORKED__ &&
          NAF.connection.isConnected() &&
          !NAF.utils.isMine(this.el)
        ) {
          NAF.utils.takeOwnership(this.el);
        }
      },
      enumerable: true,
      configurable: true,
    });
  };
