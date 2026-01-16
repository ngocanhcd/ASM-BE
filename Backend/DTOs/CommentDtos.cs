namespace Backend.DTOs
{
    public class CreateCommentDto
    {
        public required string Content { get; set; }
    }

    public class CommentDto
    {
        public int Id { get; set; }
        public required string Content { get; set; }
        public int PostId { get; set; }
        public int AuthorId { get; set; }
        public required string AuthorName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
