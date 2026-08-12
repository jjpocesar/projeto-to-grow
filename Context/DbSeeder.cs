using ProjetoToGrow.Models;

namespace ProjetoToGrow.Context;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        if (!context.Cargos.Any())
        {
            context.Cargos.Add(new Cargo
            {
                Nome = "Colaborador",
                Descricao = "Colaborador padrão",
                DataCriacao = DateTime.UtcNow
            });

            context.SaveChanges();
        }
    }
}
