const ELEMENT_NAME = 'dad-link';
import template from './dad-link.html.js';
import style from './dad-link.css.js';

export default class DadLink extends HTMLElement {
  constructor () {
    super ();
    this.handleClick = this.handleClick.bind (this);
    var shadow = this.attachShadow ({
      mode: 'open',
    });
  }

  handleClick (e) {
    e.preventDefault ();
    const event = new CustomEvent ('navigate', {
      detail: this.route,
      composed: true,
      bubbles: true,
    });
    this.dispatchEvent (event);
  }

  static get observedAttributes () {
    return ['link-name', 'link-route'];
  }

  get name () {
    return this.getAttribute ('link-name');
  }

  get route () {
    return this.getAttribute ('link-route');
  }

  attributeChangedCallback (attribute, oldValue, newValue) {
    this.render ();
  }

  connectedCallback () {
    this.addEventListener ('click', this.handleClick, false);
    this.render ();
  }

  props = {
    linkName: this.name,
    linkRoute: this.route,
  };

  render () {
    this.shadowRoot.innerHTML = template (style, this.props);
  }
}

customElements.define (ELEMENT_NAME, DadLink);
