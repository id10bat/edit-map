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

import Index from '../Component/Index';

/*
 *
 * Our task in main is to load the tile image, create a TileSet from it, and then tell the SplashScreen to display
 * itself. We will never return here.
 *
 */
export function Main() {

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
}
