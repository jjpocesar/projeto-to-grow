using Microsoft.AspNetCore.Mvc;
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
        return Ok(cargos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cargo = await _cargoService.GetByIdAsync(id);
        if (cargo is null)
        {
            return NotFound();
        }

        return Ok(cargo);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Cargo cargo)
    {
        await _cargoService.AddAsync(cargo);
        return CreatedAtAction(nameof(GetById), new { id = cargo.Id }, cargo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Cargo cargo)
    {
        var existente = await _cargoService.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        cargo.Id = id;
        await _cargoService.UpdateAsync(cargo);
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
}
