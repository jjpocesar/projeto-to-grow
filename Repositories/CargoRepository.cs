using Microsoft.EntityFrameworkCore;
using ProjetoToGrow.Data;
using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;

namespace ProjetoToGrow.Repositories;

public class CargoRepository : ICargoRepository
{
    private readonly AppDbContext _context;

    public CargoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Cargo>> GetAllAsync()
    {
        return await _context.Cargos.ToListAsync();
    }

    public async Task<Cargo?> GetByIdAsync(int id)
    {
        return await _context.Cargos.FindAsync(id);
    }

    public async Task AddAsync(Cargo cargo)
    {
        await _context.Cargos.AddAsync(cargo);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Cargo cargo)
    {
        _context.Cargos.Update(cargo);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var cargo = await _context.Cargos.FindAsync(id);
        if (cargo is not null)
        {
            _context.Cargos.Remove(cargo);
            await _context.SaveChangesAsync();
        }
    }
}
