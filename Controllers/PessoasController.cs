using Microsoft.AspNetCore.Mvc;
using ProjetoToGrow.Models;
using ProjetoToGrow.Services.Interfaces;

namespace ProjetoToGrow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoasController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var pessoas = await _pessoaService.GetAllAsync();
        return Ok(pessoas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var pessoa = await _pessoaService.GetByIdAsync(id);
        if (pessoa is null)
        {
            return NotFound();
        }

        return Ok(pessoa);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Pessoa pessoa)
    {
        await _pessoaService.AddAsync(pessoa);
        return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, pessoa);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Pessoa pessoa)
    {
        var existente = await _pessoaService.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        pessoa.Id = id;
        await _pessoaService.UpdateAsync(pessoa);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existente = await _pessoaService.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        await _pessoaService.DeleteAsync(id);
        return NoContent();
    }
}
