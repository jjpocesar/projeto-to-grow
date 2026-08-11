using ProjetoToGrow.Dtos;

namespace ProjetoToGrow.Services.Interfaces;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
}
