# 📝 Blog Platform API

> A fully-featured RESTful Blog Platform API built with Django, Django REST Framework, and MySQL — supporting authentication, posts, comments, likes, bookmarks, tags, categories, and search.

---

## 🚀 Features

- **Authentication** — Register, login, and JWT-based token refresh
- **User Profiles** — Public profiles with bio, avatar, and website
- **Posts** — Full CRUD with slug-based URLs, draft/publish status
- **Comments** — Nested comments (reply to comments) per post
- **Likes & Bookmarks** — Toggle like or bookmark any post
- **Tags & Categories** — Organize and filter posts by tag or category
- **Search & Filtering** — Search by keyword, filter by tag/category, order by date
- **Permissions** — Only authors can edit or delete their own content

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Python 3.11+ |
| Framework | Django 5.x |
| API | Django REST Framework |
| Auth | JWT (`djangorestframework-simplejwt`) |
| Database | MySQL 8.4 |
| Environment | `python-decouple` |

---

## 📁 Project Structure

```
blog_api/
├── blog_api/            # Core project configuration
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── users/               # Auth & user profile app
├── posts/               # Posts, categories & tags app
├── interactions/        # Comments, likes & bookmarks app
├── .env                 # Environment variables (not committed)
├── requirements.txt
└── manage.py
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/blog-platform-api.git
cd blog-platform-api
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True

DB_NAME=blog_db
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
```

### 5. Set up the MySQL database

```sql
CREATE DATABASE blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create a superuser (optional)

```bash
python manage.py createsuperuser
```

### 8. Start the development server

```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/login/` | Login and get JWT tokens |
| POST | `/api/auth/refresh/` | Refresh access token |

### Profiles
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profiles/{username}/` | View a user's profile |
| PUT | `/api/profiles/{username}/` | Update your own profile |

### Posts
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts/` | List all posts (with search & filters) |
| POST | `/api/posts/` | Create a new post |
| GET | `/api/posts/{slug}/` | Get a single post |
| PUT | `/api/posts/{slug}/` | Update a post (author only) |
| DELETE | `/api/posts/{slug}/` | Delete a post (author only) |

### Comments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts/{slug}/comments/` | List comments on a post |
| POST | `/api/posts/{slug}/comments/` | Add a comment |
| DELETE | `/api/comments/{id}/` | Delete a comment (author only) |

### Likes & Bookmarks
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/posts/{slug}/like/` | Toggle like on a post |
| POST | `/api/posts/{slug}/bookmark/` | Toggle bookmark on a post |

### Tags & Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tags/` | List all tags |
| GET | `/api/categories/` | List all categories |

### Search & Filtering
```
GET /api/posts/?search=django
GET /api/posts/?tag=python
GET /api/posts/?category=tech
GET /api/posts/?ordering=-created_at
```

---

## 🗄️ Database Models

### Users App
- **User** — Extends Django's `AbstractUser`
- **Profile** — One-to-one with User; stores bio, avatar, website

### Posts App
- **Category** — name, slug
- **Tag** — name, slug
- **Post** — title, slug, content, author, category, tags (M2M), status, timestamps

### Interactions App
- **Comment** — post, author, body, parent (self-referential for nesting)
- **Like** — user + post (unique together)
- **Bookmark** — user + post (unique together)

---

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)**. After logging in, include the access token in all protected requests:

```
Authorization: Bearer <your_access_token>
```

Tokens expire after a set period. Use the `/api/auth/refresh/` endpoint with your refresh token to get a new access token.

---

## 📦 Requirements

```
Django>=5.0
djangorestframework>=3.15
djangorestframework-simplejwt>=5.3
django-filter>=23.5
mysqlclient>=2.2
python-decouple>=3.8
Pillow>=10.0
```

---

## 🧪 Running Tests

```bash
python manage.py test
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙋 Author

Built as a pet project to practice Django REST Framework, JWT authentication, and MySQL integration.  
Feel free to fork, star ⭐, or contribute!
