const ELEMENT_NAME = 'dad-error';
import template from './dad-error.html.js';
import style from './dad-error.css.js';

export default class DadError extends HTMLElement {
  constructor () {
    super ();
    this.shadow = this.attachShadow ({
      mode: 'open',
    });
  }

  connectedCallback () {
    this.render ();
  }

  render () {
    this.shadowRoot.innerHTML = template (style);
  }
}

customElements.define (ELEMENT_NAME, DadError);
