/* micropolisJS. Adapted by Graeme McCutcheon from Micropolis.
 *
 * This code is released under the GNU GPL v3, with some additional terms.
 * Please see the files LICENSE and COPYING for details. Alternatively,
 * consult http://micropolisjs.graememcc.co.uk/LICENSE and
 * http://micropolisjs.graememcc.co.uk/COPYING
 *
 */
import React from 'react';
import $ from 'jquery';
import require from 'require';
import Tiles from '../images/tiles.png';
import Tilessnow from '../images/tilessnow.png';
import Sprites from '../images/sprites.png';
import '../css/style.css'

require(['Config', 'SplashScreen', 'TileSet', 'TileSetURI', 'TileSetSnowURI'],
  function (Config, SplashScreen, TileSet, TileSetURI, TileSetSnowURI) {
    "use strict";


    /*
     *
     * Our task in main is to load the tile image, create a TileSet from it, and then tell the SplashScreen to display
     * itself. We will never return here.
     *
     */


    var fallbackImage, tileSet, snowTileSet;


    var onTilesLoaded = function () {
      var snowTiles = $('#snowtiles')[1];
      snowTileSet = new TileSet(snowTiles, onAllTilesLoaded, onFallbackTilesLoaded);
    };


    var onAllTilesLoaded = function () {
      // Kick things off properly
      var sprites = $('#sprites')[0];
      if (sprites.complete) {
        $('#loadingBanner').css('display', 'none');
        var s = new SplashScreen(tileSet, snowTileSet, sprites);
      } else {
        window.setTimeout(onAllTilesLoaded, 0);
      }
    };


    // XXX Replace with an error dialog
    var onFallbackError = function () {
      fallbackImage.onload = fallbackImage.onerror = null;
      alert('Failed to load tileset!');
    };


    var onFallbackSnowLoad = function () {
      fallbackImage.onload = fallbackImage.onerror = null;
      snowTileSet = new TileSet(fallbackImage, onAllTilesLoaded, onFallbackError);
    };


    var onFallbackTilesLoaded = function () {
      fallbackImage = new Image();
      fallbackImage.onload = onFallbackSnowLoad;
      fallbackImage.onerror = onFallbackError;
      fallbackImage.src = TileSetSnowURI;
    };


    var onFallbackLoad = function () {
      fallbackImage.onload = fallbackImage.onerror = null;
      tileSet = new TileSet(fallbackImage, onFallbackTilesLoaded, onFallbackError);
    };


    var tileSetError = function () {
      // We might be running locally in Chrome, which handles the security context of file URIs differently, which makes
      // things go awry when we try to create an image from a "tainted" canvas (one we've painted on). Let's try creating
      // the tileset by URI instead
      fallbackImage = new Image();
      fallbackImage.onload = onFallbackLoad;
      fallbackImage.onerror = onFallbackError;
      fallbackImage.src = TileSetURI;
    };


    // Check for debug parameter in URL
    Config.debug = window.location.search.slice(1).split('&').some(function (param) {
      return param.trim().toLowerCase() === 'debug=1';
    });


    var tiles = $('#tiles')[0];
    tileSet = new TileSet(tiles, onTilesLoaded, tileSetError);
    var snowtiles = $('#snowtiles')[1];
  });


