using System.Diagnostics.CodeAnalysis;

namespace ProjetoToGrow.Models;

public class Pessoa
{
    public int Id { get; set; }

    public required string Nome { get; set; }

    public int Idade { get; set; }

    public int CargoId { get; set; }

    public required Cargo Cargo { get; set; }

    public DateTime DataAdmissao { get; set; }

    public Pessoa() { }

    [SetsRequiredMembers]
    public Pessoa(string nome, int idade, Cargo cargo, DateTime dataAdmissao)
    {
        Nome = nome;
        Idade = idade;
        Cargo = cargo;
        CargoId = cargo.Id;
        DataAdmissao = dataAdmissao;
    }
}
