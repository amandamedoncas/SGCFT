using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SGCFT.Models;

namespace SGCFT.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VideoController : ControllerBase
  {
    private readonly ApiDbContext _context;

    public VideoController(ApiDbContext context)
    {
        _context = context;
    }

	// GET: Videos/
        [HttpGet]
        public IActionResult Index()
        {
            List<Video> videos = _context.Videos.ToList();
            return Ok(videos);
        }

     // GET: Videos/1
        [HttpGet("{id}")]
        public IActionResult IndexId(int id)
        {
            try
            {
                Video video = _context.Videos.Where(x => x.Id == id).Single();
                return Ok(video);
            }
            catch (System.Exception)
            {
                return BadRequest();
                throw;
            }
        }


    //POST: Videos/
    [HttpPost]
    public IActionResult inserirVideo([FromBody]Video video)
    {

      try
      {
        _context.Videos.Add(video);
        _context.SaveChanges();
        return Ok();
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

    //PUT: Videos/
    [HttpPut]
    public IActionResult alterarVideo([FromBody]Video video)
    {

      try
      {

            _context.Videos.Update(video);
            _context.SaveChanges();
            return Ok();

      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

	// DELETE: Videos/1
	[HttpDelete("{id}")]
	public IActionResult deletarVideo(int id)
	{
	    try
	    {
		Video video;
		video = _context.Videos.Find(id);
		_context.Videos.Remove(video);

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