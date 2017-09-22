import $ from 'jquery';
import CreateCanvas from '../Component/CreateCanvas';
import MapGenerator from '../js/MapGenerator';
// import Main,{tileSet} from '../Component/Main'

export default function CreateScreen() {

    $('#clickSubmit').click(play.bind(this));

  }

  var play = function (e, tileSet) {
    e.preventDefault();
    this.map = MapGenerator();
    this.tileSet = tileSet;
    
    var wArea = this.widthArea.value;
    var HArea = this.heightArea.value;
  
    // Launch a new game
    this.createCanvas = new CreateCanvas('canvasContainer', tileSet, wArea, HArea );
    this.createCanvas.paint(this.map);
  };