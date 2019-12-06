using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Telemetry_Dashboard.models;

namespace Telemetry_Dashboard.services
{
    public class UdpService
    {
        public event EventHandler<byte[]> DataReceived;
        public int Port
        {
            get;
            private set;
        }

        public UdpService(int port)
        {
            Port = port;
        }

        public async Task LoopReceive(CancellationToken token)
        {
            using (UdpClient client = new UdpClient(Port))
            {
                while(!token.IsCancellationRequested)
                {
                    var data = await client.ReceiveAsync();
                    DataReceived?.Invoke(this, data.Buffer);
                }
            }
        }
    }
}
