namespace Backend.Models
{
    public class Post
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public string? Image { get; set; } // Base64 or URL
        public int AuthorId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public User? Author { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
