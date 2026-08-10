using Microsoft.AspNetCore.Mvc;
using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;

namespace ProjetoToGrow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CargosController : ControllerBase
{
    private readonly ICargoRepository _cargoRepository;

    public CargosController(ICargoRepository cargoRepository)
    {
        _cargoRepository = cargoRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var cargos = await _cargoRepository.GetAllAsync();
        return Ok(cargos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cargo = await _cargoRepository.GetByIdAsync(id);
        if (cargo is null)
        {
            return NotFound();
        }

        return Ok(cargo);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Cargo cargo)
    {
        await _cargoRepository.AddAsync(cargo);
        return CreatedAtAction(nameof(GetById), new { id = cargo.Id }, cargo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Cargo cargo)
    {
        var existente = await _cargoRepository.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        cargo.Id = id;
        await _cargoRepository.UpdateAsync(cargo);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existente = await _cargoRepository.GetByIdAsync(id);
        if (existente is null)
        {
            return NotFound();
        }

        await _cargoRepository.DeleteAsync(id);
        return NoContent();
    }
}