export default class Main extends React.Component {
  render() {
    return (
      <div>
        <img id="tiles" className="imageData" src={Tiles} alt="These are the game's principal tiles" />
        <img id="snowtiles" className="imageData" src={Tilessnow} alt="These are the game's alternate tiles" />
        <img id="sprites" className="imageData" src={Sprites} alt="These are the game's sprites" />
        <header id="header" className="chunk border-bottom padding10">
          <div className="left inlineblock">
            <h1 id="title" className="white fontlarge">micropolisJS</h1>
          </div>
        </header>
        <div id="wrapper">
          <main id="canvasContainer">
            <div class="hidden" id="opaque"></div>
            <div data-hasscript="false" id="loadingBanner" class="alignCenter padding10 mintcream chunk shadow centred">Loading</div>
            <div id="splash" class="mintcream awaitGeneration open shadow padding10 centred">
              <h2 class="chunk alignCenter">Welcome!</h2>
              <p>micropolisJS is a handmade Javascript port of the open-source city simulator <cite>Micropolis</cite></p>
              <div id="splashContainer"></div>
              <div id="splashButtonContainer">
                <div id="splashButtons">
                  <button id="splashLoad" class="width140 block loadSave splashButton" disabled>Load game</button>
                  <button id="splashPlay" class="width140 block margin10 splashButton">Play this map</button>
                  <button id="splashGenerate" class="width140 block margin10 splashButton">Generate another</button>
                </div>
              </div>
            </div>
            <div id="start" class="mintcream open shadow padding10 centred">
              <h2 class="chunk alignCenter">New Game</h2>
              <form id="playForm">
                <label for="nameForm">City name (max 15 letters)</label>
                <input id="nameForm" autofocus required class="margin10" type="text" maxlength="15" />
                Difficulty
            <input type="radio" class="difficulty" name="difficulty" id="difficultyEasy" value="0" checked="checked" /><label for="difficultyEasy">Easy</label>
                <input type="radio" class="difficulty" name="difficulty" id="difficultyMed" value="1" /><label for="difficultyMed">Medium</label>
                <input type="radio" class="difficulty" name="difficulty" id="difficultyHard" value="2" /><label for="difficultyHard">Hard</label>
                <div id="playSubmitDiv">
                  <input id="playit" type="submit" value="Play!" />
                </div>
              </form>
            </div>
            <div id="infobar" class="alignCenter leftedge open width140 padding10 controlShadow mintcream z1 initialHidden">
              <div class="inner">
                <div class="semibold chunk">
                  <span id="name">Your Name Here</span>
                </div>
                <div>
                  <span id="date">Jan 1900</span>
                </div>
                <div class="elided">
                  Funds $<span id="funds">20000</span>
                </div>
                <div class="elided">
                  Score: <span id="score">0</span>
                </div>
                <div>
                  <span id="cclass">VILLAGE</span>
                </div>
                <div class="elided">
                  Population:<br /> <span id="population">0</span>
                </div>
              </div>
            </div>
            <div id="miscButtons" class="alignCenter leftedge open controlShadow width140 padding10 mintcream z1 initialHidden">
              <div class="inner">
                <div>
                  <button id="budgetRequest" class="miscButton">Budget</button>
                </div>
                <div>
                  <button id="evalRequest" class="miscButton">Evaluation</button>
                </div>
                <div>
                  <button id="disasterRequest" class="miscButton">Disasters</button>
                </div>
                <div>
                  <button id="saveRequest" class="miscButton loadSave" disabled>Save</button>
                </div>
                <div>
                  <button id="settingsRequest" class="miscButton">Settings</button>
                </div>
                <div>
                  <button id="screenshotRequest" class="miscButton">Take Picture</button>
                </div>
                <div>
                  <button id="pauseRequest" class="miscButton">Pause</button>
                </div>
              </div>
            </div>
            <div id="RCIContainer" class="controlShadow leftedge width140 padding10 mintcream z1 initialHidden"></div>
            <div id="controls" class="controlShadow mintcream z1 initialHidden rightedge open">
              <div id="toolInfo" class="alignCenter"><span id="toolOutput">Tools</span></div>
              <div id="buttons">
                <button id="residentialButton" data-size="3" data-tool="residential" data-colour="lime" class="toolButton unselected">Residential $100</button>
                <button id="nuclearButton" data-size="4" data-tool="nuclear" data-colour="mistyrose" class="toolButton unselected">Nuclear $5000</button>
                <button id="commercialButton" data-size="3" data-tool="commercial" data-colour="blue" class="toolButton unselected">Commercial $100</button>
                <button id="coalButton" data-size="4" data-tool="coal" data-colour="gray" class="toolButton unselected">Coal $3000</button>
                <button id="industrialButton" data-size="3" data-tool="industrial" data-colour="yellow" class="toolButton unselected">Industrial $100</button>
                <button id="policeButton" data-size="3" data-tool="police" data-colour="darkblue" class="toolButton unselected">Police $500</button>
                <button id="roadButton" data-size="1" data-tool="road" data-colour="black" class="toolButton unselected">Road $10</button>
                <button id="fireButton" data-size="3" data-tool="fire" data-colour="red" class="toolButton unselected">Fire $500</button>
                <button id="railButton" data-size="1" data-tool="rail" data-colour="brown" class="toolButton unselected">Rail $20</button>
                <button id="portButton" data-size="4" data-tool="port" data-colour="dodgerblue" class="toolButton unselected">Port $3000</button>
                <button id="wireButton" data-size="1" data-tool="wire" data-colour="khaki" class="toolButton unselected">Wire $5</button>
                <button id="stadiumButton" data-size="4" data-tool="stadium" data-colour="indigo" class="toolButton unselected">Stadium $5000</button>
                <button id="bulldozerButton" data-size="1" data-tool="bulldozer" data-colour="salmon" class="toolButton unselected">Bulldozer $1</button>
                <button id="airportButton" data-size="6" data-tool="airport" data-colour="violet" class="toolButton unselected">Airport $10000</button>
                <button id="queryButton" data-size="1" data-tool="query" data-colour="cyan" class="toolButton unselected">Query</button>
                <button id="parkButton" data-size="1" data-tool="park" data-colour="darkgreen" class="toolButton unselected">Park $10</button>
              </div>
            </div>
            <div id="tw" class="z1 rightedge initialHidden">
              <a class="twitter-share-button" href="https://twitter.com/share?count=none" data-text="I'm city-building like it's 1989! Playing micropolisJS, a HTML5 retro city-builder http://micropolisjs.graememcc.co.uk/">Tweet</a>
              <script type="text/javascript">{window.twttr = (function (d, s, id) { var t, js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) { return } js = d.createElement(s); js.id = id; js.src = "https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } }) }(document, "script", "twitter-wjs"))}</script>
            </div>
            <div id="monstertv" class="alignCenter z1 hidden rightedge padding10 controlShadow open">
              <div id="monsterTVContainer">
                <div id="tvContainer">
                </div>
                <form id="monsterTVForm">
                  <input type="submit" value="Close" class="width140 cancel" />
                </form>
              </div>
            </div>
            <div id="debug" class="alignCenter z1 rightedge padding10 mintcream controlShadow open">
              <div id="fps">
                <span id="fpsValue">0</span> FPS
          </div>
              <div>
                <button id="debugRequest">Debug</button>
              </div>
            </div>
            <div id="notifications" class="initialHidden neutral z1 rightedge alignCenter elided padding10 controlShadow"></div>
            <div id="tooSmall" data-hasscript="false" class="mintcream open"><div id="tooSmallInner" class="alignCenter padding10"><h2 class="chunk">Uh-oh!</h2><p>This screen is too small&mdash;I won't be able to fit in all the controls, buttons and gizmos! Sorry!</p></div></div>
            <noscript>
              <div id="noscript" class="open mintcream centred padding10">
                <h1 class="chunk alignCenter">micropolisJS</h1>
                <p class="padding10">Hey, thanks for your interest in micropolisJS!</p>
                <p class="padding10">Unfortunately, the <abbr title="Javascript">JS</abbr> stands for "<em>Javascript</em>", which appears to be disabled on your system. Consult your browser's documentation on how to enable Javascript!</p>
              </div>
            </noscript>
          </main>
        </div>
      </div>
    )
  }
}