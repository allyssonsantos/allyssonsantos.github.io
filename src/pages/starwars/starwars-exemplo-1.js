import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
        padding: 0;
        margin: 0;
      }
      body {
        background: #000;
        color: #f2cb06;
        font-family: 'Helvetica-neue', 'Helvetica', sans-serif;
        overflow: hidden;
      }
      .container {
        max-width: 1000px;
        margin: 0 auto;
        position: relative;
      }
      .shadow {
        height: 100px;
        background-color: #000;
        box-shadow: 0px 10px 20px #000;
        position: relative;
        z-index: 100;
      }
      .logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        -webkit-animation-name: logo;
        -webkit-animation-duration: 15s;
        -webkit-animation-timing-function: linear;
        -moz-animation-name: logo;
        -moz-animation-duration: 15s;
        -moz-animation-timing-function: linear;
        animation-name: logo;
        animation-duration: 15s;
        animation-timing-function: linear;
      }

      @keyframes logo {
        from {
          transform: translate(-50%, -50%) scale(2);
        }
        to {
          transform: translate(-50%, -50%) scale(0);
        }
      }

      @-webkit-keyframes logo {
        from {
          -webkit-transform: translate(-50%, -50%) scale(2);
        }
        to {
          -webkit-transform: translate(-50%, -50%) scale(0);
        }
      }
      @-moz-keyframes logo {
        from {
          -moz-transform: translate(-50%, -50%) scale(2);
        }
        to {
          -moz-transform: translate(-50%, -50%) scale(0);
        }
      }
`;

const Starwars = () => (
  <>
    <GlobalStyle />
    <div className="shadow"></div>
    <img src="/starwars.svg" className="logo" />
    <div className="container">
      <div className="texto">
        <h1 className="titulo">Episode VII</h1>
        <h2 className="titulo subtitulo">The force awakens</h2>
        <p>
          It is a time of hope for the restored Republic. The last Imperial
          loyalists have been pushed back to the Outer Rim Territories.
        </p>
        <p>
          Chased across the galaxy by the Republic, the last remnants of the
          Galactic Empire have started raiding outposts in the outlying systems,
          desperate to replenish their dwindling supplies.
        </p>
        <p>
          With a large Republic fleet closing in on their position, the
          Imperials gather above the Outer Rim world of Tatooine, ready to make
          their last stand...
        </p>
      </div>
    </div>
  </>
);

export default Starwars;
