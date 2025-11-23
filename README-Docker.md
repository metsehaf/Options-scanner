# 🐳 Options Scanner - Docker Setup Guide

A complete Docker containerization setup for the Options Scanner application with NestJS backend, Next.js frontend, and PostgreSQL database.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Development Mode](#development-mode)
- [Production Deployment](#production-deployment)
- [Service Details](#service-details)
- [Troubleshooting](#troubleshooting)
- [Useful Commands](#useful-commands)

## 🏗️ Overview

This Docker setup provides a complete development and production environment for the Options Scanner application, featuring:

- **NestJS Backend** (TypeScript) - RESTful API server
- **Next.js Frontend** (React) - User interface
- **PostgreSQL 15** - Database with persistent storage
- **Multi-stage builds** - Optimized for both development and production
- **Hot reloading** - Fast development workflow
- **Health checks** - Reliable service monitoring

## 🏛️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   NestJS        │    │   PostgreSQL    │
│   Frontend      │    │   Backend       │    │   Database      │
│   Port: 3000    │◄──►│   Port: 8626    │◄──►│   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Service Communication:

- **Frontend** → **Backend**: HTTP API calls via port 8626
- **Backend** → **Database**: PostgreSQL connection via port 5432
- **External** → **Frontend**: Public access via port 3000

## ⚡ Prerequisites

- **Docker** (v20.0+)
- **Docker Compose** (v2.0+)
- **Git**
- **4GB+ RAM** available

### Installation:

```bash
# macOS (using Homebrew)
brew install docker docker-compose

# Or download Docker Desktop from https://docker.com
```

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
git clone <your-repo-url>
cd options-scanner
```

### 2. Environment Setup

```bash
# Copy the environment template
cp .env.example .env

# Edit your environment variables
nano .env
```

### 3. Launch Development Environment

```bash
# Start all services with hot reloading
docker-compose -f docker-compose.dev.yml up --build

# Or run in background
docker-compose -f docker-compose.dev.yml up -d --build
```

### 4. Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8626
- **Database**: localhost:5432

## 📁 Project Structure

```
options-scanner/
├── 📄 docker-compose.yml          # Production orchestration
├── 📄 docker-compose.dev.yml      # Development orchestration
├── 📄 .env                        # Environment variables
├── 📄 .dockerignore               # Docker ignore patterns
├── 📄 README-Docker.md            # This documentation
│
├── 📁 server/bullx/               # NestJS Backend
│   ├── 🐳 Dockerfile             # Production backend image
│   ├── 🐳 Dockerfile.dev         # Development backend image
│   ├── 📄 .dockerignore          # Backend ignore patterns
│   ├── 📄 .env                   # Local development config
│   └── 📁 src/                   # Source code
│
├── 📁 client/                     # Next.js Frontend
│   ├── 🐳 Dockerfile             # Production frontend image
│   ├── 🐳 Dockerfile.dev         # Development frontend image
│   ├── 📄 .dockerignore          # Frontend ignore patterns
│   └── 📁 src/                   # Source code
│
└── 📁 database/                   # Database initialization
    └── 📁 init/
        └── 📄 01-init.sql         # Database setup scripts
```

## ⚙️ Environment Configuration

### Required Environment Variables:

#### **Database Configuration:**

```env
POSTGRES_HOST=postgres              # Docker service name
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=bullx_dev
```

#### **Authentication (Auth0):**

```env
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_AUDIENCE=https://bullx/api
```

#### **API Keys:**

```env
FMP_API_KEY=your_financial_modeling_prep_key
Polygon_API_KEY=your_polygon_key
MarketStack_API_KEY=your_marketstack_key
AlphaVantage_API_KEY=your_alphavantage_key
```

#### **Frontend Configuration:**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8626
FRONTEND_APP_AUTH0_BASE_URL=http://localhost:3000
```

## 🛠️ Development Mode

### Features:

- **Hot Reloading**: Code changes trigger automatic rebuilds
- **Volume Mounting**: Local code changes sync with containers
- **Debug Access**: Full development tools available

### Start Development:

```bash
# Start with logs visible
docker-compose -f docker-compose.dev.yml up --build

# Start in background
docker-compose -f docker-compose.dev.yml up -d --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f [service_name]
```

### Development Workflow:

1. Make code changes in your editor
2. Changes automatically sync to containers
3. Services restart automatically
4. View changes at http://localhost:3000

## 🚀 Production Deployment

### Features:

- **Multi-stage builds**: Optimized image sizes
- **Production configurations**: Environment-specific settings
- **Health checks**: Service monitoring and recovery
- **Security**: Non-root users, minimal attack surface

### Deploy Production:

```bash
# Build and start production environment
docker-compose up --build -d

# Scale services (if needed)
docker-compose up --scale backend=2 -d

# Monitor health
docker-compose ps
```

## 🔧 Service Details

### 🖥️ **Frontend Service (Next.js)**

- **Port**: 3000
- **Technology**: Next.js 13+ with TypeScript
- **Features**: SSR, API routes, Auth0 integration
- **Health Check**: HTTP GET to root path

### ⚙️ **Backend Service (NestJS)**

- **Port**: 8626
- **Technology**: NestJS with TypeScript
- **Features**: REST API, JWT authentication, TypeORM
- **Health Check**: HTTP GET to `/health` endpoint

### 🗄️ **Database Service (PostgreSQL)**

- **Port**: 5432
- **Technology**: PostgreSQL 15 Alpine
- **Features**: Persistent storage, automatic initialization
- **Health Check**: `pg_isready` command

## 🔍 Troubleshooting

### Common Issues:

#### **Port Already in Use:**

```bash
# Check what's using the port
sudo lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### **Database Connection Failed:**

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View database logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up postgres -d
```

#### **Frontend Can't Connect to Backend:**

```bash
# Check backend health
curl http://localhost:8626/health

# Verify network connectivity
docker-compose exec frontend ping backend
```

#### **Environment Variables Not Loading:**

```bash
# Verify .env file exists and has correct permissions
ls -la .env

# Check if variables are loaded in container
docker-compose exec backend printenv | grep POSTGRES
```

### 🧹 **Clean Reset:**

```bash
# Stop all services
docker-compose down

# Remove all data (⚠️ This deletes your database!)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Clean Docker system
docker system prune -a
```

## 📝 Useful Commands

### **Service Management:**

```bash
# Start specific service
docker-compose up [service_name]

# Restart specific service
docker-compose restart [service_name]

# View service logs
docker-compose logs -f [service_name]

# Execute command in container
docker-compose exec [service_name] [command]
```

### **Development Commands:**

```bash
# Install new npm package in backend
docker-compose exec backend npm install [package_name]

# Run database migrations
docker-compose exec backend npm run migration:run

# Access database shell
docker-compose exec postgres psql -U postgres -d bullx_dev
```

### **Monitoring:**

```bash
# View all running containers
docker-compose ps

# Monitor resource usage
docker stats

# View container details
docker inspect options-scanner-backend
```

### **Backup & Restore:**

```bash
# Backup database
docker-compose exec postgres pg_dump -U postgres bullx_dev > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T postgres psql -U postgres -d bullx_dev
```

## 🎯 Next Steps

1. **Configure Production Secrets**: Replace development credentials
2. **Set up CI/CD**: Automate builds and deployments
3. **Add Monitoring**: Implement logging and metrics collection
4. **SSL/TLS**: Configure HTTPS for production
5. **Load Balancing**: Scale services as needed

## 📞 Support

For issues and questions:

- Check the [troubleshooting section](#troubleshooting)
- Review Docker logs: `docker-compose logs`
- Create an issue in the project repository

---

**Happy Coding! 🚀**
