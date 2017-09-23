import $ from 'jquery';



var ActionTool = function (e) {
    $('.selected').each(function () {
        $(this).removeClass('selected');
        $(this).addClass('unselected');
    });

    $(e.target).removeClass('unselected');
    $(e.target).addClass('selected');

    this.toolName = $(e.target).attr('data-tool');
    this.toolWidth = $(e.target).attr('data-size');
    this.toolColour = $(e.target).attr('data-colour');



    if (this.toolName == 'industrial') {
        $('#canvas').removeClass('helpPointer');
        $('#canvas').addClass('pointer');
        if ($('#canvas').val() !== undefined) {
            var canvas = document.getElementsByTagName('canvas')[0].getContext('2d'),
                click = false;

            $('#canvasContainer').mousedown(function () {
                click = true;
            });

            $('#canvasContainer').mouseup(function () {
                click = false;
            });

            $('canvas').mousedown(function (e) {
                draw(e.pageX, e.pageY);
            });

            $('canvas').mouseup(function (e) {
                draw(e.pageX, e.pageY);
            });

            $('canvas').mousemove(function (e) {
                if (click === true) {
                    draw(e.pageX, e.pageY);
                }
            });

            function draw(xPos, yPos) {
                canvas.beginPath();
                canvas.rect(xPos - $('#canvas').offset().left, yPos - $('#canvas').offset().top, 20, 20, 20, 20 * Math.PI);
                canvas.stroke();
                canvas.closePath();
            }
        }
    } else {
        $('#canvas').removeClass('pointer');
        $('#canvas').addClass('helpPointer');
    }

    e.preventDefault();
}


export default ActionTool;

