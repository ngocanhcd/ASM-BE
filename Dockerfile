# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

# Copy csproj and restore dependencies
COPY Backend/*.csproj ./Backend/
RUN dotnet restore ./Backend/Backend.csproj

# Copy everything else and build
COPY Backend/ ./Backend/
WORKDIR /source/Backend
RUN dotnet publish -c Release -o /app

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .

# Expose port (Render will set PORT environment variable)
ENV ASPNETCORE_URLS=http://+:$PORT

ENTRYPOINT ["dotnet", "Backend.dll"]
