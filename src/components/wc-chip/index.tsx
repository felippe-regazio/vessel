import style from './style.scss';

class WCChip extends WC {
  static styles = [ style ];

  render() {
    return this.props.children;
  }
}

WCChip.expose('wc-chip', {
  props: [
    { name: 'size', default: '12px', css: true }
  ]
});

// -------- label --------

class WCChipLabel extends WC {
  render() {
    return this.props.children;
  }
}

WCChipLabel.expose('wc-chip-label');

// -------- action --------

class WCChipAction extends WC {
  render() {
    return (
      <button>
        <span>{ this.props.children }</span>
      </button>
    );
  }
}

WCChipAction.expose('wc-chip-action');
