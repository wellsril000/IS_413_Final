using IS_413_Final.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IS_413_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private readonly EntertainerDbContext _entertainerDbContext;

        public EntertainerController(EntertainerDbContext context)
        {
            _entertainerDbContext = context;
        }

        // ✅ Get all Engagements
        [HttpGet("AllEngagements")]
        public async Task<ActionResult<List<Engagement>>> AllEngagements()
        {
            var engagements = await _entertainerDbContext.Engagements.ToListAsync();
            return Ok(engagements);
        }

        // ✅ Get all entertainers
        [HttpGet("AllEntertainers")]
        public async Task<ActionResult<List<Entertainer>>> AllItems()
        {
            var entertainers = await _entertainerDbContext.Entertainers.ToListAsync();
            return Ok(entertainers);
        }

        // ✅ Grab a specific entertainer by id
        [HttpGet("Entertainer/{id}")]
        public async Task<ActionResult<Entertainer>> GetEntertainerById(int id)
        {
            var entertainer = await _entertainerDbContext.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }
            return Ok(entertainer);
        }

        // ✅ Update an entertainer
        [HttpPut("UpdateEntertainer/{id}")]
        public async Task<ActionResult<Entertainer>> UpdateEntertainer(int id, Entertainer updatedEntertainer)
        {
            var entertainer = await _entertainerDbContext.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }

            // Update fields
            entertainer.EntStageName = updatedEntertainer.EntStageName;
            entertainer.EntSSN = updatedEntertainer.EntSSN;
            entertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            entertainer.EntCity = updatedEntertainer.EntCity;
            entertainer.EntState = updatedEntertainer.EntState;
            entertainer.EntZipCode = updatedEntertainer.EntZipCode;
            entertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
            entertainer.EntWebPage = updatedEntertainer.EntWebPage;
            entertainer.EntEMailAddress = updatedEntertainer.EntEMailAddress;
            entertainer.DateEntered = updatedEntertainer.DateEntered;

            await _entertainerDbContext.SaveChangesAsync();
            return Ok(entertainer);
        }

        // ✅ Add an entertainer
        [HttpPost("AddEntertainer")]
        public async Task<ActionResult<Entertainer>> AddEntertainer(Entertainer entertainer)
        {
            await _entertainerDbContext.Entertainers.AddAsync(entertainer);
            await _entertainerDbContext.SaveChangesAsync();
            return Ok(entertainer);
        }


        // ✅ Delete an entertainer
        [HttpDelete("DeleteEntertainer/{id}")]
        public async Task<ActionResult> DeleteEntertainer(int id)
        {
            var entertainer = await _entertainerDbContext.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }

            _entertainerDbContext.Entertainers.Remove(entertainer);
            await _entertainerDbContext.SaveChangesAsync();
            return NoContent(); // ✅ Add return to satisfy compiler
        }

        // ✅ Get entertainer stats: number of engagements + last engagement date
        [HttpGet("EntertainerStats")]
public async Task<ActionResult> GetEntertainerStats()
{
    var engagements = await _entertainerDbContext.Engagements.ToListAsync(); // fetch all first

    var stats = engagements
        .GroupBy(e => e.EntertainerID)
        .Select(group => new
        {
            EntertainerID = group.Key,
            EngagementCount = group.Count(),
            LastEngagementDate = group.Max(e => DateTime.Parse(e.EndDate))
        })
        .ToList();

    return Ok(stats);
}
    }
}