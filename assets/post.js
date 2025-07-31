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
