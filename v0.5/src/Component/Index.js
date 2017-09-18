import React, { Component } from 'react';
import '../css/style.css';
import $ from 'jquery';
import Tiles from '../images/tiles.png';
import TilesSnow from '../images/tilessnow.png';
import Sprites from '../images/sprites.png';

import AirplaneSprite from '../js/AirplaneSprite';
import AnimationManager from '../js/AnimationManager';
import BaseSprite from '../js/BaseSprite';
import BaseTool from '../js/BaseTool';
import BlockMap from '../js/BlockMap';
import BlockMapUtils from '../js/BlockMapUtils';
import BoatSprite from '../js/BoatSprite';
import BudgetWindow from '../js/BudgetWindow';
import BuildingTool from '../js/BuildingTool';
import BulldozerTool from '../js/BulldozerTool';
import Census from '../js/Census';
import Commercial from '../js/Commercial';
import Config from '../js/Config';
import CongratsWindow from '../js/CongratsWindow';
import ConnectingTool from '../js/ConnectingTool';
import Connector from '../js/Connector';
import CopterSprite from '../js/CopterSprite';
import DebugWindow from '../js/DebugWindow';
import Direction from '../js/Direction';
import DisasterManager from '../js/DisasterManager';
import DisasterWindow from '../js/DisasterWindow';
import EmergencyServices from '../js/EmergencyServices';
import Evaluation from '../js/Evaluation';
import EvaluationWindow from '../js/EvaluationWindow';
import EventEmitter from '../js/EventEmitter';
import ExplosionSprite from '../js/ExplosionSprite';
import Game from '../js/Game';
import GameCanvas from '../js/GameCanvas';
import GameMap from '../js/GameMap';
import GameTools from '../js/GameTools';
import Industrial from '../js/Industrial';
import InfoBar from '../js/InfoBar';
import Main from '../js/Main';
import MapGenerator from '../js/MapGenerator';
import MapScanner from '../js/MapScanner';
import Messages from '../js/Messages';
import MiscTiles from '../js/MiscTiles';
import MiscUtils from '../js/MiscUtils';
import ModalWindow from '../js/ModalWindow';
import MonsterSprite from '../js/MonsterSprite';
import MonsterTV from '../js/MonsterTV';
import MouseBox from '../js/MouseBox';
import NagWindow from '../js/NagWindow';
import Notification from '../js/Notification';
import ParkTool from '../js/ParkTool';
import polyfills from '../js/polyfills';
import PositionMaker from '../js/PositionMaker';
import PowerManager from '../js/PowerManager';
import QueryTool from '../js/QueryTool';
import QueryWindow from '../js/QueryWindow';
import RailTool from '../js/RailTool';
import Random from '../js/Random';
import RCI from '../js/RCI';
import RepairManager from '../js/RepairManager';
import Residential from '../js/Residential';
import Road from '../js/Road';
import RoadTool from '../js/RoadTool';
import SaveWindow from '../js/SaveWindow';
import ScreenshotLinkWindow from '../js/ScreenshotLinkWindow';
import ScreenshotWindow from '../js/ScreenshotWindow';
import SettingsWindow from '../js/SettingsWindow';
import Simulation from '../js/Simulation';
import SplashCanvas from '../js/SplashCanvas';
import SplashScreen from '../js/SplashScreen';
import SpriteConstants from '../js/SpriteConstants';
import SpriteManager from '../js/SpriteManager';
import SpriteUtils from '../js/SpriteUtils';
import Stadia from '../js/Stadia';
import Storage from '../js/Storage';
import Text from '../js/Text';
import Tile from '../js/Tile';
import TileHistory from '../js/TileHistory';
import TileSet from '../js/TileSet';
import TileSetSnowURI from '../js/TileSetSnowURI';
import TileSetURI from '../js/TileSetURI';
import TileUtils from '../js/TileUtils';
import TornadoSprite from '../js/TornadoSprite';
import TouchWarnWindow from '../js/TouchWarnWindow';
import Traffic from '../js/Traffic';
import TrainSprite from '../js/TrainSprite';
import Transport from '../js/Transport';
import Valves from '../js/Valves';
import WireTool from '../js/WireTool';
import WorldEffects from '../js/WorldEffects';
import ZoneUtils from '../js/ZoneUtils';

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
    //   window.setTimeout(onAllTilesLoaded, 0);
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



