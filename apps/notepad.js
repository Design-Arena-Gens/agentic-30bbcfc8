registerApp('notepad', () => {
    const content = `
        <div class="notepad-body">
            <textarea></textarea>
        </div>
    `;
    createAppWindow('notepad', 'Notepad', content);
});
