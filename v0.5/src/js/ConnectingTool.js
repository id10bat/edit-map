import BaseTool  from '../js/BaseTool';
import Connector from '../js/Connector';




// Take a tool constructor, make it inherit from BaseTool, and add
// the various connection related functions
var makeTool = BaseTool.makeTool;
 var ConnectingTool = function (toolConstructor) {
  return Connector(makeTool(toolConstructor));
};


export default ConnectingTool;

