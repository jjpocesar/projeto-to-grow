using Microsoft.EntityFrameworkCore;
using ProjetoToGrow.Data;
using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;

namespace ProjetoToGrow.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;

    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Pessoa>> GetAllAsync()
    {
        return await _context.Pessoas.Include(p => p.Cargo).ToListAsync();
    }

    public async Task<Pessoa?> GetByIdAsync(int id)
    {
        return await _context.Pessoas.Include(p => p.Cargo).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddAsync(Pessoa pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Pessoa pessoa)
    {
        _context.Pessoas.Update(pessoa);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa is not null)
        {
            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
        }
    }
}