export default class Index extends Component {
    render() {
        return (
            <div>
                <img id="tiles" className="imageData" src={Tiles} alt="These are the game's principal tiles" />
                <img id="snowtiles" className="imageData" src={TilesSnow} alt="These are the game's alternate tiles" />
                <img id="sprites" className="imageData" src={Sprites} alt="These are the game's sprites" />
                <header id="header" className="chunk border-bottom padding10">
                    <div className="left inlineblock">
                        <h1 id="title" className="white fontlarge">micropolisJS</h1>
                    </div>
                    <nav className="white right padding10 inlineblock">
                        <ul>
                            <li className="padding10"><a href="about.html" target="_blank">About</a></li>
                            <li className="padding10"><a href="https://github.com/graememcc/micropolisJS" target="_blank">Github</a></li>
                        </ul>
                    </nav>
                </header>
                <div id="wrapper">
                        <main id="canvasContainer">
                            <div className="hidden" id="opaque"></div>
                            <div data-hasscript="false" id="loadingBanner" className="alignCenter padding10 mintcream chunk shadow centred">Loading</div>
                            <div id="splash" className="mintcream awaitGeneration open shadow padding10 centred" >
                                <h2 className="chunk alignCenter">Welcome!</h2>
                                <p>micropolisJS is a handmade Javascript port of the open-source city simulator <cite>Micropolis</cite></p>
                                <div id="splashContainer">

                                </div>
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
                                    <input id="nameForm" autofocus required className="margin10" type="text" maxlength="15" /> Difficulty
                            <input type="radio" className="difficulty" name="difficulty" id="difficultyEasy" value="0" checked="checked" />
                                    <label for="difficultyEasy">Easy</label>
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
                            <div id="tooSmall" data-hasscript="false" className="mintcream open">
                                <div id="tooSmallInner" className="alignCenter padding10">
                                    <h2 className="chunk">Uh-oh!</h2>
                                    <p>This screen is too small&mdash;I won't be able to fit in all the controls, buttons and gizmos! Sorry!</p>
                                </div>
                            </div>
                            <noscript>
                                <div id="noscript" className="open mintcream centred padding10">
                                    <h1 className="chunk alignCenter">micropolisJS</h1>
                                    <p className="padding10">Hey, thanks for your interest in micropolisJS!</p>
                                    <p className="padding10">Unfortunately, the <abbr title="Javascript">JS</abbr> stands for "<em>Javascript</em>", which appears to be disabled
                                  on your system. Consult your browser's documentation on how to enable Javascript!</p>
                                </div>
                            </noscript>
                        </main>
                    <footer id="footer" className="alignCenter chunk white padding10">
                        Support micropolisJS: <a className="nag" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GPU2AKWAYSNAL"
                            target="_blank">Click here, buy me a beer!</a>
                        <div id="author" className="open">Brought to you by <a rel="author" href="http://www.graememcc.co.uk" target="_blank">Graeme McCutcheon</a><i><a rel="author" href="https://twitter.com/graememcc" target="_blank">(@graememcc)</a></i>
                        </div>
                    </footer>
                    <div className="hidden modal shadow" id="budget">
                        <header id="budgetHeader" className="budgetHeader padding10 chunk alignCenter">
                            Budget
                    </header>
                        <div id="budgetFormContainer" className="padding10 open">
                            <form id="budgetForm">
                                <div id="taxInfo" className="elided budgetData">Tax Collected: <span id="taxesCollected"></span></div>
                                <div id="cashInfo" className="elided budgetRight budgetData">Cashflow: <span id="cashFlow"></span></div>
                                <div id="previousInfo" className="elided budgetData">Previous funds: <span id="previousFunds"></span></div>
                                <div id="currentInfo" className="elided budgetRight budgetData">Current funds: <span id="currentFunds"></span></div>
                                <fieldset>
                                    <legend>Roads</legend>
                                    <input type="range" id="roadRate" min="0" max="100" step="1" data-source="roadMaintenanceBudget" />
                                    <div>
                                        <label for="roadRate" className="elided budgetData" id="roadRateLabel">100% of $100 = $100</label>
                                    </div>
                                </fieldset>
                                <fieldset className="budgetRight">
                                    <legend>Fire</legend>
                                    <input type="range" id="fireRate" min="0" max="100" step="1" data-source="fireMaintenanceBudget" />
                                    <div>
                                        <label for="fireRate" className="elided budgetData" id="fireRateLabel">100% of $100 = $100</label>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Police</legend>
                                    <input type="range" id="policeRate" min="0" max="100" step="1" data-source="policeMaintenanceBudget" />
                                    <div>
                                        <label for="policeRate" className="elided budgetData" id="policeRateLabel">100% of $100 = $100</label>
                                    </div>
                                </fieldset>
                                <fieldset className="budgetRight">
                                    <legend>Tax</legend>
                                    <input type="range" id="taxRate" min="0" max="20" step="1" />
                                    <div>
                                        <label for="taxRate" className="elided budgetData" id="taxRateLabel">100% of $100 = $100</label>
                                    </div>
                                </fieldset>
                                <div id="budgetButtons" className="alignCenter">
                                    <button id="budgetReset">Reset</button>
                                    <button id="budgetCancel" className="width140 cancel">Cancel</button>
                                    <input type="submit" id="budgetOK" className="width140 dialogOK" value="OK" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="evalWindow">
                        <header id="evalHeader" className="evalHeader padding10 chunk alignCenter">
                            Evaluation
                    </header>
                        <div id="evalContainer" className="padding10 open">
                            <section id="opinion">
                                <h2 className="alignCenter">Public opinion</h2>
                                <dl className="opinionList alignCenter">
                                    <dt className="evalItem opinionItem">Is the mayor doing a good job?</dt>
                                    <dd className="evalItem opinionItem opinionRight">Yes: <span id="evalYes"></span>% No: <span id="evalNo"></span>%</dd>
                                    <dt>What are the worst problems?</dt>
                                    <dd className="evalItem opinionItem opinionRight">
                                        <ol id="problemList">
                                            <li id="evalProb1"></li>
                                            <li id="evalProb2"></li>
                                            <li id="evalProb3"></li>
                                            <li id="evalProb4"></li>
                                        </ol>
                                    </dd>
                                </dl>
                            </section>
                            <section id="statistics">
                                <h2 className="alignCenter">Statistics</h2>
                                <dl id="statisticsList">
                                    <dt className="evalItem statisticsItem">Population:</dt>
                                    <dd className="elided statisticsRight evalItem evalRight" id="evalPopulation"></dd>
                                    <dt className="evalItem statisticsItem">Net Migration:</dt>
                                    <dd className="elided statisticsRight evalItem evalRight" id="evalMigration"></dd>
                                    <dt className="evalItem statisticsItem">Assessed Value:</dt>
                                    <dd className="elided statisticsRight evalItem evalRight" id="evalValue"></dd>
                                    <dt className="evalItem statisticsItem">Category:</dt>
                                    <dd className="elided statisticsRight evalItem evalRight" id="evalClass"></dd>
                                    <dt className="evalItem statisticsItem">Game Level:</dt>
                                    <dd className="elided statisticsRight evalItem evalRight" id="evalLevel"></dd>
                                    <dt className="evalItem statisticsItem">Score:</dt>
                                    <dd className="elided statisticsRight evalItem evalRight" id="evalScore"></dd>
                                    <dt className="evalItem statisticsItem">Annual change:</dt>
                                    <dd className=" elided statisticsRight evalItem evalRight" id="evalScoreDelta"></dd>
                                </dl>
                            </section>
                            <form id="evalButtons" className="alignCenter margin10">
                                <input type="submit" id="evalOK" className="width140 dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="disasterWindow">
                        <header id="disasterHeader" className="disasterHeader padding10 chunk alignCenter">
                            Disasters
                    </header>
                        <div id="disasterContainer" className="padding10 open">
                            <form id="disasterForm">
                                <div id="disasterSelectContainer" className="alignCenter">
                                    <label id="disasterLabel" for="disasterSelect">What disaster do you want to befall this unsuspecting world?</label>
                                    <select id="disasterSelect">
                                        <option id="disasterNone" value="None">None</option>
                                        <option id="disasterMonster" value="Monster">Monster</option>
                                        <option id="disasterFire" value="None">Fire</option>
                                        <option id="disasterFlood" value="Flood">Flood</option>
                                        <option id="disasterCrash" value="Crash">Crash</option>
                                        <option id="disasterMeltdown" value="Meltdown">Meltdown</option>
                                        <option id="disasterTornado" value="Tornado">Tornado</option>
                                    </select>
                                </div>
                                <div id="disasterButtons" className="alignCenter margin10">
                                    <button id="disasterCancel" className="cancel">Cancel</button>
                                    <input type="submit" id="disasterOK" className="dialogOK" value="OK" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="queryWindow">
                        <header id="queryHeader" className="queryHeader padding10 chunk alignCenter">
                            Query
                    </header>
                        <div id="queryContainer" className="padding10 open">
                            <div className="queryList">
                                <dl>
                                    <dt className="queryItem">Zone</dt>
                                    <dd className="queryItem queryRight" id="queryZoneType"></dd>
                                    <dt className="queryItem">Density</dt>
                                    <dd className="queryItem queryRight" id="queryDensity"></dd>
                                    <dt className="queryItem">Value</dt>
                                    <dd className="queryItem queryRight" id="queryLandValue"></dd>
                                    <dt className="queryItem">Crime</dt>
                                    <dd className="queryItem queryRight" id="queryCrime"></dd>
                                    <dt className="queryItem">Pollution</dt>
                                    <dd className="queryItem queryRight" id="queryPollution"></dd>
                                    <dt className="queryItem">Growth</dt>
                                    <dd className="queryItem queryRight" id="queryRate"></dd>
                                </dl>
                                <div id="queryDebugList" className="queryDebug hidden">
                                    <dl>
                                        <dt className="queryItem">Tile</dt>
                                        <dd className="queryItem queryRight" id="queryTile"></dd>
                                        <dt className="queryItem">TileValue</dt>
                                        <dd className="queryItem queryRight" id="queryTileValue"></dd>
                                        <dt className="queryItem">FireStation</dt>
                                        <dd className="queryItem queryRight" id="queryFireStationRaw"></dd>
                                        <dt className="queryItem">FireStationEffect</dt>
                                        <dd className="queryItem queryRight" id="queryFireStationEffectRaw"></dd>
                                        <dt className="queryItem">TerrainDensity</dt>
                                        <dd className="queryItem queryRight" id="queryTerrainDensityRaw"></dd>
                                        <dt className="queryItem">PoliceStation</dt>
                                        <dd className="queryItem queryRight" id="queryPoliceStationRaw"></dd>
                                        <dt className="queryItem">PoliceStationEffect</dt>
                                        <dd className="queryItem queryRight" id="queryPoliceStationEffectRaw"></dd>
                                        <dt className="queryItem">ComRate</dt>
                                        <dd className="queryItem queryRight" id="queryComRateRaw"></dd>
                                        <dt className="queryItem">RateOfGrowth</dt>
                                        <dd className="queryItem queryRight" id="queryRateRaw"></dd>
                                        <dt className="queryItem">Pollution</dt>
                                        <dd className="queryItem queryRight" id="queryPollutionRaw"></dd>
                                        <dt className="queryItem">Crime</dt>
                                        <dd className="queryItem queryRight" id="queryCrimeRaw"></dd>
                                        <dt className="queryItem">LandValue</dt>
                                        <dd className="queryItem queryRight" id="queryLandValueRaw"></dd>
                                        <dt className="queryItem">Traffic Density</dt>
                                        <dd className="queryItem queryRight" id="queryTrafficDensityRaw"></dd>
                                        <dt className="queryItem">Density</dt>
                                        <dd className="queryItem queryRight" id="queryDensityRaw"></dd>
                                    </dl>
                                </div>
                            </div>
                            <div id="queryDebugTable" className="margin10 queryDebug hidden">
                                <table id="flagsTable">
                                    <thead>
                                        <tr>
                                            <th>Burn</th>
                                            <th>Bull</th>
                                            <th>Cond</th>
                                            <th>Anim</th>
                                            <th>Pow</th>
                                            <th>Zone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td id="queryTileBurnable"></td>
                                            <td id="queryTileBulldozable"></td>
                                            <td id="queryTileCond"></td>
                                            <td id="queryTileAnim"></td>
                                            <td id="queryTilePowered"></td>
                                            <td id="queryTileZone"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <form id="queryForm" className="alignCenter margin10">
                                <input type="submit" id="queryOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="congratsWindow">
                        <header id="congratsHeader" className="congratsHeader padding10 chunk alignCenter">
                            Congratulations!
                    </header>
                        <div id="congratsContainer" className="padding10 open">
                            <div id="congratsMessage" className="alignCenter">Congratulations!</div>
                            <form id="congratsForm" className="alignCenter margin10">
                                <input type="submit" id="congratsOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="nagWindow">
                        <header id="nagHeader" className="nagHeader padding10 chunk white alignCenter">
                            micropolisJS
                    </header>
                        <div id="nagContainer" className="padding10 open">
                            <div id="nagMessage" className="alignCenter">
                                Whoa! You've been playing this thing for half an hour?!? Please consider <a className="nag" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GPU2AKWAYSNAL"
                                    target="_blank">supporting micropolisJS</a> so it can become even better!
                        </div>
                            <form id="nagForm" className="alignCenter margin10">
                                <input type="submit" id="nagOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="saveWindow">
                        <header id="saveHeader" className="saveHeader padding10 chunk alignCenter">
                            Save
                    </header>
                        <div id="saveContainer" className="alignCenter padding10 open">
                            Game Saved!
                        <form id="saveForm" className="alignCenter margin10">
                                <input type="submit" id="saveOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="screenshotLinkWindow">
                        <header id="screenshotLinkHeader" className="screenshotHeader padding10 chunk alignCenter">
                            Take Picture
                    </header>
                        <div id="screenshotLinkContainer" className="padding10 open">
                            <div id="screenshotLinkMessage" className="alignCenter">
                                Click <a id="screenshotLink" target="_blank">here</a> to view your picture (right-click to save)
                        </div>
                            <form id="screenshotLinkForm" className="alignCenter margin10">
                                <input type="submit" id="screenshotLinkOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="screenshotWindow">
                        <header id="screenshotHeader" className="screenshotHeader white padding10 chunk alignCenter">
                            Take Picture
                    </header>
                        <div id="screenshotContainer" className="padding10 open">
                            <form id="screenshotForm" className="alignCenter margin10">
                                <div id="screenshotContainerDiv">
                                    Area to take picture of:
                                <input type="radio" className="screenshotType" name="screenshotType" id="screenshotVisible" value="visible" checked="checked" />
                                    <label for="screenshotVisible">Visible Map</label>
                                    <input type="radio" className="screenshotType" name="screenshotType" id="screenshotAll" value="all" /><label for="screenshotAll">Full map</label>
                                </div>
                                <button id="screenshotCancel" className="cancel">Cancel</button>
                                <input type="submit" id="screenshotOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="settingsWindow">
                        <header id="settingsHeader" className="settingsHeader white padding10 chunk alignCenter">
                            Settings
                    </header>
                        <div id="settingsContainer" className="padding10 open">
                            <form id="settingsForm" className="alignCenter margin10">
                                <div id="settingsFormContainer">
                                    <div id="autoBudgetSelect" className="padding10">
                                        Autobudget:
                                    <input type="radio" className="autoBudgetSetting" name="autoBudgetSetting" id="autoBudgetYes" value="true" checked="checked" />
                                        <label for="autoBudgetYes">Yes</label>
                                        <input type="radio" className="autoBudgetSetting" name="autoBudgetSetting" id="autoBudgetNo" value="false" />
                                        <label for="autoBudgetNo">No</label>
                                    </div>
                                    <div id="autoBulldozeSelect" className="padding10">
                                        Autobulldoze:
                                    <input type="radio" className="autoBulldozeSetting" name="autoBulldozeSetting" id="autoBulldozeYes" value="true" checked="checked" />
                                        <label for="autoBulldozeYes">Yes</label>
                                        <input type="radio" className="autoBulldozeSetting" name="autoBulldozeSetting" id="autoBulldozeNo" value="false" />
                                        <label for="autoBulldozeNo">No</label>
                                    </div>
                                    <div id="speedSelect" className="padding10">
                                        Speed:
                                    <input type="radio" className="speedSetting" name="speedSetting" id="speedSlow" value="1" checked="checked" />
                                        <label for="speedSlow">Slow</label>
                                        <input type="radio" className="speedSetting" name="speedSetting" id="speedMed" value="2" /><label for="speedMed">Medium</label>
                                        <input type="radio" className="speedSetting" name="speedSetting" id="speedFast" value="3" /><label for="speedFast">Fast</label>
                                    </div>
                                    <div id="disastersSelect" className="padding10">
                                        Disasters:
                                    <input type="radio" className="enableDisastersSetting" name="disastersSetting" id="disastersYes" value="true" checked="checked" />
                                        <label for="disastersYes">Yes</label>
                                        <input type="radio" className="enableDisastersSetting" name="disastersSetting" id="disastersNo" value="false" />
                                        <label for="disastersNo">No</label>
                                    </div>
                                </div>
                                <button id="settingsCancel" className="cancel">Cancel</button>
                                <input type="submit" id="settingsOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="debugWindow">
                        <header id="debugHeader" className="debugHeader white padding10 chunk alignCenter">
                            Debug
                    </header>
                        <div id="debugContainer" className="padding10 open">
                            <form id="debugForm" className="alignCenter margin10">
                                <div id="debugFundContainer">
                                    Add funds:
                                <input type="radio" className="debugAdd" name="debugAdd" id="fundsYes" value="true" checked="checked" /><label for="fundsYes">Yes</label>
                                    <input type="radio" className="debugAdd" name="debugAdd" id="fundsNo" value="false" /><label for="fundsNo">No</label>
                                </div>
                                <button id="debugCancel" className="cancel">Cancel</button>
                                <input type="submit" id="debugOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="hidden modal shadow" id="touchWarnWindow">
                        <header id="touchHeader" className="touchHeader white padding10 chunk alignCenter">
                            Hello, touchscreen user!
                    </header>
                        <div id="touchContainer" className="padding10 open">
                            <h2 className="alignCenter">Hi!</h2>
                            <p className="padding10">
                                It seems you're using a touchscreen device!
                        </p>
                            <p className="padding10">
                                Just to warn you, micropolisJS isn't really geared towards touch devices&mdash;I don't own a tablet&mdash;so you might be
                             in for a bad time.
                        </p>
                            <p className="padding10">
                                However, if you're wanting to give it a shot, I won't stop you!
                        </p>
                            <form id="touchForm" className="alignCenter margin10">
                                <input type="submit" id="touchOK" className="dialogOK" value="OK" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}