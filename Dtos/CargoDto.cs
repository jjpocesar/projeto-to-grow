using System.ComponentModel.DataAnnotations;

namespace ProjetoToGrow.Dtos;

public class CargoDto
{
    [Required(ErrorMessage = "O nome do cargo é obrigatório.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "O nome deve ter entre 2 e 100 caracteres.")]
    public required string Nome { get; set; }

    [Required(ErrorMessage = "A descrição do cargo é obrigatória.")]
    [StringLength(300, ErrorMessage = "A descrição deve ter no máximo 300 caracteres.")]
    public required string Descricao { get; set; }

    public DateTime DataCriacao { get; set; }
}
