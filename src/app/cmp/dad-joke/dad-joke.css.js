export default `
.primary {
    font-family: var(--app-font-family);
}

/* Large Screen */
    @media (min-width: 700px) {
    .headline {
        font-size:6vw;
    }

    .punchline {
        font-size: 4vw;
        margin-top: 50px;;
        text-align:right;
    }
}

.headline {
    font-size:4vw;
}

.punchline {
    font-size: 4vw;
    margin-top: 10px;
    text-align:right;
}

.why {
    display: none;
    margin-top: 50px;
    font-size: calc(12px + 1.5vw);
    font-style: italic;
    color: #CDCDCD;
}

.why span {
    margin-right: 10px;
}
`;
