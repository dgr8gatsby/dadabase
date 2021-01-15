const ELEMENT_NAME = 'app-shell';
import template from './app-shell.html.js';
import style from './app-shell.css.js';

export default class AppShell extends HTMLElement {
  constructor () {
    super ();
    this.shadow = this.attachShadow ({
      mode: 'open',
    });
  }

  props = {};

  connectedCallback () {
    this.render ();
  }

  render () {
    this.shadowRoot.innerHTML = template (style, this.props);
  }
}

customElements.define (ELEMENT_NAME, AppShell);
