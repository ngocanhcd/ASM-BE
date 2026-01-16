namespace Backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public required string Content { get; set; }
        public int PostId { get; set; }
        public int AuthorId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public Post? Post { get; set; }
        public User? Author { get; set; }
    }
}
