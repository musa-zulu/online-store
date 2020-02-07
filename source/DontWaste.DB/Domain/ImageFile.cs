using System;
using System.ComponentModel.DataAnnotations;

namespace DontWaste.DB.Domain
{
    public class ImageFile : EntityBase
    {
        [Key]
        public Guid ImageFileId { get; set; }
        public string Description { get; set; }
    }
}
