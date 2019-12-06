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
  console.log(data);
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

  //normalized slip angle 0 = full grip >1.0 is loss of grip
  tire_tsa_fl = message.readFloatLE(164);
  tire_tsa_fr = message.readFloatLE(168);
  tire_tsa_rl = message.readFloatLE(172);
  tire_tsa_rr = message.readFloatLE(176);
  //normalized combined tire slip
  tire_tsc_fl = message.readFloatLE(180);
  tire_tsc_fr = message.readFloatLE(184);
  tire_tsc_rl = message.readFloatLE(188);
  tire_tsc_rr = message.readFloatLE(192);

  //actual suspension travel in meters
  susp_travel_fl = message.readFloatLE(196);
  susp_travel_fr = message.readFloatLE(200);
  susp_travel_rl = message.readFloatLE(204);
  susp_travel_rr = message.readFloatLE(208);

  car_ordinalID = message.readInt32LE(212);
  //carr class 0-7 where 0 is worst
  car_class = message.readInt32LE(216);
  car_performanceIndex = message.readInt32LE(220);
  //0-FWD, 1-RWD, 2-AWD
  car_drivetrainType = message.readInt32LE(224);
  car_cylinders = message.readInt32LE(228);

  //horizon Sled data starts here
  car_posX = message.readFloatLE(232);
  car_posY = message.readFloatLE(236);
  car_posZ = message.readFloatLE(240);
  //speed in meters/sec
  car_speed = message.readFloatLE(244);
  //power in Watts
  engine_power = message.readFloatLE(248);
  engine_torque = message.readFloatLE(252);

  //tire temperatures
  tire_temp_fl = message.readFloatLE(256);
  tire_temp_fr = message.readFloatLE(260);
  tire_temp_rl = message.readFloatLE(264);
  tire_temp_rr = message.readFloatLE(270);

  engine_boost = message.readFloatLE(274);
  engine_fuel = message.readFloatLE(278);
  car_distanceTravelled = message.readFloatLE(282);

  race_bestLap = message.readFloatLE(286);
  race_lastLap = message.readFloatLE(290);
  race_currentLap = message.readFloatLE(294);
  race_currentRaceTime = message.readFloatLE(298);
  race_lapNumber = message.readUIntLE(302, 2);
  race_position = message.readUIntLE(304, 1);

  input_accel = message.readUIntLE(305, 1);
  input_brake = message.readUIntLE(306, 1);
  input_clutch = message.readUIntLE(307, 1);
  input_handBrake = message.readUIntLE(308, 1);
  input_gear = message.readUIntLE(309, 1);
  input_steer = message.readIntLE(310, 1);

  normalizedDrivingLine = message.readIntLE(311, 1);
  normalizedAIBrakeDifference = message.readIntLE(312, 1);

  horizonDashBytes = Buffer.from(message, 232, 92);

  const result = {
    isRaceOn: isRaceOn,
    timestamp: timestamp,
    engine: {
      maxRpm: engine_maxRpm,
      idleRpm: engine_idleRpm,
      currentRpm: engine_rpm,
      power: engine_power,
      torque: engine_torque,
      boost: engine_boost,
      fuel: engine_fuel,
      gear: input_gear
    },
    carInfo: {
      id: car_ordinalID,
      class: car_class,
      performanceIndex: car_performanceIndex,
      drivetrain: car_drivetrainType,
      numOfCylinders: car_cylinders
    },
    raceData: {
      lap: {
        best: race_bestLap,
        last: race_lastLap,
        current: race_currentLap,
        number: race_lapNumber
      },
      raceTime: race_currentRaceTime,
      position: race_position
    },
    carMovement: {
      acceleration: {
        X: car_accX,
        Y: car_accY,
        Z: car_accZ
      },
      velocity: {
        X: car_velX,
        Y: car_velY,
        Z: car_velZ
      },
      angularVelocity: {
        X: car_angularVelX,
        Y: car_angularVelY,
        Z: car_angularVelZ
      },
      position: {
        X: car_posX,
        Y: car_posY,
        Z: car_posZ
      },
      yaw: car_yaw,
      pitch: car_pitch,
      roll: car_roll,
      speed_ms: car_speed,
      speed: car_speed * 3.6,
      distanceTravelled: car_distanceTravelled
    },
    suspension: {
      travelNormalized: {
        fl: susp_normTravel_fl,
        fr: susp_normTravel_fr,
        rl: susp_normTravel_rl,
        rr: susp_normTravel_rr
      },
      travel: {
        fl: susp_travel_fl,
        fr: susp_travel_fr,
        rl: susp_travel_rl,
        rr: susp_travel_rr
      }
    },
    wheels: {
      tires: {
        slipRatio: {
          fl: tire_tsr_fl,
          fr: tire_tsr_fr,
          rl: tire_tsr_rl,
          rr: tire_tsr_rr
        },
        slipAngle: {
          fl: tire_tsa_fl,
          fr: tire_tsa_fr,
          rl: tire_tsa_rl,
          rr: tire_tsa_rr
        },
        slipCombined: {
          fl: tire_tsc_fl,
          fr: tire_tsc_fr,
          rl: tire_tsc_rl,
          rr: tire_tsc_rr
        },
        temperatures: {
          fl: tire_temp_fl,
          fr: tire_temp_fr,
          rl: tire_temp_fr,
          rr: tire_temp_rr
        }
      },
      rotationSpeed: {
        fl: wheel_rotationSpeed_fl,
        fr: wheel_rotationSpeed_fr,
        rl: wheel_rotationSpeed_rl,
        rr: wheel_rotationSpeed_rr
      },
      isCrosingRumbleStrip: {
        fl: wheel_onRumble_fl,
        fr: wheel_onRumble_fr,
        rl: wheel_onRumble_rl,
        rr: wheel_onRumble_rr
      },
      inPuddleDepth: {
        fl: wheel_inPuddleDepth_fl,
        fr: wheel_inPuddleDepth_fr,
        fl: wheel_inPuddleDepth_rl,
        rr: wheel_inPuddleDepth_rr
      }
    },
    misc: {
      forceFeedbackRumble: {
        fl: forceFeedback_rumble_fl,
        fr: forceFeedback_rumble_fr,
        rl: forceFeedback_rumble_rl,
        rr: forceFeedback_rumble_rr
      },
      normalizedDrivingLine: normalizedDrivingLine,
      normalizedAIBrakeDifference: normalizedAIBrakeDifference
    },
    input: {
      throttle: input_accel,
      brake: input_brake,
      clutch: input_clutch,
      handBrake: input_handBrake,
      steer: input_steer
    },
    dashBytes: horizonDashBytes
  };
  return result;
}
