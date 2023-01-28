import { WC } from 'wcwc';
import style from './style.scss';

class CounterA extends WC {
  static styles = [ style ];

  data: { count: number } = this.set({
    count: this.props.start || 0
  });

  render() {
    return (
      <>
        <h1>{this.data.count}</h1>

        <button onclick={() => this.data.count--}>
          Dec
        </button>
        
        <button onclick={() => this.data.count++}>
          Inc
        </button>

        <my-custom-element-b>
          <p>Hello</p>
        </my-custom-element-b>  
      </>
    )
  }
}

CounterA.expose('my-custom-element', {
  shadow: { mode: 'open' },

  props: {
    start: {
      default: 40
    },

    bg: {
      default: '#555', 
      css: true
    }
  }
});
