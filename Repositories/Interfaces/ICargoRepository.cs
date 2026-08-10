using ProjetoToGrow.Models;

namespace ProjetoToGrow.Repositories.Interfaces;

public interface ICargoRepository
{
    Task<IEnumerable<Cargo>> GetAllAsync();
    Task<Cargo?> GetByIdAsync(int id);
    Task AddAsync(Cargo cargo);
    Task UpdateAsync(Cargo cargo);
    Task DeleteAsync(int id);
}
