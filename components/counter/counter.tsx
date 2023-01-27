import { WC } from 'wcwc';
import style from './style.scss';

class Counter extends WC {
  static $styles = [ style ];
  
  data: { count: number } = this.$({
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

        { this.props.children }   
      </>
    )
  }
}

Counter.expose('my-custom-element', {
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