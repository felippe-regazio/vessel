import style from './style.scss';

class WCChip extends WC {
  static styles = [ style ];

  updateLocalStyle() {
    Object.assign(this.$el.style, {
      color: this.props.color,
      backgroundColor: this.props.bg
    });
  }

  render() {
    this.updateLocalStyle();

    return this.props.children;
  }
}

WCChip.expose('wc-chip', {
  props: {
    bg: { default: '#eeeeee' },
    color: { default: '#444444' },
    size: { default: '20px', css: true }
  }
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
