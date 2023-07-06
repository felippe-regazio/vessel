import '../wc-chip';
import style from './style.scss';

class WCChips extends WC {  
  static styles = [ style ];
  
  render() {
    return this.props.children;
  }
}

WCChips.expose('wc-chips', {
  props: [
    { name: 'size', default: '12px', css: true }
  ]
});