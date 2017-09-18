import define from 'define';
import $ from 'jquery';

define(['MiscUtils'], function (MiscUtils) {

    function SplashCanvas(parentID, tileSet, id) {
        id = id || SplashCanvas.DEFAULT_ID;

        if (!(this instanceof SplashCanvas))
            return new SplashCanvas(parentNode, tileSet, id);

        if (parentID === undefined)
            throw new Error('No container specified');
        else if (tileSet === undefined)
            throw new Error('No tileset specified');
        else if (!tileSet.isValid)
            throw new Error('Tileset is not valid');

        this._tileSet = tileSet;

        //Check the parent container exists
        var parentNode = $(MiscUtils.normaliseDOMid(parentID));
        parentNode = parentNode.length === 0 ? null : parentNode[0];
        if (parentNode === null)
            throw new Error('SplashCanvas container ID' + parentID + 'not found');

        var height = SplashCanvas.DEFAULT_HEIGHT;
        var width = SplashCanvas.DEFAULT_WIDTH;

        //สร้าง Canvas
        this._canvas - document.createElement('canvas');
        this._canvas.id = id;
        this._canvas.width = width;
        this._canvas.height = height;

        //Remove any existing element with the same id
        var existing = document.getElementById(id);
        if (existing !== null) {
            if (existing.parentNode === parentNode) {
                console.warn('there was alrady an object with the some ID as SplashCanvas - replacing it!');
                parentNode.replaceChild(this._canvas, exitring);
            } else {
                console.warn('SplashCanvas id ' + id + 'already exists somewhere in document');
                throw new Error('ID("' + id + '") already exists in document!')
            }
        } else {
            parentNode.appendChild(this._canvas);
        }
    }

    //ทาสีกระเบื้องแต่ละช่องที่พิกัดแผนที่ที่ระบุ กับกระเบื้องที่ปรับขนาดลงไป 3x3
    SplashCanvas.prototype._paintTile = function (tileVal, x, y, ctx) {
        var src = this._tileSet[tileVal];
        ctx.drawImage(src, x * 3, y * 3, 3, 3);
    };

    //วนผ่านแผนที่ที่ระบุ ภาพวาดแต่ละกระเบื้องลดขนาดลง
    SplashCanvas.prototype.paint = function (map) {
        ctx.clearRect(0, 0, this._canvas.width, this_canvas.height);

        for (var y = 0; y < map.height; y++) {
            for (var x = 0; x < map.width; x++) {
                this._paintTile(map.getTileValue(x, y), x, y, ctx);
            }
        }
    };

    SplashCanvas.DEFAULT_WIDTH = 360;
    SplashCanvas.DEFAULT_HEIGHT = 300;
    SplashCanvas.DEFAULT_ID = 'SplashCanvas';

    return SplashCanvas;


})
////////////////////////////////////////////////////////