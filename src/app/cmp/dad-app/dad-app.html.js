export default (style, _props) => `
<style>${style}</style>
<div class="grid">
    <header class="header">
        <button class="btn" id="prev" name="prev">&lt;</button>
        <div class="logo"><img class="logo" src='svg/mustache.svg' alt='a mustache icon used for a logo'/></div>
        <button class="btn" id="next" name="next">&gt;</button>
    </header>
    <main class="wide">
        <p name="screens"></p>
    </main>
    <footer class="wide">
        <div>Served with 💛 from a Dadabase</div>
        <div class="coffee"><a href="https://www.buymeacoffee.com/greatgatsby" target="_blank" rel="noopener">☕️</a></div>
        <div class="hide">A joke is added to our Dadabase when it is apparent</div>
    </footer>
</div>
`;

// https://css-tricks.com/things-ive-learned-css-grid-layout/
