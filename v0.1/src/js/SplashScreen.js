import define from 'define';
import $ from 'jquery';
import {user} from '../ConfigFirebase/Authentication';

define(['Config','MapGrenerator','SpriteCanvas'], function (Config, MapGrenerator, SpriteCanvas) {

    var onresize = null; //null

    //ถ้า window มีขนาดเล็กเกินไป ให้ลองเปิดใหม่อีกครั้ง ถ้า มัน ใหญ่ขึ้น
    var makeResizeListener = function (tileSet, spriteSheet) {
        return function (tileSet, spriteSheet, e) {
            $(window).off('resize');
            var s = new SpleshScreen(tileSet, spriteSheet);
        }.bind(null, tileSet, spriteSheet);
    };

    function SpleshScreen(tileSet, snowTileSet, spriteSheet) {

        // เราไม่ให้เปิดเกม ถ้าขนาด screen มันเล็กเกินไป 
        if ($('#tooSmall').is(':visible')) {
            onreset = makeResizeListener(tileSet, spriteSheet);
            $(window).on('resize', onreset)
            return;
        }

        this.tileSet = tileSet;
        this.snowTileSet = snowTileSet;
        this.spriteSheet = spriteSheet;
        this.map = MapGrenerator();

        var userOn = firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                acquireNameAndDifficulty(play.bind(this));
            }
        });
        this.spriteCanvas = new SpriteCanvas('splashContauner', tileSet);
        this.spriteCanvas.paint(this.map);
    }

    var regenerateMap = function(e) {
        e.preventDefault();

        this.map = MapGrenerator();
        this.spriteCanvas.paint(this.map);
    }

    //มี After map เป็น selected , call function กับ display และ form asking  ของ user ,city name และ difficulty level
    var acquireNameAndDifficulty = function (e) {
        e.preventDefault();
        if (Config.debug);
        // $('#nameForm').removeAttr('required');
    };

    var play = function(e) {
        e.preventDefault();
        var g = new Game(this.map, this.spriteSheet) 
    }
})