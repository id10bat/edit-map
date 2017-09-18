import  BuildingTool from '../js/BuildingTool';
import { BulldozerTool } from '../js/BulldozerTool';
import { EventEmitter } from '../js/EventEmitter';
import { Messages } from '../js/Messages';
import { MiscUtils } from '../js/MiscUtils';
import { ParkTool } from '../js/ParkTool';
import { RailTool } from '../js/RailTool';
import { RoadTool } from '../js/RoadTool';
import { QueryTool } from '../js/QueryTool';
import { Tile } from '../js/Tile';
import { WireTool } from '../js/WireTool';


export function GameTools(map) {
  var tools = EventEmitter({
    airport: new BuildingTool(10000, Tile.AIRPORT, map, 6, false),
    bulldozer: new BulldozerTool(map),
    coal: new BuildingTool(3000, Tile.POWERPLANT, map, 4, false),
    commercial: new BuildingTool(100, Tile.COMCLR, map, 3, false),
    fire: new BuildingTool(500, Tile.FIRESTATION, map, 3, false),
    industrial: new BuildingTool(100, Tile.INDCLR, map, 3, false),
    nuclear: new BuildingTool(5000, Tile.NUCLEAR, map, 4, true),
    park: new ParkTool(map),
    police: new BuildingTool(500, Tile.POLICESTATION, map, 3, false),
    port: new BuildingTool(3000, Tile.PORT, map, 4, false),
    rail: new RailTool(map),
    residential: new BuildingTool(100, Tile.FREEZ, map, 3, false),
    road: new RoadTool(map),
    query: new QueryTool(map),
    stadium: new BuildingTool(5000, Tile.STADIUM, map, 4, false),
    wire: new WireTool(map),
  });

  tools.query.addEventListener(Messages.QUERY_WINDOW_NEEDED, MiscUtils.reflectEvent.bind(tools, Messages.QUERY_WINDOW_NEEDED));

  return tools;
}


// return gameTools;

