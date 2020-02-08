using System;

namespace DontWaste.Contracts.Helpers
{
    public interface IDateTimeProvider
    {
        DateTime Now { get; }
        DateTime Today { get; }
    }
}
