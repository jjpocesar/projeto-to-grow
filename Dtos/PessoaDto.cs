namespace ProjetoToGrow.Dtos;

public class PessoaDto
{
    public required string Nome { get; set; }
    public int Idade { get; set; }
    public int CargoId { get; set; }
    public DateTime DataAdmissao { get; set; }
}
