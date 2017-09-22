import $ from 'jquery';
import MiscUtils from '../js/MiscUtils';
// import Main,{tileSet} from '../Component/Main'

export default function CreateCanvas(parentID, id, wArea, hArea) {



  id = id || CreateCanvas.DEFAULT_ID;

this.wArea = wArea;
this.hArea = hArea;

if (!(this instanceof CreateCanvas))
return new CreateCanvas(parentNode, this.tileSet, id);

if (parentID === undefined)
throw new Error('No container specified');
else if (this.tileSet === undefined)
throw new Error('No tileset specified');
else if (!this.tileSet.isValid)
throw new Error('Tileset is not valid!');

this._tileSet = this.tileSet;


  // Check the parent container exists
  var parentNode = $(MiscUtils.normaliseDOMid(parentID));
  parentNode = parentNode.length === 0 ? null : parentNode[0];
  if (parentNode === null)
    throw new Error('CreateCanvas container ID ' + parentID + ' not found');

  var height = CreateCanvas.DEFAULT_HEIGHT;
  var width = CreateCanvas.DEFAULT_WIDTH;

  // Create the canvas
  this._canvas = document.createElement('canvas');
  this._canvas.id = id;
  this._canvas.width = width;
  this._canvas.height = height;

    // Remove any existing element with the same id
    var existing = document.getElementById(id);
    if (existing !== null) {
      if (existing.parentNode === parentNode) {
        console.warn('There was already an object with the same ID as CreateCanvas - replacing it!');
        parentNode.replaceChild(this._canvas, existing);
      } else {
        console.warn('CreateCanvas id ' + id + ' already exists somewhere in document');
        throw new Error('ID ' + id + ' already exists in document!');
      }
    } else {
      parentNode.appendChild(this._canvas);
    }
  }
  
  
  // Paint an individual tile at the given map coordinates, with the tile scaled down to 3x3
  CreateCanvas.prototype._paintTile = function (tileVal, x, y, ctx) {
    var src = this._tileSet[tileVal];
    ctx.drawImage(src, x * 5, y * 5, 5, 5);
  };


  // Loop through the given map, painting each tile scaled down
  CreateCanvas.prototype.paint = function (map) {
    var ctx = this._canvas.getContext('2d');
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    for (var y = 0; y < map.height; y++) {
      for (var x = 0; x < map.width; x++) {
        this._paintTile(map.getTileValue(x, y), x, y, ctx);
      }
    }
  };


CreateCanvas.DEFAULT_WIDTH = this.wArea;
CreateCanvas.DEFAULT_HEIGHT = this.hArea;
CreateCanvas.DEFAULT_ID = 'canvasContainer';
