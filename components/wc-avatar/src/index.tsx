import style from './style/main.scss';

class WCAvatar extends VesselComponent {
  static style = [ style ];

  getLetters(): string {
    const initials = this.props.initials.split(' ').map((word: string) => word.substring(0, 1));
    const initialsCount = Number(this.props['initials-count']) || initials.length;
    return initials.splice(0, initialsCount).join('');
  }

  render() {
    return (
      <>
        { this.props.children }

        { this.props.src && <img src={this.props.src} alt={this.props.alt || ''} /> }

        { this.props.initials && <span> { this.getLetters() } </span> }      
      </>
    )
  }
}

WCAvatar.expose('vs-avatar', {
  props: [
    'src',
    'alt',
    'initials',
    'initials-count',
    { name: 'size', initial: '40px', css: true }
  ]
});
