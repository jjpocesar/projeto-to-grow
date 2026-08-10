using ProjetoToGrow.Context;
using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;

namespace ProjetoToGrow.Repositories;

public class CargoRepository : Repository<Cargo>, ICargoRepository
{
    public CargoRepository(AppDbContext context) : base(context)
    {
    }
}
