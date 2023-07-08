import '../vs-chip';
import style from './style.scss';

class WCChips extends VesselComponent {  
  static styles = [ style ];
  
  render() {
    return this.props.children;
  }
}

WCChips.expose('vs-chips', {
  props: [
    { name: 'size', initial: '12px', css: true }
  ]
});