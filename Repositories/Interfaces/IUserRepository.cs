using ProjetoToGrow.Models;

namespace ProjetoToGrow.Repositories.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByUsernameAsync(string username);
}
