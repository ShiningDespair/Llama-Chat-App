using System.Text.Json.Serialization;

namespace llama_chat_back.Models
{
    public class OllamaResponse
    {
        [JsonPropertyName("response")]
        public string? Response { get; set; }
    }
}
