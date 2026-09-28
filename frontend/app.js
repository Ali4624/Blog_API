/**
 * Lumina Blog Platform - Client Application
 * Handles glass UI interactions, search, filtering, modals, and seamless FastAPI connectivity.
 */

// ==========================================================================
// 1. Configuration & API Bridge
// ==========================================================================
const API_CONFIG = {
  // When your FastAPI backend is running, this connects directly:
  baseUrl: 'http://localhost:8000/api/v1',
  healthUrl: 'http://localhost:8000/health',
  endpoints: {
    posts: '/posts',
    login: '/auth/login',
    register: '/auth/register'
  }
};

// ==========================================================================
// 2. Realistic Initial Data (For instant visual preview)
// ==========================================================================
const INITIAL_POSTS = [
  {
    id: 1,
    slug: 'architecting-high-throughput-rest-apis-fastapi-postgresql',
    title: 'Architecting High-Throughput REST APIs with FastAPI & PostgreSQL',
    category: 'fastapi',
    tags: ['fastapi', 'postgresql', 'architecture'],
    excerpt: 'Explore battle-tested patterns for asynchronous database sessions, dependency injection, and clean layered architecture designed for modern cloud-native systems.',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Sarah Chen',
      role: 'Backend Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    date: 'Oct 14, 2026',
    readTime: '7 min read',
    likes: 128,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { author: 'David K.', text: 'The async SQLAlchemy 2.0 session pattern here is gold. Exactly what we needed.', date: '2 hours ago' },
      { author: 'Elena Rostova', text: 'FastAPI dependency injection makes testing so clean.', date: 'Yesterday' }
    ],
    content: `
      <p>Modern web engineering demands high concurrency, strict type validation, and rapid response latencies. In this deep dive, we explore how <strong>FastAPI</strong> paired with <strong>PostgreSQL</strong> delivers top-tier performance when configured with SQLAlchemy 2.0 async sessions.</p>
      
      <h2>1. The Power of Dependency Injection</h2>
      <p>FastAPI’s built-in <code>Depends</code> system decouples your route handlers from database lifecycle management. Each incoming HTTP request receives its own isolated database session that automatically rolls back on errors and closes upon response delivery.</p>

      <pre><code>from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db

@router.get("/posts")
async def list_posts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Post))
    return result.scalars().all()</code></pre>

      <h2>2. PostgreSQL Connection Pooling</h2>
      <p>By tuning pool sizes with <code>pool_size=20</code> and <code>max_overflow=10</code>, you prevent connection exhaustion while ensuring your server handles sudden traffic spikes effortlessly.</p>

      <h2>Conclusion</h2>
      <p>Combining declarative Pydantic schemas with asynchronous ORM mappings gives you the safety of static typing alongside PostgreSQL’s battle-tested transactional integrity.</p>
    `
  },
  {
    id: 2,
    slug: 'mastering-postgresql-indexes-query-performance',
    title: 'Mastering PostgreSQL Indexes for 10x Faster Query Performance',
    category: 'postgresql',
    tags: ['postgresql', 'database', 'performance'],
    excerpt: 'B-Tree, GIN, and BRIN indexes explained with real EXPLAIN ANALYZE queries to optimize slow JOINs and pagination.',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Marcus Vance',
      role: 'DBA & Core Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    date: 'Oct 11, 2026',
    readTime: '5 min read',
    likes: 85,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { author: 'Alex Turner', text: 'GIN indexes on JSONB fields made our tag queries instantaneous.', date: '3 days ago' }
    ],
    content: `
      <p>Database latency is frequently the true bottleneck in web applications. Adding proper composite indexes in PostgreSQL can transform multi-second sequential scans into millisecond index scans.</p>
      <h2>Using EXPLAIN ANALYZE</h2>
      <p>Always inspect query execution plans before guessing where to put indexes:</p>
      <pre><code>EXPLAIN ANALYZE 
SELECT * FROM posts 
WHERE category = 'fastapi' 
ORDER BY created_at DESC 
LIMIT 20;</code></pre>
      <p>A composite index on <code>(category, created_at DESC)</code> satisfies both the filter and sorting in a single traversal.</p>
    `
  },
  {
    id: 3,
    slug: 'python-312-concurrency-and-asyncio-best-practices',
    title: 'Python Concurrency: Writing Clean Async Code in 2026',
    category: 'python',
    tags: ['python', 'asyncio', 'backend'],
    excerpt: 'Avoid common pitfalls with TaskGroups, cancellation tokens, and thread pools when mixing CPU-bound and I/O-bound tasks.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Alina Becker',
      role: 'Python Core Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80'
    },
    date: 'Oct 08, 2026',
    readTime: '6 min read',
    likes: 94,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    content: `
      <p>Python's modern <code>asyncio.TaskGroup</code> introduced clean structured concurrency. No more dangling background coroutines or unhandled exceptions escaping your workers.</p>
      <pre><code>async def fetch_all_feeds():
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(fetch_user_feed())
        t2 = tg.create_task(fetch_trending())
    return t1.result(), t2.result()</code></pre>
    `
  },
  {
    id: 4,
    slug: 'designing-clean-glassmorphic-user-interfaces',
    title: 'Crafting Depth & Elegance with Glassmorphism in Modern CSS',
    category: 'frontend',
    tags: ['css', 'frontend', 'ui-design'],
    excerpt: 'Master backdrop-filter, subtle borders, specular highlights, and ambient light sources for premium dark-mode aesthetics.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Julian Croft',
      role: 'Design Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
    },
    date: 'Oct 05, 2026',
    readTime: '4 min read',
    likes: 142,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { author: 'Maya', text: 'The specular inner highlight `inset 0 1px 1px` makes all the difference!', date: 'Oct 06' }
    ],
    content: `
      <p>True glassmorphism is not just blurred transparency. It requires three fundamental layers working in harmony:</p>
      <ol>
        <li><strong>Ambient depth:</strong> Floating, blurred, and vibrant light sources behind the glass surface.</li>
        <li><strong>Backdrop blur:</strong> Frosted translucent panels with <code>backdrop-filter: blur(20px)</code>.</li>
        <li><strong>Physical borders:</strong> Subtle 1px gradients and specular inset highlights to give the glass edge definition.</li>
      </ol>
    `
  },
  {
    id: 5,
    slug: 'clean-layered-architecture-in-fastapi',
    title: 'Clean Architecture in FastAPI: Repositories, Services, and Routers',
    category: 'architecture',
    tags: ['architecture', 'fastapi', 'clean-code'],
    excerpt: 'Structure your Python microservices and monoliths with domain separation to make your codebase testable and maintainable.',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Sarah Chen',
      role: 'Backend Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    date: 'Sep 29, 2026',
    readTime: '8 min read',
    likes: 110,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    content: `
      <p>Separating your HTTP routing from database access logic prevents messy controller bloat. By employing a Service layer and a Repository pattern, your business logic can be tested in isolation with zero database mocks.</p>
    `
  },
  {
    id: 6,
    slug: 'containerizing-fastapi-and-postgres-with-docker',
    title: 'Zero to Production: Docker Compose for FastAPI & PostgreSQL',
    category: 'devops',
    tags: ['devops', 'docker', 'postgresql'],
    excerpt: 'A clean docker-compose.yml configuration with volume persistence, health checks, and automatic Alembic migrations.',
    coverImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Marcus Vance',
      role: 'DBA & Core Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    date: 'Sep 24, 2026',
    readTime: '5 min read',
    likes: 76,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    content: `
      <p>Using multi-stage Docker builds keeps your final FastAPI container image under 150MB while maintaining security by running as a non-root user.</p>
    `
  }
];

