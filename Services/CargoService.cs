using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;
using ProjetoToGrow.Services.Interfaces;

namespace ProjetoToGrow.Services;

public class CargoService : ICargoService
{
    private readonly ICargoRepository _cargoRepository;

    public CargoService(ICargoRepository cargoRepository)
    {
        _cargoRepository = cargoRepository;
    }

    public async Task<IEnumerable<Cargo>> GetAllAsync()
    {
        return await _cargoRepository.GetAllAsync();
    }

    public async Task<Cargo?> GetByIdAsync(int id)
    {
        return await _cargoRepository.GetByIdAsync(id);
    }

    public async Task AddAsync(Cargo cargo)
    {
        await _cargoRepository.AddAsync(cargo);
    }

    public async Task UpdateAsync(Cargo cargo)
    {
        await _cargoRepository.UpdateAsync(cargo);
    }

    public async Task DeleteAsync(int id)
    {
        await _cargoRepository.DeleteAsync(id);
    }
}
