# 🌟 Lumina Blog Platform & RESTful API

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![SQLAlchemy 2.0](https://img.shields.io/badge/SQLAlchemy-2.0-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org/)
[![Pydantic v2](https://img.shields.io/badge/Pydantic-v2-E92063?style=for-the-badge&logo=pydantic&logoColor=white)](https://docs.pydantic.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, high-performance **Full-Stack Blog Platform & REST API**. Powered by **FastAPI**, **SQLAlchemy 2.0**, **Pydantic v2**, and **MySQL/SQLite** on the backend, paired with **Lumina** — a sleek, responsive **Glassmorphism web interface** on the frontend.

---

## ✨ Key Highlights

- ⚡ **High-Performance Async Backend**: Built with FastAPI & Uvicorn for asynchronous I/O and near-instant response times.
- 🎨 **Lumina Glassmorphic UI**: Ambient light orbs, backdrop blur, smooth micro-interactions, responsive layout, and zero dependencies.
- 🔐 **Secure Authentication**: OAuth2 password flow with JWT bearer tokens (`python-jose`) and salted bcrypt password hashing (`passlib`).
- 📝 **Full Article & Content Management**: Posts with slug-based URLs, published/draft statuses, category filtering, and tag management.
- 💬 **Hierarchical Interactions**: Multi-tier nested comments, like toggling, post bookmarking, and live engagement metrics.
- 🔍 **Real-Time Search & Filters**: Search across titles, content, categories, and tags with keyboard shortcut (`/`) focus.
- 📚 **Self-Documenting API**: Live interactive Swagger UI (`/docs`) and ReDoc (`/redoc`) generated automatically from Pydantic schemas.
- 🛡️ **Dual-Mode Frontend**: Seamlessly operates with the live FastAPI backend or automatically activates realistic mock data for zero-config visual previewing.

---

## 🏗️ System Architecture

```mermaid
graph TD
    Client["Client Browser (Lumina Frontend)"]
    API["FastAPI Application (Uvicorn ASGI)"]
    Auth["JWT & OAuth2 Security"]
    Router["API v1 Routers (/auth, /posts, /users, /interactions)"]
    ORM["SQLAlchemy 2.0 ORM"]
    DB[("Database: SQLite / MySQL")]

    Client -->|HTTP / JSON| API
    API --> Auth
    API --> Router
    Router --> ORM
    ORM --> DB
```

---

## 📁 Repository Structure

```
Blog_API/
├── app/
│   ├── api/
│   │   ├── deps.py              # FastAPI dependencies (get_db, get_current_user)
│   │   └── v1/
│   │       ├── api.py           # Master router aggregator
│   │       └── endpoints/
│   │           ├── auth.py      # Registration, login, token refresh
│   │           ├── users.py     # User profiles & settings
│   │           ├── posts.py     # Post CRUD, category & tag filters
│   │           └── interactions.py # Comments, likes, bookmarks
│   ├── core/
│   │   ├── config.py            # Pydantic BaseSettings & env loader
│   │   └── security.py          # Password hashing (bcrypt) & JWT helpers
│   ├── db/
│   │   ├── base.py              # Declarative Base metadata
│   │   └── session.py           # SQLAlchemy Engine & SessionLocal maker
│   ├── models/                  # SQLAlchemy ORM models
│   │   ├── user.py              # User entity
│   │   ├── post.py              # Post, Category, Tag entities
│   │   └── interaction.py       # Comment, Like, Bookmark entities
│   ├── schemas/                 # Pydantic v2 schemas for validation
│   │   ├── user.py
│   │   ├── post.py
│   │   └── interaction.py
│   └── main.py                  # FastAPI app factory, CORS, & healthcheck
├── frontend/                    # Lumina Glassmorphism Web App
│   ├── index.html               # Semantic HTML5 layout & modal overlays
│   ├── style.css                # Glassmorphism design tokens & responsive CSS
│   └── app.js                   # Client state, animations, & API bridge
├── tests/                       # Pytest test suite
│   ├── conftest.py              # Test fixtures & SQLite in-memory DB
│   └── ...                      # Unit & integration tests
├── .env.example                 # Environment variables blueprint
├── .gitignore                   # Ignored files (venv, env, pycache)
├── requirements.txt             # Python dependencies
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Python 3.10+** installed on your system.
- *(Optional)* MySQL 8.0+ (SQLite works out-of-the-box with zero configuration).

### 2. Clone the Repository
```bash
git clone https://github.com/Ali4624/Blog_API.git
cd Blog_API
```

### 3. Set Up Virtual Environment
```bash
# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 5. Configure Environment Variables
Copy the template `.env.example` to `.env`:
```bash
# Windows
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

Default configuration in `.env`:
```env
# App Settings
PROJECT_NAME="Blog Platform API"
API_V1_STR="/api/v1"
SECRET_KEY="change-this-to-a-super-secret-key-in-production"
ACCESS_TOKEN_EXPIRE_MINUTES=11520 # 8 days

# Database: SQLite (default zero-setup)
DATABASE_URL="sqlite:///./blog.db"

# Or MySQL:
# DATABASE_URL="mysql+pymysql://root:password@localhost:3306/blog_db"
```

### 6. Run the FastAPI Backend
```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- API Health Check: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
- Interactive Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Alternative ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### 7. Launch the Lumina Frontend
Simply open `frontend/index.html` in your web browser:
- On Windows: Double-click `frontend/index.html` or run:
  ```powershell
  start frontend/index.html
  ```
- Or serve it using Python's static server:
  ```bash
  python -m http.server 3000 --directory frontend
  ```
  Visit [http://localhost:3000](http://localhost:3000).

---

## 📖 API Endpoints Overview

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/v1/auth/register` | Register a new user account | ❌ |
| `POST` | `/api/v1/auth/login` | Login with username/password, returns JWT | ❌ |

### Users & Profiles (`/api/v1/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/v1/users/me` | Fetch currently authenticated user | ✅ |
| `PUT` | `/api/v1/users/me` | Update bio, avatar, and social links | ✅ |
| `GET` | `/api/v1/users/{username}` | Fetch public author profile | ❌ |

### Articles & Posts (`/api/v1/posts`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/v1/posts/` | List posts (filters: `search`, `category`, `tag`, pagination) | ❌ |
| `POST` | `/api/v1/posts/` | Create a new blog post | ✅ |
| `GET` | `/api/v1/posts/{slug}` | Get single post details by slug | ❌ |
| `PUT` | `/api/v1/posts/{slug}` | Update post content (author only) | ✅ |
| `DELETE` | `/api/v1/posts/{slug}` | Delete post (author only) | ✅ |

### Interactions (`/api/v1/posts/{slug}/...`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/v1/posts/{slug}/comments` | Get nested comment thread | ❌ |
| `POST` | `/api/v1/posts/{slug}/comments` | Submit comment or reply to parent ID | ✅ |
| `POST` | `/api/v1/posts/{slug}/like` | Toggle like status on article | ✅ |
| `POST` | `/api/v1/posts/{slug}/bookmark` | Toggle bookmark status on article | ✅ |

---

## 🧪 Testing

Run automated tests using `pytest`:

```bash
pytest -v
```

To run with coverage:
```bash
pytest --cov=app tests/
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
