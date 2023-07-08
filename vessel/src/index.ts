import { h, Fragment } from './jsx';
import { _render } from './renderer';
import { defineAsCustomElement } from './expose';

export class VesselComponent<P extends Object = any> {
  static h: typeof h = h;
  static f: typeof Fragment = Fragment;

  public props: P;
  public $el: HTMLElement;
  static style?: StaticStyle[];
  public static isVesselClass = true;

  constructor(props: P) {
    this.props = props || {};
    this.$el = (props as any).$el;
  }
  
  private get $host(): HTMLElement|ShadowRoot {
    return this.$el.shadowRoot || this.$el;
  }

  private _unmounted(): any {
    queueMicrotask(() => this.unmounted());
  }

  public update(update?: any) {
    this.beforeUpdate();

    const oldElements = Array.from(this.$host.childNodes) as any;
    const rendered = _render(this.render(update)) as any;
    const newElements = Array.isArray(rendered) ? rendered : [ rendered ];
    
    newElements.forEach((child: HTMLElement) => {
      this.$host.insertBefore(child, oldElements[0]);
    });

    oldElements.forEach((child: HTMLElement) => {
      if (!newElements.includes(child)) {
        if (typeof child !== 'string') {
          child.remove();
        }

        (child as any) = null;
      }
    });

    this.$el.isConnected 
      ? queueMicrotask(() => this.updated()) 
      : this._unmounted();
  }

  public store(data: object, _cb?: Function): any {
    const cb = _cb ? _cb.bind(this) : this.update.bind(this);

    return new Proxy(data, {
      get: (obj: any, prop: any) => {
        const isArrayOrObject = Array.isArray(obj[prop]) || typeof obj[prop] === 'object';
        const isProxyOrCircular = !obj[prop]._isProxy && !Object.is(obj[prop], data);

        if (prop === '_isProxy') {
          return true;
        }

        if (isArrayOrObject && !isProxyOrCircular) {
          obj[prop] = this.store(obj[prop], _cb);
        }
        
        if (typeof obj[prop] === 'function') {
          return obj[prop].bind(this)();
        }

        return obj[prop];
      },

      set: (obj: any, prop: any, value: any) => {
        if (obj[prop] === value) {
          return true
        };

        obj[prop] = value;
        cb();

        return true;
      },

      deleteProperty: (obj: any, prop: any) => {
        delete obj[prop];
        cb();

        return true;
      }
    });
  }

  public static expose(tagname: string, options?: ExposeConfig) {
    if (!window.customElements.get(tagname)) {
      defineAsCustomElement(this, tagname, options);
    }
  }  

  // @ts-ignore
  public attrChanged(name: string, oldv: any, newv: any) {}
  public beforeMount(): any {}
  public mounted(): any {}
  public unmounted(): any {}
  public beforeUpdate(): any {}
  public updated(): any {}
  public render(_update?: any): HTMLElement | void {}
}

export const vessel = { VesselComponent };