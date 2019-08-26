using Microsoft.EntityFrameworkCore;

namespace SGCFT.Models
{
  public class ApiDbContext : DbContext
  {
    public ApiDbContext(DbContextOptions<ApiDbContext> options)
        : base(options)
    { }

    public DbSet<Alternativa> Alternativas { get; set; }
    public DbSet<Pergunta> Perguntas { get; set; }
    public DbSet<Resposta> Respostas { get; set; }
    public DbSet<Modulo> Modulos { get; set; }
    public DbSet<Treinamento> Treinamentos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Video> Videos { get; set; }
  }
}
