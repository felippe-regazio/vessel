import style from './style.scss';
import CloseIcon from '../../partials/icons/CloseIcon';

class WCChip extends WC {
  static styles = [ style ];
  
  render() {
    return (
      <>
        <CloseIcon/>
      </>
    )
  }
}

WCChip.expose('wc-chip');
