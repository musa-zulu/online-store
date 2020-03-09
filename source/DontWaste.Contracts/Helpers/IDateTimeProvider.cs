using System;

namespace OnlineStore.Contracts.Helpers
{
    public interface IDateTimeProvider
    {
        DateTime Now { get; }
        DateTime Today { get; }
    }
}
