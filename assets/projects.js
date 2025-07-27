document.addEventListener('DOMContentLoaded', () => {
    try {
        // Fetch projects metadata
        fetch('assets/projects_index.json')
            .then(response => response.json())
            .then(projects => {
                const projectsGrid = document.getElementById('projects-grid');

                if (!projects || projects.length === 0) {
                    throw new Error('No projects found');
                }

                // Create project cards
                projects.forEach(project => {
                    const projectElement = document.createElement('div');
                    projectElement.className = 'bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300';
                    projectElement.innerHTML = `
                        ${project.live_demo ? `<img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">` : '<img src="assets/Icon-round-Question_mark.svg" alt="${project.title}" class="w-full h-48 object-cover">'}
                        <div class="p-6">
                            <h3 class="font-display text-xl mb-2">${project.title}</h3>
                            <p class="text-sm opacity-70 mb-4">${project.description}</p>
                            <div class="flex flex-wrap gap-2">
                                ${project.tags.map(tag => `<span class="px-3 py-1 bg-[var(--color-border)] text-[var(--color-text-primary)] rounded-full text-sm">${tag}</span>`).join('')}
                            </div>
                            <div class="mt-4 flex justify-between items-center">
                                ${project.live_demo ? `<a href="${project.live_demo}" target="_blank" rel="noopener noreferrer" class="text-[var(--color-accent)] hover:underline">Live Demo →</a>` : ''}
                                ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="text-[var(--color-accent)] hover:underline">GitHub →</a>` : ''}
                            </div>
                        </div>
                    `;
                    projectsGrid.appendChild(projectElement);
                });
            })
            .catch(error => {
                console.error('Error loading projects:', error);
                const projectsGrid = document.getElementById('projects-grid');
                projectsGrid.innerHTML = `
                    <div class="text-center py-12">
                        <h3 class="font-display text-xl mb-4">Error Loading Projects</h3>
                        <p class="max-w-md mx-auto opacity-80">
                            ${error.message || 'We couldn\'t load the projects at this time.'}
                        </p>
                        <a href="projects.html" class="mt-6 inline-block bg-[var(--color-accent)] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                            Back to Projects Home
                        </a>
                    </div>
                `;
            });
    } catch (error) {
        console.error('Initialization error:', error);
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = `
            <div class="text-center py-12">
                <h3 class="font-display text-xl mb-4">Error Loading Projects</h3>
                <p class="max-w-md mx-auto opacity-80">
                    ${error.message || 'An unexpected error occurred while loading the projects.'}
                </p>
                <a href="projects.html" class="mt-6 inline-block bg-[var(--color-accent)] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                    Back to Projects Home
                </a>
            </div>
        `;
    }
});
