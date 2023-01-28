import { WC } from 'wcwc';
import style from './style.scss';

class CounterB extends WC {
  static styles = [ style ];

  data: { count: number } = this.set({
    count: this.props.start || 0
  });

  render() {
    return (
      <>
        <h1>COUNTER B: {this.data.count}</h1>

        <button onclick={() => this.data.count--}>
          Dec
        </button>
        
        <button onclick={() => this.data.count++}>
          Inc
        </button>

        { this.props.children }   
      </>
    )
  }
}

CounterB.expose('my-custom-element-b', {
  shadow: { mode: 'open' },

  props: {
    start: {
      default: 40
    },

    bg: {
      default: '#eee', 
      css: true
    }
  }
});