// ==========================================================================
// 3. State Management
// ==========================================================================
let state = {
  posts: [...INITIAL_POSTS],
  activeCategory: 'all',
  searchQuery: '',
  activePost: null,
  isBackendConnected: false
};

// ==========================================================================
// 4. DOM Element References
// ==========================================================================
const elements = {
  articlesGrid: document.getElementById('articles-grid'),
  postsCount: document.getElementById('posts-count'),
  categoriesList: document.getElementById('categories-list'),
  searchInput: document.getElementById('search-input'),
  statusBadge: document.getElementById('api-status-badge'),
  statusText: document.getElementById('status-text'),
  
  // Modals
  readerModal: document.getElementById('reader-modal'),
  closeReaderBtn: document.getElementById('close-reader-btn'),
  readerTitle: document.getElementById('reader-title'),
  readerCategories: document.getElementById('reader-categories'),
  readerAuthorAvatar: document.getElementById('reader-author-avatar'),
  readerAuthorName: document.getElementById('reader-author-name'),
  readerDate: document.getElementById('reader-date'),
  readerReadtime: document.getElementById('reader-readtime'),
  readerCoverImg: document.getElementById('reader-cover-img'),
  readerHeroImgWrap: document.getElementById('reader-hero-img-wrap'),
  readerBody: document.getElementById('reader-body'),
  readerLikeBtn: document.getElementById('reader-like-btn'),
  readerLikeCount: document.getElementById('reader-like-count'),
  readerBookmarkBtn: document.getElementById('reader-bookmark-btn'),
  readerProgressBar: document.getElementById('reader-progress'),
  commentsCount: document.getElementById('comments-count'),
  commentsList: document.getElementById('comments-list'),
  newCommentInput: document.getElementById('new-comment-input'),
  submitCommentBtn: document.getElementById('submit-comment-btn'),

  // Featured Hero Button
  readFeaturedBtn: document.getElementById('read-featured-btn'),

  // Create Post Modal
  createModal: document.getElementById('create-modal'),
  openCreateBtn: document.getElementById('open-create-btn'),
  closeCreateBtn: document.getElementById('close-create-btn'),
  cancelCreateBtn: document.getElementById('cancel-create-btn'),
  createPostForm: document.getElementById('create-post-form'),

  // Auth Modal
  authModal: document.getElementById('auth-modal'),
  openAuthBtn: document.getElementById('open-auth-btn'),
  closeAuthBtn: document.getElementById('close-auth-btn'),
  tabLogin: document.getElementById('tab-login'),
  tabRegister: document.getElementById('tab-register'),
  loginForm: document.getElementById('login-form'),
  registerForm: document.getElementById('register-form'),
  toastContainer: document.getElementById('toast-container')
};

