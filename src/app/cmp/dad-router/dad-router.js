const ELEMENT_NAME = 'dad-router';
import template from './dad-router.html.js';
import style from './dad-router.css.js';

const ROUTES = [
  {
    path: '/',
    template: 'dad-joke',
  },
  {
    path: '/coffee',
    template: 'buy-me-a-coffee',
  },
];

export default class DadRouter extends HTMLElement {
  constructor (routes = ROUTES) {
    super ();
    this.routes = routes;
    this._loadInitialRoute ();
  }

  loadRoute (...urlSegments) {
    const matchedRoute = this._matchUrlToRoute (urlSegments);
  }

  connectedCallback () {
    this.render ();
  }

  render () {
    this.shadowRoot.innerHTML = template (style);
  }
}

customElements.define (ELEMENT_NAME, DadRouter);
