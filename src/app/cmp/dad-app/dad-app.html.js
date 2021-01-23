export default (style, _props) => `
<style>${style}</style>
<div class="grid">
    <header class="header">
        <div class="logo"><img class="logo" src='svg/mustache.svg' alt='a mustache icon used for a logo'/></div>
        <nav>
            <ul>    
                <li>
                    <dad-link link-name="View Joke" link-route="dad-joke"></dad-link>
                </li>
                <li>
                    <dad-link link-name="Buy me a ☕️" link-route"buy-me-a-coffee"></dad-link>
                </li>
            </ul>
        </nav>
    </header>
    <main class="wide">
        <p name="screens"></p>
    </main>
    <footer class="wide">
        <div>Served with 💛 from a Dadabase</div>
        <div class="hide">A joke is added to our Dadabase when it is apparent</div>
    </footer>
</div>
`;

// https://css-tricks.com/things-ive-learned-css-grid-layout/
