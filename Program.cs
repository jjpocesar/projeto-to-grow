using Microsoft.EntityFrameworkCore;
using ProjetoToGrow.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.MapGet("/", () => "API projeto-to-grow no ar!");

app.Run();
