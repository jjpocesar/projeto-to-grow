using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoToGrow.Dtos;
using ProjetoToGrow.Models;
using ProjetoToGrow.Services.Interfaces;

namespace ProjetoToGrow.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly IPessoaService _pessoaService;
    private readonly ICargoService _cargoService;

    public PessoasController(IPessoaService pessoaService, ICargoService cargoService)
    {
        _pessoaService = pessoaService;
        _cargoService = cargoService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var pessoas = await _pessoaService.GetAllAsync();
        return Ok(pessoas.Select(MapToResponseDto));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var pessoa = await _pessoaService.GetByIdAsync(id);
        if (pessoa is null)
        {
            return NotFound();
        }

        return Ok(MapToResponseDto(pessoa));
    }

    [HttpPost]
    public async Task<IActionResult> Create(PessoaDto dto)
    {
        var cargo = await _cargoService.GetByIdAsync(dto.CargoId);
        if (cargo is null)
        {
            return BadRequest(new { message = $"Cargo com id {dto.CargoId} não encontrado." });
        }

        var pessoa = new Pessoa
        {
            Nome = dto.Nome,
            Idade = dto.Idade,
            CargoId = dto.CargoId,
            Cargo = cargo,
            DataAdmissao = dto.DataAdmissao
        };

        await _pessoaService.AddAsync(pessoa);
        return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, MapToResponseDto(pessoa));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, PessoaDto dto)
    {
        var existente = await _pessoaService.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        var cargo = await _cargoService.GetByIdAsync(dto.CargoId);
        if (cargo is null)
        {
            return BadRequest(new { message = $"Cargo com id {dto.CargoId} não encontrado." });
        }

        existente.Nome = dto.Nome;
        existente.Idade = dto.Idade;
        existente.CargoId = dto.CargoId;
        existente.Cargo = cargo;
        existente.DataAdmissao = dto.DataAdmissao;

        await _pessoaService.UpdateAsync(existente);
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

    private static PessoaResponseDto MapToResponseDto(Pessoa pessoa) => new()
    {
        Id = pessoa.Id,
        Nome = pessoa.Nome,
        Idade = pessoa.Idade,
        DataAdmissao = pessoa.DataAdmissao,
        Cargo = pessoa.Cargo is null
            ? null
            : new CargoResponseDto
            {
                Id = pessoa.Cargo.Id,
                Nome = pessoa.Cargo.Nome,
                Descricao = pessoa.Cargo.Descricao,
                DataCriacao = pessoa.Cargo.DataCriacao
            }
    };
}
