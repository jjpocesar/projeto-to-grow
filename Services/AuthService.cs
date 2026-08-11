using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ProjetoToGrow.Dtos;
using ProjetoToGrow.Models;
using ProjetoToGrow.Repositories.Interfaces;
using ProjetoToGrow.Services.Interfaces;

namespace ProjetoToGrow.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly PasswordHasher<User> _passwordHasher = new();

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<bool> RegisterAsync(RegisterDto dto)
    {
        var usuarioExistente = await _userRepository.GetByUsernameAsync(dto.Username);
        if (usuarioExistente is not null)
        {
            return false;
        }

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = string.Empty
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

        await _userRepository.AddAsync(user);
        return true;
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
    {
        var user = await _userRepository.GetByUsernameAsync(dto.Username);
        if (user is null)
        {
            return null;
        }

        var resultado = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
        if (resultado == PasswordVerificationResult.Failed)
        {
            return null;
        }

        return GerarToken(user);
    }

    private AuthResponseDto GerarToken(User user)
    {
        var jwtKey = _configuration["Jwt:Key"]!;
        var jwtIssuer = _configuration["Jwt:Issuer"];
        var jwtAudience = _configuration["Jwt:Audience"];
        var expiresInMinutes = int.Parse(_configuration["Jwt:ExpiresInMinutes"] ?? "60");

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credenciais = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expiraEm = DateTime.UtcNow.AddMinutes(expiresInMinutes);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: expiraEm,
            signingCredentials: credenciais);

        return new AuthResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expiraEm
        };
    }
}
