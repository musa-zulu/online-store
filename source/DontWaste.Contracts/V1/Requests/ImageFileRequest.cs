using System;

namespace DontWaste.Contracts.V1.Requests
{
    public class ImageFileRequest
    {
        public Guid ImageFileId { get; set; }
        public byte Image { get; set; }
        public string Description { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }
    }
}
