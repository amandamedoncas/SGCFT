using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SGCFT.Models;

namespace SGCFT.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TreinamentoController : ControllerBase
  {
    private readonly ApiDbContext _context;

    public TreinamentoController(ApiDbContext context)
    {
        _context = context;
    }

	// GET: Treinamentos/
        [HttpGet]
        public IActionResult Index()
        {
            List<Treinamento> treinamentos = _context.Treinamentos.ToList();
            return Ok(treinamentos);
        }

     // GET: Treinamentos/1
        [HttpGet("{id}")]
        public IActionResult IndexId(int id)
        {
            try
            {
                Treinamento treinamento = _context.Treinamentos.Where(x => x.Id == id).Single();
                return Ok(treinamento);
            }
            catch (System.Exception)
            {
                return BadRequest();
                throw;
            }
        }

    //POST: Treinamentos/
    [HttpPost]
    public IActionResult inserirTreinamento([FromBody]Treinamento treinamento)
    {

      try
      {
        _context.Treinamentos.Add(treinamento);
        _context.SaveChanges();
        return Ok();
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

    //PUT: Treinamentos/
    [HttpPut]
    public IActionResult alterarTreinamento([FromBody]Treinamento treinamento)
    {
      Treinamento tr = new Treinamento();
      
      tr = _context.Treinamentos.Find(treinamento.Id);
      try
      {
        if(treinamento != tr)
        {
            _context.Treinamentos.Update(treinamento);
            _context.SaveChanges();
            return Ok();
        }
        else
          return BadRequest("Treinamento não alterado");
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

	// DELETE: Treinamentos/1
	[HttpDelete("{id}")]
	public IActionResult deletarTreinamento(int id)
	{
	    try
	    {
		Treinamento treinamento;
		treinamento = _context.Treinamentos.Find(id);
		_context.Treinamentos.Remove(treinamento);

		try
		{
		    _context.SaveChanges();
		    return Ok();
		}
		catch (System.Exception)
		{

		    throw;
		}
	    }
	    catch (System.Exception)
	    {
		return BadRequest();
		throw;
	    }

	}

  }
}
