export default `
    .primaryTheme{
        font-family: var (--app-font-family);
    }

    .span4 .span6 .spanAll {
        grid-column-end: span -1;
    }

    @media (min-width: 650px) {
        .span4 {
            grid-column-end: span 4;
        }
        .span6 {
            grid-column-end: span 6;
        }
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 50px calc(100vh - 100px) 50px;
        width: 100vw;
    }

    @media (min-width: 700px) {
        .grid {
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: 100px calc(100vh - 200px) 100px;
            width: 100vw;
            heigth: 100vh;
        }
    }

    .wide, .hero, .header, .footer {
        grid-column: 1/-1
    }
`;

// https://css-tricks.com/things-ive-learned-css-grid-layout/
