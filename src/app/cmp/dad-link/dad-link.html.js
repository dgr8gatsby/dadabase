export default (style, props) => `
<style>${style}</style>
<span class="primary">
<a href="#${props.linkRoute}">${props.linkName}</a>
</span>
`;
