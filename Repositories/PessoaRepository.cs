using Microsoft.EntityFrameworkCore;
using ProjetoToGrow.Context;
using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;

namespace ProjetoToGrow.Repositories;

public class PessoaRepository : Repository<Pessoa>, IPessoaRepository
{
    public PessoaRepository(AppDbContext context) : base(context)
    {
    }

    public override async Task<IEnumerable<Pessoa>> GetAllAsync()
    {
        return await _context.Pessoas.Include(p => p.Cargo).ToListAsync();
    }

    public override async Task<Pessoa?> GetByIdAsync(int id)
    {
        return await _context.Pessoas.Include(p => p.Cargo).FirstOrDefaultAsync(p => p.Id == id);
    }
}
