export default (style, props) => `
<style>${style}</style>
<article class='primary'>
    <p class='joke'>
        <section part="headline" class='headline'>${props.headline}</section>
        <section part="punchline" class='punchline'>${props.punchline}</section>
        <section part="why" class='why'>
            <span>Why is this funny?</span>${props.why}
        </section>
    </p>
</article>
`;
