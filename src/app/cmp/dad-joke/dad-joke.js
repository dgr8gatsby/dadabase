const ELEMENT_NAME = 'dad-joke';
import template from './dad-joke.html.js';
import style from './dad-joke.css.js';

export default class DadJoke extends HTMLElement {
  constructor () {
    super ();

    this.attachShadow ({
      mode: 'open',
    });
  }

  props = {
    _id: '5fe69c4f842ba5a859b21416',
    type: 'question',
    headline: 'loading...',
    punchline: 'loading...',
    __v: 0,
  };

  async connectedCallback () {
    const response = await fetch ('/api/random');
    this.props = await response.json ();
    console.log (this.props);
    this.render ();
  }

  render () {
    this.shadowRoot.innerHTML = template (style, this.props);
  }
}

customElements.define (ELEMENT_NAME, DadJoke);
