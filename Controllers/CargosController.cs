using Microsoft.AspNetCore.Mvc;
using ProjetoToGrow.Dtos;
using ProjetoToGrow.Models;
using ProjetoToGrow.Services.Interfaces;

namespace ProjetoToGrow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CargosController : ControllerBase
{
    private readonly ICargoService _cargoService;

    public CargosController(ICargoService cargoService)
    {
        _cargoService = cargoService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var cargos = await _cargoService.GetAllAsync();
        return Ok(cargos.Select(MapToResponseDto));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cargo = await _cargoService.GetByIdAsync(id);
        if (cargo is null)
        {
            return NotFound();
        }

        return Ok(MapToResponseDto(cargo));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CargoDto dto)
    {
        var cargo = new Cargo
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            DataCriacao = dto.DataCriacao
        };

        await _cargoService.AddAsync(cargo);
        return CreatedAtAction(nameof(GetById), new { id = cargo.Id }, MapToResponseDto(cargo));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CargoDto dto)
    {
        var existente = await _cargoService.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        existente.Nome = dto.Nome;
        existente.Descricao = dto.Descricao;
        existente.DataCriacao = dto.DataCriacao;

        await _cargoService.UpdateAsync(existente);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existente = await _cargoService.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        await _cargoService.DeleteAsync(id);
        return NoContent();
    }

    private static CargoResponseDto MapToResponseDto(Cargo cargo) => new()
    {
        Id = cargo.Id,
        Nome = cargo.Nome,
        Descricao = cargo.Descricao,
        DataCriacao = cargo.DataCriacao
    };
}
