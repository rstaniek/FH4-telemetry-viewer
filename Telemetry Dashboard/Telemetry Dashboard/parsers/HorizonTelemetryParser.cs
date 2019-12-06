using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telemetry_Dashboard.models;

namespace Telemetry_Dashboard.parsers
{
    public class HorizonTelemetryParser
    {
        public HorizonTelemetryDto Parse(byte[] datagram)
        {
            return new HorizonTelemetryDto()
            {
                isRaceOn = datagram.ReadInt(0),
                timestamp = datagram.ReadInt(4),
                engine_maxRpm = datagram.ReadFloat(8),
                engine_idleRpm = datagram.ReadFloat(12),
                engine_currentRpm = datagram.ReadFloat(16),

                car_accX = datagram.ReadFloat(20),
                car_accY = datagram.ReadFloat(24),
                car_accZ = datagram.ReadFloat(28),
                car_velX = datagram.ReadFloat(32),
                car_velY = datagram.ReadFloat(36),
                car_velZ = datagram.ReadFloat(40),
                car_angularVelX = datagram.ReadFloat(44),
                car_angularVelY = datagram.ReadFloat(48),
                car_angularVelZ = datagram.ReadFloat(52),
                car_yaw = datagram.ReadFloat(56),
                car_pitch = datagram.ReadFloat(60),
                car_roll = datagram.ReadFloat(64),

                //0.0f max stretch 1.0f max compression
                susp_normTravel_fl = datagram.ReadFloat(68),
                susp_normTravel_fr = datagram.ReadFloat(72),
                susp_normTravel_rl = datagram.ReadFloat(76),
                susp_normTravel_rr = datagram.ReadFloat(80),

                //0.0f full grip 1.0 tires slipping
                tire_tsr_fl = datagram.ReadFloat(84),
                tire_tsr_fr = datagram.ReadFloat(88),
                tire_tsr_rl = datagram.ReadFloat(92),
                tire_tsr_rr = datagram.ReadFloat(96),

                //speed in radians/sec
                wheel_rotationSpeed_fl = datagram.ReadFloat(100),
                wheel_rotationSpeed_fr = datagram.ReadFloat(104),
                wheel_rotationSpeed_rl = datagram.ReadFloat(108),
                wheel_rotationSpeed_rr = datagram.ReadFloat(112),
                //on rumble strip = 1, otherwise 0
                wheel_onRumble_fl = datagram.ReadInt(11),
                wheel_onRumble_fr = datagram.ReadInt(120),
                wheel_onRumble_rl = datagram.ReadInt(124),
                wheel_onRumble_rr = datagram.ReadInt(128),
                //0 no puddle 1 deepest puddle
                wheel_inPuddleDepth_fl = datagram.ReadFloat(132),
                wheel_inPuddleDepth_fr = datagram.ReadFloat(136),
                wheel_inPuddleDepth_rl = datagram.ReadFloat(140),
                wheel_inPuddleDepth_rr = datagram.ReadFloat(144),

                forceFeedback_rumble_fl = datagram.ReadFloat(148),
                forceFeedback_rumble_fr = datagram.ReadFloat(152),
                forceFeedback_rumble_rl = datagram.ReadFloat(156),
                forceFeedback_rumble_rr = datagram.ReadFloat(160),

                //normalized slip angle 0 = full grip >1.0 is loss of grip
                tire_tsa_fl = datagram.ReadFloat(164),
                tire_tsa_fr = datagram.ReadFloat(168),
                tire_tsa_rl = datagram.ReadFloat(172),
                tire_tsa_rr = datagram.ReadFloat(176),
                //normalized combined tire slip
                tire_tsc_fl = datagram.ReadFloat(180),
                tire_tsc_fr = datagram.ReadFloat(184),
                tire_tsc_rl = datagram.ReadFloat(188),
                tire_tsc_rr = datagram.ReadFloat(192),

                //actual suspension travel in meters
                susp_travel_fl = datagram.ReadFloat(196),
                susp_travel_fr = datagram.ReadFloat(200),
                susp_travel_rl = datagram.ReadFloat(204),
                susp_travel_rr = datagram.ReadFloat(208),

                car_ordinalID = datagram.ReadInt(212),
                //carr class 0-7 where 0 is worst
                car_class = datagram.ReadInt(216),
                car_performanceIndex = datagram.ReadInt(220),
                //0-FWD, 1-RWD, 2-AWD
                car_drivetrainType = datagram.ReadInt(224),
                car_cylinders = datagram.ReadInt(228),

                //horizon Sled data starts here
                car_posX = datagram.ReadFloat(244),
                car_posY = datagram.ReadFloat(248),
                car_posZ = datagram.ReadFloat(252),
                //speed in meters/sec
                car_speed = datagram.ReadFloat(256),
                //power in KW
                engine_power = datagram.ReadFloat(260) / 1000,
                engine_torque = datagram.ReadFloat(264),

                //tire temperatures
                tire_temp_fl = ConvertToCelsius(datagram.ReadFloat(268)),
                tire_temp_fr = ConvertToCelsius(datagram.ReadFloat(272)),
                tire_temp_rl = ConvertToCelsius(datagram.ReadFloat(276)),
                tire_temp_rr = ConvertToCelsius(datagram.ReadFloat(280)),

                //this works fine
                engine_boost = datagram.ReadFloat(284),
                engine_fuel = datagram.ReadFloat(288),
                car_distanceTravelled = datagram.ReadFloat(292),

                race_bestLap = datagram.ReadFloat(296),
                race_lastLap = datagram.ReadFloat(300),
                race_currentLap = datagram.ReadFloat(304),
                race_currentRaceTime = datagram.ReadFloat(308),
                race_lapNumber = datagram.ReadUshort(312),
                race_position = datagram[314],

                input_accel = datagram[315],
                input_brake = datagram[316],
                input_clutch = datagram[317],
                input_handBrake = datagram[318],
                input_gear = datagram[319],
                input_steer = (sbyte)datagram[320],

                normalizedDrivingLine = (sbyte)datagram[321],
                normalizedAIBrakeDifference = datagram.ReadShort(322)
            };
        }

        private float ConvertToCelsius(float fahrenheit)
        {
            return ((fahrenheit - 32) * 5) / 9;
        }
    }
}
