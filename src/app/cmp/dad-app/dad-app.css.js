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
        header {
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: 100px;
        }
    }

    .wide, .hero, .header, .footer {
        grid-column: 1/-1
    }

    main {
        padding: 10px;
        font-size: 6vw;
    }

    footer, header {
        padding: 10px;
    }

    footer {
        align-self: center; 
        justify-self: center;
    }

    header {
        display: inline-grid;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: 25px;
        align-items: center;
        justify-items: center;
        margin: 0px;
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

    a {     
        color: black;
        padding: 12px;
        text-decoration: none;
        font-size: 14px; 
        line-height: 25px;
        border-radius: 4px;
        margin: 1px;
    }
    a:hover {
        border: 1px solid #ddd;
        color: black;
        margin: -5px;
        background-color:#EB8400;
        font-size: 28px;
    }
    a.active {
        background-color: dodgerblue;
        color: white;
    }

    .coffee{
        position: fixed;
        bottom: 25px;
        right: 15px;
        padding: 8px;
    }

    button {
        padding: 0;
        border: none;
        font: inherit;
        color: inherit;
        background-color: transparent;
        cursor: hand;
    }

    .btn {
        /* default for <button>, but useful for <a> */
        display: inline-block;
        text-align: center;
        text-decoration: none;
      
        /* create a small space when buttons wrap on 2 lines */
        margin: 2px 0;
      
        /* invisible border (will be colored on hover/focus) */
        border: solid 1px transparent;
        border-radius: 4px;
      
        /* size comes from text & padding (no width/height) */
        padding: 0.5em 1em;
      
        /* make sure colors have enough contrast! */
        color: #EB8400;
        background-color: #FDFBD0;

        transition: font-size .5s;
      }

      /* inverse colors on hover */
    .btn:hover {
        font-size: 200%;
        animation-name: grow;
        animation-duration: .5s;
    }

    /* make sure we have a visible focus ring */
    .btn:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.5),
            0 0 0 1.5px rgba(255, 105, 180, 0.5);
    }

    /******************************
     * Animations
     */
    @keyframes grow {
        from {font-size: 100%}
        to {font-size: 200%}
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
