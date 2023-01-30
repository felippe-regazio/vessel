import { WC } from 'wcwc';
import style from './style.scss';

class WcBadge extends WC {
  static styles = [ style ];
  
  render() {
    return this.props.children
  }
}

WcBadge.expose('wc-badge', {
  props: {
    bg: { css: true },
    size: { css: true }
  }
});