// ==========================================================================
// 5. Initializer & Backend Detection
// ==========================================================================
async function initApp() {
  // Check if saved posts exist in localStorage
  const savedPosts = localStorage.getItem('lumina_blog_posts');
  if (savedPosts) {
    try {
      state.posts = JSON.parse(savedPosts);
    } catch (e) {
      console.warn('Could not parse saved posts, using defaults');
    }
  }

  // Attempt to check if FastAPI backend is online
  checkBackendConnection();

  // Render Initial Feed
  renderArticles();
  setupEventListeners();
}

/**
 * Checks if FastAPI server is active on localhost:8000/health
 */
async function checkBackendConnection() {
  try {
    const res = await fetch(API_CONFIG.healthUrl, { method: 'GET', mode: 'cors' });
    if (res.ok) {
      state.isBackendConnected = true;
      elements.statusText.textContent = 'FastAPI: Connected (Live)';
      elements.statusBadge.style.borderColor = 'rgba(16, 185, 129, 0.5)';
      showToast('Connected to FastAPI backend!', 'success');
      
      // Optionally fetch live posts from FastAPI
      fetchLivePosts();
    }
  } catch (err) {
    // Expected when user hasn't run the backend yet
    state.isBackendConnected = false;
    elements.statusText.textContent = 'Local Preview Mode';
  }
}

/**
 * Fetches real posts from the FastAPI /api/v1/posts endpoint if available
 */
async function fetchLivePosts() {
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.posts}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        state.posts = data;
        renderArticles();
      }
    }
  } catch (e) {
    console.log('Using local client preview data');
  }
}

// ==========================================================================
// 6. Rendering Logic
// ==========================================================================
function getFilteredPosts() {
  return state.posts.filter(post => {
    // Category filter
    const matchesCategory = state.activeCategory === 'all' || post.category === state.activeCategory;
    
    // Search query filter
    const query = state.searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch = 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(query))) ||
      (post.author && post.author.name.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });
}

