import React from 'react';
import $ from 'jquery';
import { Config } from '../js/Config';
import { SplashScreen } from '../js/SplashScreen';
import { TileSet } from '../js/TileSet';
import { TileSetURI } from '../js/TileSetURI';
import { TileSetSnowURI } from '../js/TileSetSnowURI';
import Tiles from '../images/tiles.png';
import Tilessnow from '../images/tilessnow.png';
import Sprites from '../images/sprites.png';
import '../css/style.css'


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
            <div className="hidden" id="opaque"></div>
            <div data-hasscript="false" id="loadingBanner" className="alignCenter padding10 mintcream chunk shadow centred">Loading</div>
            <div id="splash" className="mintcream awaitGeneration open shadow padding10 centred">
              <h2 className="chunk alignCenter">Welcome!</h2>
              <p>micropolisJS is a handmade Javascript port of the open-source city simulator <cite>Micropolis</cite></p>
              <div id="splashContainer"></div>
              <div id="splashButtonContainer">
                <div id="splashButtons">
                  <button id="splashLoad" className="width140 block loadSave splashButton" disabled>Load game</button>
                  <button id="splashPlay" className="width140 block margin10 splashButton">Play this map</button>
                  <button id="splashGenerate" className="width140 block margin10 splashButton">Generate another</button>
                </div>
              </div>
            </div>
            <div id="start" className="mintcream open shadow padding10 centred">
              <h2 className="chunk alignCenter">New Game</h2>
              <form id="playForm">
                <label for="nameForm">City name (max 15 letters)</label>
                <input id="nameForm" autofocus required className="margin10" type="text" maxlength="15" />
                Difficulty
            <input type="radio" className="difficulty" name="difficulty" id="difficultyEasy" value="0" checked="checked" /><label for="difficultyEasy">Easy</label>
                <input type="radio" className="difficulty" name="difficulty" id="difficultyMed" value="1" /><label for="difficultyMed">Medium</label>
                <input type="radio" className="difficulty" name="difficulty" id="difficultyHard" value="2" /><label for="difficultyHard">Hard</label>
                <div id="playSubmitDiv">
                  <input id="playit" type="submit" value="Play!" />
                </div>
              </form>
            </div>
            <div id="infobar" className="alignCenter leftedge open width140 padding10 controlShadow mintcream z1 initialHidden">
              <div className="inner">
                <div className="semibold chunk">
                  <span id="name">Your Name Here</span>
                </div>
                <div>
                  <span id="date">Jan 1900</span>
                </div>
                <div className="elided">
                  Funds $<span id="funds">20000</span>
                </div>
                <div className="elided">
                  Score: <span id="score">0</span>
                </div>
                <div>
                  <span id="cclass">VILLAGE</span>
                </div>
                <div className="elided">
                  Population:<br /> <span id="population">0</span>
                </div>
              </div>
            </div>
            <div id="miscButtons" className="alignCenter leftedge open controlShadow width140 padding10 mintcream z1 initialHidden">
              <div className="inner">
                <div>
                  <button id="budgetRequest" className="miscButton">Budget</button>
                </div>
                <div>
                  <button id="evalRequest" className="miscButton">Evaluation</button>
                </div>
                <div>
                  <button id="disasterRequest" className="miscButton">Disasters</button>
                </div>
                <div>
                  <button id="saveRequest" className="miscButton loadSave" disabled>Save</button>
                </div>
                <div>
                  <button id="settingsRequest" className="miscButton">Settings</button>
                </div>
                <div>
                  <button id="screenshotRequest" className="miscButton">Take Picture</button>
                </div>
                <div>
                  <button id="pauseRequest" className="miscButton">Pause</button>
                </div>
              </div>
            </div>
            <div id="RCIContainer" className="controlShadow leftedge width140 padding10 mintcream z1 initialHidden"></div>
            <div id="controls" className="controlShadow mintcream z1 initialHidden rightedge open">
              <div id="toolInfo" className="alignCenter"><span id="toolOutput">Tools</span></div>
              <div id="buttons">
                <button id="residentialButton" data-size="3" data-tool="residential" data-colour="lime" className="toolButton unselected">Residential $100</button>
                <button id="nuclearButton" data-size="4" data-tool="nuclear" data-colour="mistyrose" className="toolButton unselected">Nuclear $5000</button>
                <button id="commercialButton" data-size="3" data-tool="commercial" data-colour="blue" className="toolButton unselected">Commercial $100</button>
                <button id="coalButton" data-size="4" data-tool="coal" data-colour="gray" className="toolButton unselected">Coal $3000</button>
                <button id="industrialButton" data-size="3" data-tool="industrial" data-colour="yellow" className="toolButton unselected">Industrial $100</button>
                <button id="policeButton" data-size="3" data-tool="police" data-colour="darkblue" className="toolButton unselected">Police $500</button>
                <button id="roadButton" data-size="1" data-tool="road" data-colour="black" className="toolButton unselected">Road $10</button>
                <button id="fireButton" data-size="3" data-tool="fire" data-colour="red" className="toolButton unselected">Fire $500</button>
                <button id="railButton" data-size="1" data-tool="rail" data-colour="brown" className="toolButton unselected">Rail $20</button>
                <button id="portButton" data-size="4" data-tool="port" data-colour="dodgerblue" className="toolButton unselected">Port $3000</button>
                <button id="wireButton" data-size="1" data-tool="wire" data-colour="khaki" className="toolButton unselected">Wire $5</button>
                <button id="stadiumButton" data-size="4" data-tool="stadium" data-colour="indigo" className="toolButton unselected">Stadium $5000</button>
                <button id="bulldozerButton" data-size="1" data-tool="bulldozer" data-colour="salmon" className="toolButton unselected">Bulldozer $1</button>
                <button id="airportButton" data-size="6" data-tool="airport" data-colour="violet" className="toolButton unselected">Airport $10000</button>
                <button id="queryButton" data-size="1" data-tool="query" data-colour="cyan" className="toolButton unselected">Query</button>
                <button id="parkButton" data-size="1" data-tool="park" data-colour="darkgreen" className="toolButton unselected">Park $10</button>
              </div>
            </div>
            <div id="tw" className="z1 rightedge initialHidden">
              <a className="twitter-share-button" href="https://twitter.com/share?count=none" data-text="I'm city-building like it's 1989! Playing micropolisJS, a HTML5 retro city-builder http://micropolisjs.graememcc.co.uk/">Tweet</a>
              <script type="text/javascript">{window.twttr = (function (d, s, id) { var t, js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) { return } js = d.createElement(s); js.id = id; js.src = "https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } }) }(document, "script", "twitter-wjs"))}</script>
            </div>
            <div id="monstertv" className="alignCenter z1 hidden rightedge padding10 controlShadow open">
              <div id="monsterTVContainer">
                <div id="tvContainer">
                </div>
                <form id="monsterTVForm">
                  <input type="submit" value="Close" className="width140 cancel" />
                </form>
              </div>
            </div>
            <div id="debug" className="alignCenter z1 rightedge padding10 mintcream controlShadow open">
              <div id="fps">
                <span id="fpsValue">0</span> FPS
          </div>
              <div>
                <button id="debugRequest">Debug</button>
              </div>
            </div>
            <div id="notifications" className="initialHidden neutral z1 rightedge alignCenter elided padding10 controlShadow"></div>
            <div id="tooSmall" data-hasscript="false" className="mintcream open"><div id="tooSmallInner" className="alignCenter padding10"><h2 className="chunk">Uh-oh!</h2><p>This screen is too small&mdash;I won't be able to fit in all the controls, buttons and gizmos! Sorry!</p></div></div>
            <noscript>
              <div id="noscript" className="open mintcream centred padding10">
                <h1 className="chunk alignCenter">micropolisJS</h1>
                <p className="padding10">Hey, thanks for your interest in micropolisJS!</p>
                <p className="padding10">Unfortunately, the <abbr title="Javascript">JS</abbr> stands for "<em>Javascript</em>", which appears to be disabled on your system. Consult your browser's documentation on how to enable Javascript!</p>
              </div>
            </noscript>
          </main>
        </div>
      </div>
    )
  }
}