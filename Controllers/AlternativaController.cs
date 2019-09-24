using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SGCFT.Models;

namespace SGCFT.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AlternativaController : ControllerBase
  {
    private readonly ApiDbContext _context;

    public AlternativaController(ApiDbContext context)
    {
        _context = context;
    }

	 // GET: Alternativas/
	 [HttpGet]
	public IActionResult Index()
		{
			List<Alternativa> alternativas = _context.Alternativas.ToList();
			return Ok(alternativas);
		}

      // GET: Alternativas/1
        [HttpGet("{id}")]
      
		public ActionResult IndexId(int id)
		{
			 try
            {
                Alternativa alternativa= _context.Alternativas.Where(x => x.Id == id).Single();
                return Ok(alternativa);
            }
            catch (System.Exception)
            {
                return BadRequest();
                throw;
            }
			
		}


    //POST: Alternativas/
    [HttpPost]
    public IActionResult inserirAlternativa([FromBody]Alternativa alternativa)
    {

      try
      {
        _context.Alternativas.Add(alternativa);
        _context.SaveChanges();
        return Ok();
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

    //PUT: Alternativas/
    [HttpPut]
    public IActionResult alterarAlternativa([FromBody]Alternativa alternativa)
    {
      
      try
      {
        
        _context.Alternativas.Update(alternativa);
        _context.SaveChanges();
        return Ok();
      }
      catch(System.Exception e)
      {
          return BadRequest();
          throw e;
      }
    }
    
    
    // DELETE: Alternativas/
        [HttpDelete ("{id}")]
        public IActionResult deletarAlternativa(int id)
        {
            try
            {
                Alternativa alternativa;
                alternativa = _context.Alternativas.Find(id);
                _context.Alternativas.Remove(alternativa);

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
