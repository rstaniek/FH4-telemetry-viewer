using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telemetry_Dashboard.parsers
{
    public static class ByteParser
    {
        public static float ReadFloat(this byte[] data, int offset, bool littleEndian = true)
        {
            if (littleEndian)
            {
                Swap4(ref data, offset);
            }
            return BitConverter.ToSingle(data, offset);
        }

        public static int ReadInt(this byte[] data, int offset, bool littleEndian = true)
        {
            if (littleEndian)
            {
                Swap4(ref data, offset);
            }
            return BitConverter.ToInt32(data, offset);
        }

        public static ushort ReadUshort(this byte[] data, int offset, bool littleEndian = true)
        {
            if (littleEndian)
            {
                Swap(ref data, offset);
            }
            return BitConverter.ToUInt16(data, offset);
        }

        public static short ReadShort(this byte[] data, int offset, bool littleEndian = true)
        {
            if(littleEndian)
            {
                Swap(ref data, offset);
            }
            return BitConverter.ToInt16(data, offset);
        }

        private static void Swap4(ref byte[] data, int offset)
        {
            byte tmp = data[offset];
            data[offset] = data[offset + 3];
            data[offset + 3] = tmp;
            tmp = data[offset + 1];
            data[offset + 1] = data[offset + 2];
            data[offset + 2] = tmp;
        }

        private static void Swap(ref byte[] data, int offset)
        {
            byte tmp = data[offset];
            data[offset] = data[offset + 1];
            data[offset + 1] = tmp;
        }
    }
}
