using Microsoft.AspNetCore.Mvc;
using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;

namespace ProjetoToGrow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly IPessoaRepository _pessoaRepository;

    public PessoasController(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Pessoa pessoa)
    {
        await _pessoaRepository.AddAsync(pessoa);
        return CreatedAtAction(nameof(Create), new { id = pessoa.Id }, pessoa);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Pessoa pessoa)
    {
        var existente = await _pessoaRepository.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        pessoa.Id = id;
        await _pessoaRepository.UpdateAsync(pessoa);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existente = await _pessoaRepository.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        await _pessoaRepository.DeleteAsync(id);
        return NoContent();
    }
}
