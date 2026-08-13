using System.ComponentModel.DataAnnotations;

namespace ProjetoToGrow.Dtos;

public class LoginDto
{
    [Required(ErrorMessage = "O nome de usuário é obrigatório.")]
    public required string Username { get; set; }

    [Required(ErrorMessage = "A senha é obrigatória.")]
    public required string Password { get; set; }
}
