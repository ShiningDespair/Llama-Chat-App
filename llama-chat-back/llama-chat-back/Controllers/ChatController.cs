using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using llama_chat_back.Models;

namespace llama_chat_back.Controllers;

[ApiController]
[Route("api/chat")]
public class ChatController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest request)
    {
        if (string.IsNullOrEmpty(request.Message))
        {
            return BadRequest("Please Enter a message.");
        }

        var client = new HttpClient();
        var body = JsonSerializer.Serialize(new
        {
            model = "mistral",
            prompt = request.Message,
            stream = false
        });

        var content = new StringContent(body, Encoding.UTF8, "application/json");
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


        try
        {
            var response = await client.PostAsync("http://localhost:11434/api/generate", content);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<OllamaResponse>(json);

            return Ok(new { response = result?.Response ?? "No response from Ollama." });
        }
        catch
        {
            return StatusCode(500, "Error connecting to Ollama.");
        }


        //var response = await client.PostAsync("http://localhost:11434/ollama/chat", content);

        //if (!response.IsSuccessStatusCode)
        //{
        //    return StatusCode((int)response.StatusCode, "Failed to reach Ollama.");
        //}

        //var responseBody = await response.Content.ReadAsStringAsync();
        //var ollamaResponse = JsonSerializer.Deserialize<OllamaResponse>(responseBody);

        //return Ok(ollamaResponse);
    }
}
