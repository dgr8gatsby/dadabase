export default `
    .primaryTheme{
        font-family: var (--app-font-family);
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 50px calc(100vh - 100px) 50px;
        width: 100vw;
    }

    /* Large Screen */
    @media (min-width: 700px) {
        .grid {
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: 100px calc(100vh - 200px) 100px;
            width: 100vw;
            heigth: 100vh;
        }
        main {
            padding: 50px;
            font-size: 10vw;
            align-self: center; 
        }
    }

    .header{
        margin-top: 15px;
    }
    .wide, .hero, .header, .footer {
        grid-column: 1/-1
    }

    main {
        padding: 50px;
        font-size: 8vw;
    }

    footer, header {
        padding: 10px;
    }

    footer {
        align-self: center; 
        justify-self: center;
    }

    header {
        display: flex;
        align-items: center;
        margin: 2em;
    }

    .logo, nav{
        flex: 1;
    }

    nav ul {
        display: flex;
        justify-content: flex-end;
    }

    nav li {
        list-style: none;
    }

    .hide {
        display:none;
    }
`;

// https://css-tricks.com/things-ive-learned-css-grid-layout/

/*
Example 
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
*/
