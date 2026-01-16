namespace Backend.DTOs
{
    public class CreatePostDto
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public string? Image { get; set; }
    }

    public class UpdatePostDto
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public string? Image { get; set; }
    }

    public class PostDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public string? Image { get; set; }
        public int AuthorId { get; set; }
        public required string AuthorName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int CommentCount { get; set; }
    }
}
