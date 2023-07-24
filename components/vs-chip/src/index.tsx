import style from './style.scss';

class WCChip extends VesselComponent {
  static style = [ style ];

  render() {
    return this.props.children;
  }
}

WCChip.expose('vs-chip', {
  props: [
    { name: 'size', initial: '12px', css: true }
  ]
});

// -------- label --------

class WCChipLabel extends VesselComponent {
  render() {
    return this.props.children;
  }
}

WCChipLabel.expose('vs-chip-label');

// -------- action --------

class WCChipAction extends VesselComponent {
  render() {
    return (
      <button>
        <span>{ this.props.children }</span>
      </button>
    );
  }
}

WCChipAction.expose('vs-chip-action');
