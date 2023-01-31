class WCIncludeHTML extends WC {  
  /**
   * Declaration of 2 reactive properties. The content
   * which holds the necessary text that we will render
   * as HTML. And the "src", which is a computed property
   * that maps our component src attribute
   */
  private data = this.reactive({ 
    content: '',
    src: () => this.props.src
  });

  /**
   * Try to fetch the content from the src address.
   * Always return a string or void in case unexpected error
   * 
   * @param src
   * @returns Promise<any>
   */
  async fetchContent(src: string): Promise<string|void> {
    return fetch(src, { mode: this.props.mode })
      .then(response => {
        return response.ok 
          ? response.text() 
          : Promise.reject(new Error(`Failed to include HTML from "${src}". Error: ${response.statusText}`))
      })
      .catch(console.error)
  }

  /**
   * Everytime the "src" changes, our data.src is remaped,
   * and the render will trigger again, fetching and generating
   * the new content.
   */
  render() {
    this.fetchContent(this.data.src)
      .then((result: string|void) => {
        this.$el.innerHTML = result || '';
      })
      .catch(error => {
        console.error(error);
        this.$el.innerHTML = '';
      });
  }
}

WCIncludeHTML.expose('wc-include-html', { 
  shadow: { mode: 'open' },

  props: {
    src: { default: '' },
    mode: { default: 'same-origin' }
  }
});