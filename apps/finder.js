registerApp('finder', () => {
    const fs = {
        'Desktop': {},
        'Documents': {
            'resume.txt': 'This is my resume.',
            'project-ideas.txt': 'A web-based OS!'
        },
        'Pictures': {},
        'Music': {}
    };

    let currentPath = '/';
    let currentDir = fs;

    const content = `
        <div class="finder-body">
            <div class="finder-sidebar">
                <ul>
                    <li>Desktop</li>
                    <li>Documents</li>
                    <li>Pictures</li>
                    <li>Music</li>
                </ul>
            </div>
            <div class="finder-main"></div>
        </div>
    `;

    const win = createAppWindow('finder', 'Finder', content);
    const mainView = win.querySelector('.finder-main');

    function renderFiles() {
        mainView.innerHTML = '';
        for (const item in currentDir) {
            const isDir = typeof currentDir[item] === 'object';
            const icon = isDir ? 'folder.png' : 'file.png';
            const fileIcon = document.createElement('div');
            fileIcon.className = 'file-icon';
            fileIcon.innerHTML = `
                <img src="assets/icons/${icon}" alt="${item}">
                <span>${item}</span>
            `;
            mainView.appendChild(fileIcon);
        }
    }

    renderFiles();
});
