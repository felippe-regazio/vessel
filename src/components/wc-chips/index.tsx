import '../wc-chip';
import style from './style.scss';

class WCChips extends WC {  
  static styles = [ style ];
  
  render() {
    return (
      <>
        <wc-chip style="border: solid 1px #444">
          <wc-chip-action>
            a
          </wc-chip-action>
          <wc-chip-label>hello</wc-chip-label>
        </wc-chip>
        <wc-chip>
          <wc-chip-action>
            a
          </wc-chip-action>
          <wc-chip-action>
            a
          </wc-chip-action>
          <wc-chip-label>world</wc-chip-label>
        </wc-chip>
        <wc-chip>
          <wc-chip-label>from</wc-chip-label>
          <wc-chip-action>
            a
          </wc-chip-action>
          <wc-chip-action>
            a
          </wc-chip-action>
        </wc-chip>
        <wc-chip>
          <wc-chip-label>chips</wc-chip-label>
        </wc-chip>
      </>
    )
  }
}

WCChips.expose('wc-chips');