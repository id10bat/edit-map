




  var getChance = function(chance) {
    return (getRandom16() & chance) === 0;
  };


  var getERandom = function(max) {
    var r1 = getRandom(max);
    var r2 = getRandom(max);
    return Math.min(r1, r2);
  };


  var getRandom = function(max) {
    return Math.floor(Math.random() * (max + 1));
  };


  var getRandom16 = function() {
    return getRandom(65535);
  };


  var getRandom16Signed = function() {
    var value = getRandom16();
    if (value >= 32768)
      value = 32768 - value;
    return value;
  };


 export var Random = {
    getChance: getChance,
    getERandom: getERandom,
    getRandom: getRandom,
    getRandom16: getRandom16,
    getRandom16Signed: getRandom16Signed
  };


  // return Random;

