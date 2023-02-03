import style from './style.scss';

class WCChip extends WC {
  static styles = [ style ];
  
  render() {
    return this.props.children;
  }
}

WCChip.expose('wc-chip');