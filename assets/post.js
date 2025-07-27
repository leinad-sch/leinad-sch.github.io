document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postName = urlParams.get('name');

    if (!postName) {
        displayError('Invalid Post');
        return;
    }

    fetch(`posts/${postName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Post not found');
            }
            return response.text();
        })
        .then(markdown => {
            try {
                const postContent = marked.parse(markdown);
                document.getElementById('post-content').innerHTML = postContent;

                // Initialize Giscus comments if available
                //if (typeof giscus !== 'undefined') {
                //    new giscus({
                //        //repo: 'your-repo-name',
                //        //repoId: 'your-repo-id',
                //        //category: 'Announcements',
                //        //categoryId: 'DIC_kwDOB4xNbs4A8X5z',
                //        //mapping: 'pathname',
                //        //reactionsEnabled: 1,
                //        //emitMetadata: 0,
                //        //inputPosition: 'top',
                //        //theme: 'dark',
                //        //lang: 'en'
                //        "data-repo": "leinad-sch/leinad-sch.github.io",
                //        "data-repo-id": "R_kgDOPS0bKg",
                //        "data-category-id": "DIC_kwDOPS0bKs4CtfkF",
                //        "data-mapping": "pathname",
                //        "data-strict": "0",
                //        "data-reactions-enabled: 1",
                //        "data-emit-metadata": "0",
                //        "data-input-position": "bottom",
                //        "data-theme": "preferred_color_scheme",
                //        "data-lang": "en",
                //        "data-loading": "lazy",
                //        "crossorigin": "anonymous",
                //        async
                //    });
                //}
            } catch (error) {
                console.error('Error parsing markdown:', error);
                displayError('Failed to render post content');
            }
        })
        .catch(error => {
            console.error('Error loading post:', error);
            displayError(`Post "${postName}" not found`);
        });
});

function displayError(message) {
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="post-card">
            <h3>${message}</h3>
            <p>Back to <a href="blog.html">Blog</a></p>
        </div>
    `;
}