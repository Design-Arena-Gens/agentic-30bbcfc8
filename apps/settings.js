registerApp('settings', () => {
    const content = `
        <div class="settings-body">
            <label for="wallpaper-url">Wallpaper URL:</label>
            <input type="text" id="wallpaper-url" placeholder="Enter image URL">
            <button id="apply-wallpaper">Apply</button>
        </div>
    `;
    const win = createAppWindow('settings', 'Settings', content);
    
    win.querySelector('#apply-wallpaper').addEventListener('click', () => {
        const url = win.querySelector('#wallpaper-url').value;
        if (url) {
            document.getElementById('desktop').style.backgroundImage = `url('${url}')`;
        }
    });
});
