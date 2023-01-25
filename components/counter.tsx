import { h, WC, Fragment } from 'wcwc';

class Counter extends WC {
  static attrs = [ 'start' ];

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

Counter.expose('my-custom-element');