document.addEventListener('DOMContentLoaded', () => {
    try {
        // Fetch blog post metadata
        fetch('assets/blog_index.json')
            .then(response => response.json())
            .then(posts => {
                const postList = document.getElementById('post-list');

                if (!posts || posts.length === 0) {
                    throw new Error('No blog posts found');
                }

                // Sort posts by created_at date (newest first)
                posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                // Create post elements
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'blog-post';
                    postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p class="mb-4">${post.summary}</p>
                        <a href="post.html?name=${post.filename}" class="text-[var(--color-accent)] hover:underline">Read More →</a>
                        <div class="date mt-2 opacity-70">${new Date(post.created_at).toLocaleDateString()}</div>
                    `;
                    postList.appendChild(postElement);
                });
            })
            .catch(error => {
                console.error('Error loading blog posts:', error);
                const postList = document.getElementById('post-list');
                postList.innerHTML = `
                    <div class="text-center py-12">
                        <h3 class="font-display text-xl mb-4">Error Loading Blog Posts</h3>
                        <p class="max-w-md mx-auto opacity-80">
                            ${error.message || 'We couldn\'t load the blog posts at this time.'}
                        </p>
                        <a href="blog.html" class="mt-6 inline-block bg-[var(--color-accent)] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                            Back to Blog Home
                        </a>
                    </div>
                `;
            });
    } catch (error) {
        console.error('Initialization error:', error);
        const postList = document.getElementById('post-list');
        postList.innerHTML = `
            <div class="text-center py-12">
                <h3 class="font-display text-xl mb-4">Error Loading Blog</h3>
                <p class="max-w-md mx-auto opacity-80">
                    ${error.message || 'An unexpected error occurred while loading the blog.'}
                </p>
                <a href="blog.html" class="mt-6 inline-block bg-[var(--color-accent)] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                    Back to Blog Home
                </a>
            </div>
        `;
    }
});