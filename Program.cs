using Microsoft.EntityFrameworkCore;
using ProjetoToGrow.Context;
using ProjetoToGrow.Repositories;
using ProjetoToGrow.Repositories.Interfaces;
using ProjetoToGrow.Services;
using ProjetoToGrow.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<ICargoRepository, CargoRepository>();

builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<ICargoService, CargoService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.MapGet("/", () => "API projeto-to-grow no ar!");
app.MapControllers();

app.Run();
