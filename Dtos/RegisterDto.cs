using System.ComponentModel.DataAnnotations;

namespace ProjetoToGrow.Dtos;

public class RegisterDto
{
    [Required(ErrorMessage = "O nome de usuário é obrigatório.")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "O nome de usuário deve ter entre 3 e 50 caracteres.")]
    public required string Username { get; set; }

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
    public required string Password { get; set; }
}
