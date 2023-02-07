import('../wc-chip');

class WCChips extends WC {  
  render() {
    return (
      <div>
        <wc-chip>hello</wc-chip>
        <wc-chip>world</wc-chip>
        <wc-chip>from</wc-chip>
        <wc-chip>chips</wc-chip>
      </div>
    )
  }
}

WCChips.expose('wc-chips');