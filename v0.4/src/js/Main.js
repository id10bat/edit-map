import require from 'requirejs';
import $ from 'jquery';

require(['Config', 'SplashScreen']
    , function (Config, SplashScreen) {


        var tileSet, snowTileSet; //undefined

        var onTilesLoaded = function () {
            var sprites = $('#sprites')[0]; //id='sprites' ลำดับที่ 0 ของ Array
            if (sprites.complete) {
                $('#loadingBanner').css({ display: 'none' }); // ซ้อน id='loadingBanner'
                var s = new SplashScreen(tileSet, snowTileSet, sprites); 
            } else {
                window.setTimeout(onTilesLoaded, 0);
            } // เช็ค sprites ถ้า ค่า true ให้ทำ if  ถ้า ค่า false ให้ทำ else
        };

        Config.debug = window.location.search.slice(1).split('&').some(function(param) {
            return param.trim().toLowerCase() === 'debug=1';
        }); // check debug ของ parameter ใน URL
    });