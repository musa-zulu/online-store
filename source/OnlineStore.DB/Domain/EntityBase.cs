using System;

namespace OnlineStore.DB.Domain
{
    public class EntityBase
    {
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }
    }
}
