using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;
using ProjetoToGrow.Services.Interfaces;

namespace ProjetoToGrow.Services;

public class PessoaService : IPessoaService
{
    private readonly IPessoaRepository _pessoaRepository;

    public PessoaService(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    public async Task<IEnumerable<Pessoa>> GetAllAsync()
    {
        return await _pessoaRepository.GetAllAsync();
    }

    public async Task<Pessoa?> GetByIdAsync(int id)
    {
        return await _pessoaRepository.GetByIdAsync(id);
    }

    public async Task AddAsync(Pessoa pessoa)
    {
        await _pessoaRepository.AddAsync(pessoa);
    }

    public async Task UpdateAsync(Pessoa pessoa)
    {
        await _pessoaRepository.UpdateAsync(pessoa);
    }

    public async Task DeleteAsync(int id)
    {
        await _pessoaRepository.DeleteAsync(id);
    }
}
