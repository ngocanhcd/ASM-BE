# Backend - ASP.NET Core Web API for ASM-BANHANG

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login and get JWT token

### Posts
- GET `/api/posts` - Get all posts
- GET `/api/posts/{id}` - Get single post
- POST `/api/posts` - Create new post (requires auth)
- PUT `/api/posts/{id}` - Update post (requires auth, only author)
- DELETE `/api/posts/{id}` - Delete post (requires auth, only author)

### Comments
- GET `/api/posts/{postId}/comments` - Get all comments for a post
- POST `/api/posts/{postId}/comments` - Add comment to post (requires auth)
- DELETE `/api/posts/{postId}/comments/{id}` - Delete comment (requires auth, only author)

## Running Locally

```bash
cd Backend
dotnet run
```

The API will be available at `http://localhost:5000`

## Deployment to Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect to GitHub repository
4. Use the following settings:
   - Build Command: `cd Backend && dotnet publish -c Release -o out`
   - Start Command: `cd Backend/out && dotnet Backend.dll --urls=http://0.0.0.0:$PORT`
   - Environment: Set `ASPNETCORE_ENVIRONMENT=Production`

## Database

Using SQLite for simplicity. The database file `app.db` will be created automatically on first run.
