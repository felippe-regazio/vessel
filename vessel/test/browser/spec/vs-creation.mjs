import { Tester } from '../tester/index.mjs';

const $t = new Tester();

$t.it('Check Component API behavior (No shadow)', () => {
  const create = (tag, attrs = {}) => Object.assign(document.createElement(tag), attrs);

  (class VSCounter extends VesselComponent {
    data = this.store({ count: 0 });

    static style = [`
      vs-counter { 
        border: solid 1px #bbb;
        display: block;
        padding: 16px;
        max-width: 300px;
        border-radius: 8px;
        margin: 16px 0;

        & p {
          margin: 0;
          margin-bottom: 8px;
        }
      }
    `];

    render() {
      const t = create('div', { innerHTML: `<p>Count: ${this.data.count}</p>`, title: 'Not shadowed counter' });
      t.append(create('button', { textContent: 'Dec', onclick: () => this.data.count--, style: 'margin-right: 8px' }));
      t.append(create('button', { textContent: 'Inc', onclick: () => this.data.count++ }));
      return t;
    }
  }).expose('vs-counter');
  
  const $counter = document.createElement('vs-counter');
  $t.assert($counter);

  $t.assert('Checks the component initial state', () => {
    return $counter.querySelector('p').textContent === 'Count: 0';
  });

  $t.assert('Checks the component reactive state (count +)', () => {
    $counter.querySelector('button:last-child').click();    
    return $counter.querySelector('p').textContent === 'Count: 1';
  });
  
  $t.assert('Checks the component reactive state (count -)', () => {
    $counter.querySelector('button').click();
    return $counter.querySelector('p').textContent === 'Count: 0';
  });
});

$t.it('Check Component API behavior (Shadowed)', () => {
  const create = (tag, attrs = {}) => Object.assign(document.createElement(tag), attrs);

  (class VSCounter extends VesselComponent {
    data = this.store({ count: 0 });

    static style = [`
      :host { 
        border: solid 1px #bbb;
        display: block;
        padding: 16px;
        max-width: 300px;
        border-radius: 8px;
        margin: 16px 0;
      }

      :host p {
        margin: 0;
        margin-bottom: 8px;
      }
    `];

    render() {
      const t = create('div', { innerHTML: `<p>Count: ${this.data.count}</p>`, title: 'Shadowed counter' });
      t.append(create('button', { textContent: 'Dec', onclick: () => this.data.count--, style: 'margin-right: 8px' }));
      t.append(create('button', { textContent: 'Inc', onclick: () => this.data.count++ }));
      return t;
    }
  }).expose('vs-counter-shadowed', {
    shadow: { mode: 'open' }
  });
  
  const $counter = document.createElement('vs-counter-shadowed');
  $t.assert($counter);

  $t.assert('Checks the component initial state', () => {
    return $counter.shadowRoot.querySelector('p').textContent === 'Count: 0';
  });

  $t.assert('Checks the component reactive state (count +)', () => {
    $counter.shadowRoot.querySelector('button:last-child').click();    
    return $counter.shadowRoot.querySelector('p').textContent === 'Count: 1';
  });
  
  $t.assert('Checks the component reactive state (count -)', () => {
    $counter.shadowRoot.querySelector('button').click();
    return $counter.shadowRoot.querySelector('p').textContent === 'Count: 0';
  });

  $t.assert('Special Attribute shadow: Component initialized with [shadow] attribute must be shadowed', () => {
    const content = 'Testing shadow special ATTR';

    (class vsTestShadowAttr extends VesselComponent {
      static style = [`
        :host {
          border: solid 1px #bbb;
          display: block;
          padding: 16px;
          max-width: 300px;
          border-radius: 8px;
          margin: 16px 0;
        }
      `];
  
      render() {
        return content;
      };
    }).expose('vs-test-shadow-attr');
  
    const $vsTestShadowAttr = document.createElement('vs-test-shadow-attr');
    $vsTestShadowAttr.setAttribute('shadow', 'open');
    $t.assert($vsTestShadowAttr);
  
    const result = (
      $vsTestShadowAttr.getAttribute('shadow') === 'open' &&
      $vsTestShadowAttr.shadowRoot &&
      $vsTestShadowAttr.shadowRoot.textContent === content
    );

    $vsTestShadowAttr.remove();
    return result;
  });
});
