using System.Diagnostics.CodeAnalysis;

namespace ProjetoToGrow.Models;

public class Cargo
{
    public int Id { get; set; }

    public required string Nome { get; set; }

    public required string Descricao { get; set; }

    public DateTime DataCriacao { get; set; }

    public Cargo() { }

    [SetsRequiredMembers]
    public Cargo(string nome, string descricao, DateTime dataCriacao)
    {
        Nome = nome;
        Descricao = descricao;
        DataCriacao = dataCriacao;
    }
}
