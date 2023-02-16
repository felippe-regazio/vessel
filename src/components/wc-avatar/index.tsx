import style from './style.scss';

class WCAvatar extends WC {
  static styles = [ style ];

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

WCAvatar.expose('wc-avatar', {
  props: {
    src: {},
    alt: {},
    initials: {},
    'initials-count': {},
    size: { default: '40px', css: true }
  }
});