function renderArticles() {
  const filtered = getFilteredPosts();
  elements.postsCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'article' : 'articles'}`;

  if (filtered.length === 0) {
    elements.articlesGrid.innerHTML = `
      <div class="glass-card" style="grid-column: 1 / -1; padding: 48px; text-align: center;">
        <h3 style="font-family: Outfit, sans-serif; font-size: 1.4rem; margin-bottom: 8px;">No matching articles found</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Try adjusting your search query or choosing another category.</p>
      </div>
    `;
    return;
  }

  elements.articlesGrid.innerHTML = filtered.map(post => `
    <article class="glass-card article-card" data-id="${post.id}">
      <div class="card-image-wrap">
        <img src="${post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}" alt="${post.title}" loading="lazy">
        <span class="card-tag-badge">${post.category || 'General'}</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${post.title}</h3>
        <p class="card-excerpt">${post.excerpt}</p>
        
        <div class="card-footer">
          <div class="card-author">
            <img src="${post.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}" alt="${post.author?.name}" class="author-img">
            <div>
              <span class="card-author-name">${post.author?.name || 'Author'}</span>
              <span class="card-date">${post.date}</span>
            </div>
          </div>

          <div class="card-actions">
            <button class="icon-action-btn like-btn ${post.isLiked ? 'active' : ''}" data-id="${post.id}" title="Like">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${post.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>${post.likes || 0}</span>
            </button>
            <button class="icon-action-btn bookmark-btn ${post.isBookmarked ? 'active' : ''}" data-id="${post.id}" title="Bookmark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${post.isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// ==========================================================================
// 7. Full Reader View Modal Logic
// ==========================================================================
function openReaderModal(post) {
  state.activePost = post;

  elements.readerTitle.textContent = post.title;
  elements.readerCategories.innerHTML = `<span class="article-tag">${post.category.toUpperCase()}</span>`;
  elements.readerAuthorAvatar.src = post.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80';
  elements.readerAuthorName.textContent = post.author?.name || 'Author';
  elements.readerDate.textContent = post.date;
  elements.readerReadtime.textContent = post.readTime || '5 min read';
  
  if (post.coverImage) {
    elements.readerCoverImg.src = post.coverImage;
    elements.readerHeroImgWrap.style.display = 'block';
  } else {
    elements.readerHeroImgWrap.style.display = 'none';
  }

  elements.readerBody.innerHTML = post.content || `<p>${post.excerpt}</p>`;
  elements.readerLikeCount.textContent = post.likes || 0;

  // Like & Bookmark state
  elements.readerLikeBtn.classList.toggle('active', !!post.isLiked);
  elements.readerBookmarkBtn.classList.toggle('active', !!post.isBookmarked);

  renderComments(post.comments || []);

  elements.readerModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReaderModal() {
  elements.readerModal.classList.remove('open');
  document.body.style.overflow = '';
  state.activePost = null;
}

function renderComments(comments) {
  elements.commentsCount.textContent = comments.length;
  if (comments.length === 0) {
    elements.commentsList.innerHTML = `<p style="color: var(--text-dim); font-size: 0.9rem;">No comments yet. Start the conversation!</p>`;
    return;
  }

  elements.commentsList.innerHTML = comments.map(c => `
    <div class="comment-card">
      <div class="comment-author-row">
        <strong style="font-size: 0.88rem;">${c.author}</strong>
        <span style="font-size: 0.75rem; color: var(--text-dim); margin-left: auto;">${c.date}</span>
      </div>
      <p class="comment-body">${c.text}</p>
    </div>
  `).join('');
}

// ==========================================================================
// 8. Event Listeners & Interactive Handlers
// ==========================================================================
function setupEventListeners() {
  // Category Navigation
  elements.categoriesList.addEventListener('click', (e) => {
    const pill = e.target.closest('.category-pill');
    if (!pill) return;
    
    document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    state.activeCategory = pill.dataset.category;
    renderArticles();
  });

  // Live Search Input
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderArticles();
  });

  // Keyboard shortcut '/' to focus search
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== elements.searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      elements.searchInput.focus();
    }
  });

  // Featured Story Read Button
  elements.readFeaturedBtn.addEventListener('click', () => {
    const featured = state.posts[0];
    if (featured) openReaderModal(featured);
  });

  // Grid Card Click & Actions
  elements.articlesGrid.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.like-btn');
    const bookmarkBtn = e.target.closest('.bookmark-btn');
    const card = e.target.closest('.article-card');

    if (likeBtn) {
      e.stopPropagation();
      toggleLike(parseInt(likeBtn.dataset.id));
      return;
    }

    if (bookmarkBtn) {
      e.stopPropagation();
      toggleBookmark(parseInt(bookmarkBtn.dataset.id));
      return;
    }

    if (card) {
      const postId = parseInt(card.dataset.id);
      const post = state.posts.find(p => p.id === postId);
      if (post) openReaderModal(post);
    }
  });

  // Modal Closers
  elements.closeReaderBtn.addEventListener('click', closeReaderModal);
  elements.readerModal.addEventListener('click', (e) => {
    if (e.target === elements.readerModal) closeReaderModal();
  });

  // Reader Modal Like & Bookmark
  elements.readerLikeBtn.addEventListener('click', () => {
    if (state.activePost) {
      toggleLike(state.activePost.id);
      elements.readerLikeCount.textContent = state.activePost.likes;
      elements.readerLikeBtn.classList.toggle('active', state.activePost.isLiked);
    }
  });

  elements.readerBookmarkBtn.addEventListener('click', () => {
    if (state.activePost) {
      toggleBookmark(state.activePost.id);
      elements.readerBookmarkBtn.classList.toggle('active', state.activePost.isBookmarked);
    }
  });

  // Comment Submission
  elements.submitCommentBtn.addEventListener('click', () => {
    const text = elements.newCommentInput.value.trim();
    if (!text || !state.activePost) return;

    const newComment = {
      author: 'You (Author)',
      text: text,
      date: 'Just now'
    };

    if (!state.activePost.comments) state.activePost.comments = [];
    state.activePost.comments.unshift(newComment);
    elements.newCommentInput.value = '';
    renderComments(state.activePost.comments);
    showToast('Comment posted!', 'success');
  });

  // Create Post Modal Controls
  elements.openCreateBtn.addEventListener('click', () => {
    elements.createModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeCreate = () => {
    elements.createModal.classList.remove('open');
    document.body.style.overflow = '';
    elements.createPostForm.reset();
  };

  elements.closeCreateBtn.addEventListener('click', closeCreate);
  elements.cancelCreateBtn.addEventListener('click', closeCreate);
  elements.createModal.addEventListener('click', (e) => {
    if (e.target === elements.createModal) closeCreate();
  });

  // Create Post Form Submission
  elements.createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const category = document.getElementById('post-category').value;
    const tags = document.getElementById('post-tags').value.split(',').map(t => t.trim()).filter(Boolean);
    const coverImage = document.getElementById('post-cover').value.trim() || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
    const excerpt = document.getElementById('post-summary').value.trim();
    const content = document.getElementById('post-content').value.trim();

    const newPost = {
      id: Date.now(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      category,
      tags,
      coverImage,
      excerpt,
      content: `<p>${content.replace(/\n/g, '<br>')}</p>`,
      author: {
        name: 'Alibek',
        role: 'Full Stack Creator',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      },
      date: 'Just now',
      readTime: '3 min read',
      likes: 0,
      isLiked: false,
      isBookmarked: false,
      comments: []
    };

    // Prepend to posts list
    state.posts.unshift(newPost);
    localStorage.setItem('lumina_blog_posts', JSON.stringify(state.posts));
    
    closeCreate();
    renderArticles();
    showToast('✨ Story successfully published!', 'success');
  });

  // Auth Modal Controls
  elements.openAuthBtn.addEventListener('click', () => {
    elements.authModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeAuth = () => {
    elements.authModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  elements.closeAuthBtn.addEventListener('click', closeAuth);
  elements.authModal.addEventListener('click', (e) => {
    if (e.target === elements.authModal) closeAuth();
  });

  // Auth Tabs (Login vs Register)
  elements.tabLogin.addEventListener('click', () => {
    elements.tabLogin.classList.add('active');
    elements.tabRegister.classList.remove('active');
    elements.loginForm.style.display = 'flex';
    elements.registerForm.style.display = 'none';
  });

  elements.tabRegister.addEventListener('click', () => {
    elements.tabRegister.classList.add('active');
    elements.tabLogin.classList.remove('active');
    elements.registerForm.style.display = 'flex';
    elements.loginForm.style.display = 'none';
  });

  elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    closeAuth();
    showToast('Signed in successfully (Mock Mode)', 'success');
  });

  elements.registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    closeAuth();
    showToast('Account registered successfully! (Mock Mode)', 'success');
  });

  // Scroll Progress in Reader Modal
  const readerContainer = document.querySelector('.reader-modal-container');
  if (readerContainer) {
    elements.readerModal.querySelector('.glass-modal').addEventListener('scroll', (e) => {
      const target = e.currentTarget;
      const scrollTotal = target.scrollHeight - target.clientHeight;
      const percent = scrollTotal > 0 ? (target.scrollTop / scrollTotal) * 100 : 0;
      elements.readerProgressBar.style.width = `${percent}%`;
    });
  }
}

// ==========================================================================
// 9. Post Interactions (Like / Bookmark)
// ==========================================================================
function toggleLike(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  post.isLiked = !post.isLiked;
  post.likes = post.isLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 0) - 1);
  
  localStorage.setItem('lumina_blog_posts', JSON.stringify(state.posts));
  renderArticles();
  showToast(post.isLiked ? 'Added to liked posts' : 'Removed like', 'info');
}

function toggleBookmark(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  post.isBookmarked = !post.isBookmarked;
  localStorage.setItem('lumina_blog_posts', JSON.stringify(state.posts));
  renderArticles();
  showToast(post.isBookmarked ? 'Article saved to bookmarks' : 'Removed bookmark', 'info');
}

// ==========================================================================
// 10. Toast Notification Helper
// ==========================================================================
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
    </svg>
    <span>${message}</span>
  `;

  elements.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Kickoff
document.addEventListener('DOMContentLoaded', initApp);
