using Microsoft.AspNetCore.Mvc;
using ProjetoToGrow.Dtos;
using ProjetoToGrow.Services.Interfaces;

namespace ProjetoToGrow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var sucesso = await _authService.RegisterAsync(dto);
        if (!sucesso)
        {
            return Conflict(new { message = "Nome de usuário já está em uso." });
        }

        return Ok(new { message = "Usuário registrado com sucesso." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var resultado = await _authService.LoginAsync(dto);
        if (resultado is null)
        {
            return Unauthorized(new { message = "Usuário ou senha inválidos." });
        }

        return Ok(resultado);
    }
}
