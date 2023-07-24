import style from './style/main.scss';

(/* Avatar */ class extends VesselComponent {
  static style = [ style ];

  initial(): string {
    return (this.props.initial || '')[0];
  }

  render() {
    return (
      <>
        {this.props.src && <img src={this.props.src} alt={this.props.title} />}
        {this.props.initial && <span>{this.initial()}</span>}
      </>
    )
  }
}).expose('vs-avatar', {
  props: [
    'src',
    'title',
    'initial',
    { name: 'size', initial: '40px', css: true }
  ]
});
