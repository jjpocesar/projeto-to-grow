using Microsoft.EntityFrameworkCore;
using ProjetoToGrow.Context;
using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;

namespace ProjetoToGrow.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Username == username);
    }
}
