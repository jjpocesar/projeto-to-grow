using System.ComponentModel.DataAnnotations;

namespace ProjetoToGrow.Dtos;

public class PessoaDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "O nome deve ter entre 2 e 100 caracteres.")]
    public required string Nome { get; set; }

    [Range(0, 130, ErrorMessage = "A idade deve estar entre 0 e 130.")]
    public int Idade { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Informe um cargo válido.")]
    public int CargoId { get; set; }

    public DateTime DataAdmissao { get; set; }
}
