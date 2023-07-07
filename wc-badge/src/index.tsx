import style from './style.scss';

class WCBadge extends WC {
  static styles = [ style ];
  
  updateLocalStyle() {
    const absolute = ['top', 'left', 'bottom', 'right'].some((prop: string) => this.props[prop]);
    const padding = this.$el.hasAttribute('clear') ? '0' : '2px 6px';

    Object.assign(this.$el.style, {
      padding,
      minWidth: this.props.size,
      color: this.props.color,
      minHeight: this.props.size,
      backgroundColor: this.props.bg,
      fontSize: `calc(${this.props.size} / 1.4)`,
      position: absolute ? 'absolute' : 'initial',
      top: this.props.top,
      bottom: this.props.bottom,
      left: this.props.left,
      right: this.props.right
    });
  }

  render() {
    this.updateLocalStyle();

    return this.props.children;
  }
}

WCBadge.expose('wc-badge', {
  props: [
    'top',
    'left',
    'bottom',
    'right',
    { name: 'bg', initial: '#eeeeee' },
    { name: 'color', initial: '#444444' },
    { name: 'size', initial: '20px' },
  ]
});
