using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telemetry_Dashboard.models
{
    public class HorizonTelemetryDto
    {
        public int isRaceOn { get; set; }
        public int timestamp { get; set; }

        public float engine_maxRpm { get; set; }
        public float engine_idleRpm { get; set; }
        public float engine_currentRpm { get; set; }

        public float car_accX { get; set; }
        public float car_accY { get; set; }
        public float car_accZ { get; set; }
        public float car_velX { get; set; }
        public float car_velY { get; set; }
        public float car_velZ { get; set; }
        public float car_angularVelX { get; set; }
        public float car_angularVelY { get; set; }
        public float car_angularVelZ { get; set; }
        public float car_yaw { get; set; }
        public float car_pitch { get; set; }
        public float car_roll { get; set; }

        //0.0f max stretch 1.0f max compression
        public float susp_normTravel_fl { get; set; }
        public float susp_normTravel_fr { get; set; }
        public float susp_normTravel_rl { get; set; }
        public float susp_normTravel_rr { get; set; }

        //0.0f full grip 1.0 tires slipping
        public float tire_tsr_fl { get; set; }
        public float tire_tsr_fr { get; set; }
        public float tire_tsr_rl { get; set; }
        public float tire_tsr_rr { get; set; }

        //speed in radians/sec
        public float wheel_rotationSpeed_fl { get; set; }
        public float wheel_rotationSpeed_fr { get; set; }
        public float wheel_rotationSpeed_rl { get; set; }
        public float wheel_rotationSpeed_rr { get; set; }
        //on rumble strip = 1, otherwise 0
        public float wheel_onRumble_fl { get; set; }
        public float wheel_onRumble_fr { get; set; }
        public float wheel_onRumble_rl { get; set; }
        public float wheel_onRumble_rr { get; set; }
        //0 no puddle 1 deepest puddle
        public float wheel_inPuddleDepth_fl { get; set; }
        public float wheel_inPuddleDepth_fr { get; set; }
        public float wheel_inPuddleDepth_rl { get; set; }
        public float wheel_inPuddleDepth_rr { get; set; }

        public float forceFeedback_rumble_fl { get; set; }
        public float forceFeedback_rumble_fr { get; set; }
        public float forceFeedback_rumble_rl { get; set; }
        public float forceFeedback_rumble_rr { get; set; }

        //normalized slip angle 0 = full grip >1.0 is loss of grip
        public float tire_tsa_fl { get; set; }
        public float tire_tsa_fr { get; set; }
        public float tire_tsa_rl { get; set; }
        public float tire_tsa_rr { get; set; }
        //normalized combined tire slip
        public float tire_tsc_fl { get; set; }
        public float tire_tsc_fr { get; set; }
        public float tire_tsc_rl { get; set; }
        public float tire_tsc_rr { get; set; }

        //actual suspension travel in meters
        public float susp_travel_fl { get; set; }
        public float susp_travel_fr { get; set; }
        public float susp_travel_rl { get; set; }
        public float susp_travel_rr { get; set; }

        public int car_ordinalID { get; set; }
        //carr class 0-7 where 0 is worst
        public int car_class { get; set; }
        public int car_performanceIndex { get; set; }
        //0-FWD, 1-RWD, 2-AWD
        public int car_drivetrainType { get; set; }
        public int car_cylinders { get; set; }

        //horizon Sled data starts here
        public float car_posX { get; set; }
        public float car_posY { get; set; }
        public float car_posZ { get; set; }
        //speed in meters/sec
        public float car_speed { get; set; }
        //power in KW
        public float engine_power { get; set; }
        public float engine_torque { get; set; }

        //tire temperatures
        public float tire_temp_fl { get; set; }
        public float tire_temp_fr { get; set; }
        public float tire_temp_rl { get; set; }
        public float tire_temp_rr { get; set; }

        //this works fine
        public float engine_boost { get; set; }
        public float engine_fuel { get; set; }
        public float car_distanceTravelled { get; set; }

        public float race_bestLap { get; set; }
        public float race_lastLap { get; set; }
        public float race_currentLap { get; set; }
        public float race_currentRaceTime { get; set; }
        public ushort race_lapNumber { get; set; }
        public byte race_position { get; set; }

        public byte input_accel { get; set; }
        public byte input_brake { get; set; }
        public byte input_clutch { get; set; }
        public byte input_handBrake { get; set; }
        public byte input_gear { get; set; }
        public sbyte input_steer { get; set; }

        public sbyte normalizedDrivingLine { get; set; }
        public short normalizedAIBrakeDifference { get; set; }
    }
}
