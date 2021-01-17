const ELEMENT_NAME = 'dad-joke';
import template from './dad-joke.html.js';
import style from './dad-joke.css.js';

export default class DadJoke extends HTMLElement {
  constructor (props = {}) {
    super ();
    this.initializeAttributes (props);
    this.attachShadow ({
      mode: 'open',
    });
  }

  static get observedAttributes () {
    return [
      'joke-headline',
      'joke-punchline',
      'joke-type',
      'joke-id',
      'joke-why',
    ];
  }

  get headline () {
    return this.getAttribute ('joke-headline');
  }
  set headline (value) {
    this.setAttribute ('joke-headline', value);
    this.props.headline = value;
  }

  get punchline () {
    return this.getAttribute ('joke-punchline');
  }
  set punchline (value) {
    this.setAttribute ('joke-punchline', value);
    this.props.punchline = value;
  }

  get type () {
    return this.getAttribute ('joke-type');
  }
  set type (value) {
    this.setAttribute ('joke-type', value);
    this.props.type = value;
  }

  get why () {
    return this.getAttribute ('joke-why');
  }
  set why (value) {
    this.setAttribute ('joke-type', value);
    this.props.why = value;
  }

  get id () {
    return this.getAttribute ('joke-id');
  }
  set id (value) {
    this.setAttribute ('joke-id', value);
    this.props.id = value;
  }

  attributeChangedCallback (attribute, oldValue, newValue) {
    if (
      this.id != null &&
      this.why != null &&
      this.headline != null &&
      this.punchline != null &&
      this.type != null
    ) {
      this.render ();
    }
  }

  props = {
    _id: '',
    type: '',
    headline: '',
    punchline: '',
    why: '',
    __v: 0,
  };

  async fetchRandomJoke () {
    const response = await fetch ('/api/random');
    this.props = await response.json ();
    this.render ();
  }

  initializeAttributes (initProps) {
    if (initProps._id !== undefined) {
      this.props = initProps;
      this.id = this.props._id;
      this.headline = this.props.headline;
      this.punchline = this.props.punchline;
      this.why = this.props.why;
      this.type = this.props.type;
    } else if (this.id !== undefined && this.id !== null && this.id != '') {
      this.props._id = this.id;
      this.props.headline = this.headline;
      this.props.punchline = this.punchline;
      this.props.why = this.props.why;
      this.props.type = this.props.type;
    } else {
      // Temporary, need to remove data fetch from component completely.
      this.fetchRandomJoke ();
    }
  }

  connectedCallback () {
    this.render ();
  }

  render () {
    this.shadowRoot.innerHTML = template (style, this.props);
  }
}

customElements.define (ELEMENT_NAME, DadJoke);
