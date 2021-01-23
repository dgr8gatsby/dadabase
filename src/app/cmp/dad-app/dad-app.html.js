export default (style, _props) => `
<style>${style}</style>
<div class="grid">
    <header class="header">
        <div class="logo"><img class="logo" src='svg/mustache.svg' alt='a mustache icon used for a logo'/></div>
        <dad-router></dad-router>
        <nav>
            <ul>    
                <li>
                    <a href="#/random">View Joke</a>
                </li>
                <li>
                    <a href="https://www.buymeacoffee.com/greatgatsby" target="_blank">Buy me a ☕️</a>
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
