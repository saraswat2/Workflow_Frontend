// High-quality dummy article data for WriteFlow Blog Platform

export const dummyArticles = [
  {
    id: "1",
    title: "Architecting Scalable Microservices with Spring Boot",
    tag: "Backend",
    category: "Engineering",
    excerpt:
      "Learn how to build resilient, fault-tolerant systems using Spring Boot and distributed architectural patterns designed for global scale.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    authorName: "Azunyan U. Wu",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80",
    readTime: "8 min read",
    date: "Apr 6, 2026",
    content: `
      <h2>The Rise of Microservices</h2>
      <p>In the modern software landscape, monolithic applications are increasingly giving way to microservices architectures. Spring Boot has emerged as the de facto standard for building these services on the JVM, offering an opinionated, production-ready platform that dramatically reduces boilerplate.</p>

      <h2>Service Decomposition Strategy</h2>
      <p>The most challenging aspect of microservices isn't the technology — it's identifying the right boundaries. Domain-Driven Design (DDD) provides the conceptual framework we need. Each microservice should own a bounded context: a well-defined piece of business domain with its own data model and logic.</p>
      <p>Consider an e-commerce platform. Instead of one giant service, you'd have an <strong>Order Service</strong>, a <strong>Payment Service</strong>, a <strong>Inventory Service</strong>, and a <strong>Notification Service</strong>. Each team owns their service end-to-end.</p>

      <h2>Communication Patterns</h2>
      <p>Services need to talk to each other. You have two primary options:</p>
      <ul>
        <li><strong>Synchronous (REST/gRPC)</strong>: Direct HTTP calls. Simple but creates tight coupling and cascading failures.</li>
        <li><strong>Asynchronous (Kafka/RabbitMQ)</strong>: Event-driven messaging. More resilient but adds infrastrture complexity.</li>
      </ul>
      <p>For most scenarios, a hybrid approach works best: use synchronous calls for real-time queries and async messaging for state changes.</p>

      <h2>Resilience with Circuit Breakers</h2>
      <p>When Service A calls Service B, what happens when B is slow or down? Without circuit breakers, you get thread exhaustion and cascading failures. Using Resilience4j with Spring Boot, you can implement the Circuit Breaker, Retry, and Bulkhead patterns with just a few annotations:</p>
      <pre><code>@CircuitBreaker(name = "inventoryService", fallbackMethod = "fallbackInventory")
@Retry(name = "inventoryService")
public InventoryResponse checkInventory(String skuCode) {
    return restTemplate.getForObject(inventoryServiceUrl, InventoryResponse.class);
}</code></pre>

      <h2>Distributed Tracing</h2>
      <p>Debugging a distributed system without tracing is like debugging in the dark. OpenTelemetry + Zipkin gives you end-to-end visibility of a request as it flows through multiple services. Spring Boot's Micrometer Tracing integration makes this nearly zero-config.</p>

      <h2>Conclusion</h2>
      <p>Microservices offer incredible scalability and team autonomy, but they come with significant operational overhead. Start with a well-designed monolith, identify the seams, and extract services progressively. Spring Boot's ecosystem makes each step of this journey tractable.</p>
    `,
  },
  {
    id: "2",
    title: "The Future of AI-Driven Cybersecurity in 2026",
    tag: "Security",
    category: "AI & Security",
    excerpt:
      "Exploring how machine learning models are revolutionizing threat detection, zero-trust design, and OWASP security hardening in real-world production systems.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    authorName: "Veronica D. White",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80",
    readTime: "12 min read",
    date: "Apr 5, 2026",
    content: `
      <h2>The New Threat Landscape</h2>
      <p>Cyber threats in 2026 are faster, more sophisticated, and increasingly automated. Traditional signature-based defenses struggle to keep pace. The industry's answer? Turn AI against itself — use machine learning to detect and neutralize threats in real time.</p>

      <h2>Anomaly Detection with ML</h2>
      <p>Modern Security Information and Event Management (SIEM) systems now incorporate ML models trained on billions of events. These models build a baseline of "normal" behavior for every user and system, then flag deviations. An employee suddenly downloading 50GB at 3 AM? The model flags it; the SOC investigates.</p>

      <h2>Zero-Trust Architecture</h2>
      <p>The perimeter defense model is dead. Zero-Trust operates on a simple principle: <em>never trust, always verify</em>. Every request — whether from inside or outside the network — must be authenticated, authorized, and continuously validated.</p>
      <p>Key pillars: <strong>Identity verification</strong> (MFA + adaptive auth), <strong>Least privilege access</strong> (RBAC + ABAC), and <strong>Micro-segmentation</strong> (East-West traffic controls).</p>

      <h2>LLMs as Security Co-pilots</h2>
      <p>Large Language Models are being deployed as security co-pilots that can analyze CVE reports, scan code for vulnerabilities, and even generate remediation patches. Tools like GitHub Copilot for Security can now flag insecure coding patterns with contextual, actionable suggestions.</p>

      <h2>The OWASP Top 10 in the Age of AI</h2>
      <p>The classic OWASP Top 10 isn't going away, but AI introduces new attack vectors: prompt injection, training data poisoning, and model extraction attacks. The OWASP LLM Top 10 is now essential reading for anyone building AI-powered applications.</p>

      <h2>Conclusion</h2>
      <p>The cyber arms race has entered a new phase. Defenders who embrace AI-driven tooling, zero-trust principles, and continuous threat modeling will have a significant advantage. The question isn't whether to adopt AI for security — it's how fast you can do it.</p>
    `,
  },
  {
    id: "3",
    title: "Modern Glassmorphism: Aesthetic vs. Accessibility",
    tag: "UI/UX Design",
    category: "Design",
    excerpt:
      "A deep dive into balancing the stunning translucent glassmorphism aesthetic with WCAG accessibility standards — and how to achieve both without compromise.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    authorName: "Jesse Pinkman",
    authorAvatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&h=80",
    readTime: "10 min read",
    date: "Apr 4, 2026",
    content: `
      <h2>What is Glassmorphism?</h2>
      <p>Glassmorphism is a design trend characterized by frosted glass-like UI elements: semi-transparent backgrounds, subtle borders, and significant backdrop blur. It creates a rich sense of depth and layering that feels premium and modern.</p>

      <h2>The CSS Behind the Magic</h2>
      <p>The core recipe is surprisingly simple:</p>
      <pre><code>.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
}</code></pre>
      <p>The <code>backdrop-filter</code> property is the key ingredient — it applies the blur effect to whatever is rendered behind the element.</p>

      <h2>The Accessibility Problem</h2>
      <p>Here's where things get tricky. WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Semi-transparent backgrounds make this nearly impossible to guarantee because the effective contrast changes based on the background content behind the element.</p>

      <h2>The Solutions</h2>
      <p>The answer isn't to abandon glassmorphism — it's to apply it surgically:</p>
      <ul>
        <li><strong>Use glass for containers, not text</strong>: Apply glass effects to cards and panels, but ensure text sits on a solid (or near-solid) background within those containers.</li>
        <li><strong>Test against your actual gradient</strong>: Don't just check static contrast — test against the actual animated background your users will see.</li>
        <li><strong>Increase opacity for critical text areas</strong>: A 90% opaque background section within a glass card provides both the aesthetic feel and the necessary contrast.</li>
        <li><strong>Respect prefers-reduced-transparency</strong>: Use this media query to provide a solid fallback for users who prefer reduced transparency.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Glassmorphism and accessibility are not mutually exclusive. With intentional design decisions, you can create interfaces that are both breathtaking and usable for everyone.</p>
    `,
  },
  {
    id: "4",
    title: "React 19 Deep Dive: Server Components & the New Hooks",
    tag: "Frontend",
    category: "Engineering",
    excerpt:
      "React 19 is a paradigm shift. Server Components, improved Suspense, and the new use() hook fundamentally change how we think about data fetching and rendering.",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1200&auto=format&fit=crop",
    authorName: "Kira Yamamoto",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80",
    readTime: "15 min read",
    date: "Apr 3, 2026",
    content: `
      <h2>The Server Component Revolution</h2>
      <p>React Server Components (RSC) allow components to run exclusively on the server, fetching data directly from databases or APIs without ever sending that logic to the client. This is a fundamental shift in the React mental model — the component tree now spans server and client boundaries.</p>

      <h2>The use() Hook</h2>
      <p>The new <code>use()</code> hook is a powerful primitive for reading the value of a resource — like a Promise or Context — inside a component. Unlike <code>useEffect</code>, <code>use()</code> can be called conditionally and integrates seamlessly with Suspense:</p>
      <pre><code>function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends until the promise resolves
  return &lt;h1&gt;{user.name}&lt;/h1&gt;;
}</code></pre>

      <h2>Automatic Batching & Transitions</h2>
      <p>React 19 extends automatic batching to all asynchronous operations. Combined with <code>startTransition</code>, you can now mark expensive state updates as non-urgent, keeping the UI responsive even during heavy computations.</p>

      <h2>Actions & Form Integration</h2>
      <p>React 19 introduces Actions — async functions that can be passed directly to form elements. This replaces the common pattern of <code>onSubmit</code> handlers and manual loading state management with a clean, declarative API supported by new hooks like <code>useFormStatus</code> and <code>useOptimistic</code>.</p>

      <h2>Conclusion</h2>
      <p>React 19 isn't just an incremental update — it's a re-imagining of full-stack React development. The boundaries between server and client, data fetching and rendering, are becoming beautifully blurred.</p>
    `,
  },
  {
    id: "5",
    title: "PostgreSQL Performance Tuning: From Slow to Sub-Millisecond",
    tag: "Database",
    category: "Engineering",
    excerpt:
      "A hands-on guide to diagnosing and resolving PostgreSQL performance bottlenecks using EXPLAIN ANALYZE, index strategies, and connection pooling.",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop",
    authorName: "Marcus Chen",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80",
    readTime: "11 min read",
    date: "Apr 2, 2026",
    content: `
      <h2>Diagnosing with EXPLAIN ANALYZE</h2>
      <p>Before you can fix a slow query, you need to understand why it's slow. <code>EXPLAIN ANALYZE</code> is your X-ray machine. It shows the query plan PostgreSQL chose and, critically, the actual execution times and row counts at each step.</p>
      <p>Red flags to look for: <strong>Seq Scans</strong> on large tables, <strong>high cost estimates vs. actual rows</strong> (indicating stale statistics), and <strong>Hash Joins</strong> where Nested Loop Joins would be more appropriate.</p>

      <h2>Indexing Strategies</h2>
      <p>Indexes are the biggest lever for query performance. Key strategies:</p>
      <ul>
        <li><strong>Composite indexes</strong>: Column order matters enormously. Put equality columns first, range columns last.</li>
        <li><strong>Partial indexes</strong>: Index only the rows you actually query, e.g., <code>WHERE status = 'active'</code>.</li>
        <li><strong>Expression indexes</strong>: Index the result of a function, e.g., <code>lower(email)</code> for case-insensitive searches.</li>
        <li><strong>BRIN indexes</strong>: For naturally ordered data (like timestamps), BRIN indexes offer excellent performance at a tiny fraction of the storage cost of B-Tree.</li>
      </ul>

      <h2>Connection Pooling with PgBouncer</h2>
      <p>PostgreSQL processes are expensive — each connection consumes ~5MB of RAM and requires process fork overhead. Under high concurrency, without pooling, the overhead becomes crippling. PgBouncer sits in front of your database and maintains a pool of persistent connections, drastically reducing this cost.</p>

      <h2>Vacuuming and Bloat</h2>
      <p>PostgreSQL's MVCC model means old row versions stick around until VACUUM cleans them up. Table bloat leads to larger-than-necessary sequential scans and wasted I/O. Tune <code>autovacuum</code> aggressively for high-write tables and monitor bloat via <code>pg_stat_user_tables</code>.</p>

      <h2>Conclusion</h2>
      <p>PostgreSQL performance tuning is a craft. The tools are powerful but require systematic diagnosis. Measure first, optimize second, and always verify improvements with real query plans — not assumptions.</p>
    `,
  },
  {
    id: "6",
    title: "Docker & Kubernetes: A Production Deployment Playbook",
    tag: "DevOps",
    category: "Infrastructure",
    excerpt:
      "From Dockerfile best practices to Kubernetes rolling updates, this playbook covers everything you need for zero-downtime production deployments.",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1200&auto=format&fit=crop",
    authorName: "Elena Vasquez",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80",
    readTime: "14 min read",
    date: "Apr 1, 2026",
    content: `
      <h2>Writing Production-Grade Dockerfiles</h2>
      <p>Most developers write Dockerfiles that work. Fewer write Dockerfiles that are secure, minimal, and fast to build. Key principles: use <strong>multi-stage builds</strong> to separate build dependencies from the runtime image, use a <strong>non-root user</strong>, and always pin your base image versions.</p>
      <pre><code>FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS runtime
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "server.js"]</code></pre>

      <h2>Kubernetes Deployment Strategies</h2>
      <p>Kubernetes supports multiple rollout strategies. <strong>RollingUpdate</strong> (the default) gradually replaces old pods with new ones, maintaining availability. <strong>Blue-Green</strong> deployments maintain two identical environments, switching traffic instantly. <strong>Canary</strong> deployments route a small percentage of traffic to the new version for validation before full rollout.</p>

      <h2>Health Probes</h2>
      <p>Readiness probes tell Kubernetes when a pod is ready to serve traffic. Liveness probes detect when a pod has entered a broken state and needs to be restarted. Configure both precisely — overly aggressive probes cause unnecessary restarts; too lenient probes mean traffic hitting broken pods.</p>

      <h2>Secrets Management</h2>
      <p>Never bake secrets into your Docker images or Kubernetes YAML files. Use Kubernetes Secrets (encrypted at rest with KMS) or a dedicated secrets manager like HashiCorp Vault. Mount secrets as environment variables or files at runtime.</p>

      <h2>Conclusion</h2>
      <p>A production-grade container deployment stack is built on discipline: minimal images, principled rollout strategies, and robust health monitoring. The investment in getting this right pays dividends in reliability and developer confidence.</p>
    `,
  },
  {
    id: "7",
    title: "The Art of Technical Writing for Engineers",
    tag: "Career",
    category: "Productivity",
    excerpt:
      "Clear technical writing is a superpower. Learn how to create documentation, design docs, and blog posts that engineers actually want to read.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
    authorName: "Priya Sharma",
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80",
    readTime: "7 min read",
    date: "Mar 31, 2026",
    content: `
      <h2>Why Engineers Need to Write Well</h2>
      <p>Code is read far more often than it's written. The same is true of technical documentation. Your architecture decision record, API documentation, or internal design proposal will be read by dozens of engineers over years. Clarity here is a force multiplier.</p>

      <h2>The Pyramid Principle</h2>
      <p>Borrowed from consulting, the Pyramid Principle says: lead with your conclusion. Don't bury the key message at the end after paragraphs of context. State your recommendation first, then provide supporting arguments. Busy engineers will thank you.</p>

      <h2>Writing for Your Audience</h2>
      <p>The most common mistake: writing for yourself instead of your reader. A junior engineer needs more context than a Staff Engineer. A product manager needs impact without implementation details. Always ask: "Who is reading this, and what do they need to walk away knowing?"</p>

      <h2>The Power of Examples</h2>
      <p>Abstract concepts become concrete with good examples. When explaining a complex concept, show a before/after code snippet, a real use case, or a counterexample. The "for example" and "consider this scenario" transitions are the most powerful tools in your technical writing arsenal.</p>

      <h2>Conclusion</h2>
      <p>Technical writing is a skill — it can be learned and improved with deliberate practice. Write regularly, solicit feedback ruthlessly, and read great technical writing. Your future colleagues (and your future self) will be grateful.</p>
    `,
  },
  {
    id: "8",
    title: "Mastering FastAPI: Building Production-Ready APIs",
    tag: "Backend",
    category: "Engineering",
    excerpt:
      "FastAPI is more than a fast framework — it's a complete ecosystem for building type-safe, self-documented, high-performance APIs with Python.",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop",
    authorName: "Daniel Okafor",
    authorAvatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=80&h=80",
    readTime: "13 min read",
    date: "Mar 30, 2026",
    content: `
      <h2>Why FastAPI is Different</h2>
      <p>FastAPI isn't just another Python web framework. It's built on Pydantic and Starlette, giving it three standout properties: automatic OpenAPI documentation, full type safety enforced at runtime, and native async/await support. Together, these make it the ideal choice for high-performance, developer-friendly APIs.</p>

      <h2>Dependency Injection Done Right</h2>
      <p>FastAPI's dependency injection system is elegant and powerful. It handles database sessions, authentication, caching, and more — all composable, testable, and declared directly in your function signatures:</p>
      <pre><code>@app.get("/users/me")
async def get_current_user(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> UserResponse:
    return await user_service.get_profile(db, user.id)</code></pre>

      <h2>Background Tasks and Async</h2>
      <p>For long-running operations like sending emails or processing files, FastAPI's <code>BackgroundTasks</code> lets you kick off work after returning a response. For true async operations, integrate Celery or ARQ for distributed task queues backed by Redis.</p>

      <h2>Testing Strategy</h2>
      <p>FastAPI's TestClient wraps httpx, giving you a synchronous or async test interface. Combine this with pytest fixtures for database setup/teardown and you have a complete, fast test suite. The key: test your endpoints through the HTTP layer, not by calling internal functions directly.</p>

      <h2>Conclusion</h2>
      <p>FastAPI has matured into a production powerhouse. Its combination of performance, type safety, and developer ergonomics makes it the right choice for greenfield APIs and a compelling migration target for legacy Flask and Django REST Framework applications.</p>
    `,
  },
];

export const getArticleById = (id) =>
  dummyArticles.find((article) => article.id === String(id));

export const categories = [
  "All",
  "Engineering",
  "Design",
  "AI & Security",
  "Infrastructure",
  "Productivity",
];
