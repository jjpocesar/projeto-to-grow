namespace ProjetoToGrow.Dtos;

public class PessoaResponseDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
    public DateTime DataAdmissao { get; set; }
    public CargoResponseDto? Cargo { get; set; }
}
