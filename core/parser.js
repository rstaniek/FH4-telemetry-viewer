var PORT = 5685;
var HOST = "0.0.0.0";

var dgram = require("dgram");
var server = dgram.createSocket("udp4");

server.on("listening", function() {
  var address = server.address();
  console.log(">  Listening on " + address.address + ":" + address.port);
});

server.on("message", function(message, remote) {
  const data = processMessage(message);
  print(data);
});
server.bind(PORT, HOST);

process.on("SIGINT", function() {
  console.log("\n" + "> Exiting....");
  process.exit();
});

function processMessage(message) {
  isRaceOn = message.readInt32LE(0);
  timestamp = message.readInt32LE(4);

  engine_maxRpm = ~~message.readFloatLE(8);
  engine_idleRpm = ~~message.readFloatLE(12);
  engine_rpm = ~~message.readFloatLE(16);

  car_accX = message.readFloatLE(20);
  car_accY = message.readFloatLE(24);
  car_accZ = message.readFloatLE(28);
  car_velX = message.readFloatLE(32);
  car_velY = message.readFloatLE(36);
  car_velZ = message.readFloatLE(40);
  car_angularVelX = message.readFloatLE(44);
  car_angularVelY = message.readFloatLE(48);
  car_angularVelZ = message.readFloatLE(52);
  car_yaw = message.readFloatLE(56);
  car_pitch = message.readFloatLE(60);
  car_roll = message.readFloatLE(64);

  //0.0f max stretch 1.0f max compression
  susp_normTravel_fl = message.readFloatLE(68);
  susp_normTravel_fr = message.readFloatLE(72);
  susp_normTravel_rl = message.readFloatLE(76);
  susp_normTravel_rr = message.readFloatLE(80);

  //0.0f full grip 1.0 tires slipping
  tire_tsr_fl = message.readFloatLE(84);
  tire_tsr_fr = message.readFloatLE(88);
  tire_tsr_rl = message.readFloatLE(92);
  tire_tsr_rr = message.readFloatLE(96);

  //speed in radians/sec
  wheel_rotationSpeed_fl = message.readFloatLE(100);
  wheel_rotationSpeed_fr = message.readFloatLE(104);
  wheel_rotationSpeed_rl = message.readFloatLE(108);
  wheel_rotationSpeed_rr = message.readFloatLE(112);
  //on rumble strip = 1, otherwise 0
  wheel_onRumble_fl = message.readInt32LE(116) === 1;
  wheel_onRumble_fr = message.readInt32LE(120) === 1;
  wheel_onRumble_rl = message.readInt32LE(124) === 1;
  wheel_onRumble_rr = message.readInt32LE(128) === 1;
  //0 no puddle 1 deepest puddle
  wheel_inPuddleDepth_fl = message.readFloatLE(132);
  wheel_inPuddleDepth_fr = message.readFloatLE(136);
  wheel_inPuddleDepth_rl = message.readFloatLE(140);
  wheel_inPuddleDepth_rr = message.readFloatLE(144);

  forceFeedback_rumble_fl = message.readFloatLE(148);
  forceFeedback_rumble_fr = message.readFloatLE(152);
  forceFeedback_rumble_rl = message.readFloatLE(156);
  forceFeedback_rumble_rr = message.readFloatLE(160);

  const result = {
      isRaceOn: isRaceOn,
      timestamp: timestamp,
      engine: {
          maxRpm: engine_maxRpm,
          idleRpm: engine_idleRpm,
          currentRpm: engine_rpm
      },
      carGeneral: {
          accX: car_accX,
          accY: car_accY,
          accZ: car_accZ,
          velX: car_velX,
          velY: car_velY,
          velZ: car_velZ,
          angularVelX: car_angularVelX,
          angularVelY: car_angularVelY,
          angularVelZ: car_angularVelZ,
          yaw: car_yaw,
          pitch: car_pitch,
          roll: car_roll
      },
      suspension: {
          travel_fl: susp_normTravel_fl,
          travel_fr: susp_normTravel_fr,
          travel_rl: susp_normTravel_rl,
          travel_rr: susp_normTravel_rr
      },
      wheels: {
          tires: {
              slipRatio_fl: tire_tsr_fl,
              slipRatio_fr: tire_tsr_fr,
              slipRatio_rl: tire_tsr_rl,
              slipRatio_rr: tire_tsr_rr
          }
      }
  }
  return result;
}
