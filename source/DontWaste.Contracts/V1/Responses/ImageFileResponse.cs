using System;

namespace DontWaste.Contracts.V1.Responses
{
    public class ImageFileResponse
    {
        public Guid ImageFileId { get; set; }
        public byte Image { get; set; }
        public string Description { get; set; }
    }
}
