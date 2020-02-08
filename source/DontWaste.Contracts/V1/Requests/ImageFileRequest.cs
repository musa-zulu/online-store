using System.IO;

namespace DontWaste.Contracts.V1.Requests
{
    public class ImageFileRequest
    {
        public byte Image { get; set; }
        public string Description { get; set; }
    }
}
