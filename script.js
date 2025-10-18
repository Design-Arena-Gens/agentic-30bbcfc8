document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const dock = document.getElementById('dock');
    const clock = document.getElementById('clock');

    // Update clock
    function updateClock() {
        const now = new Date();
        const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
        clock.textContent = now.toLocaleDateString('en-US', options);
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Window Manager ---
    let zIndexCounter = 100;
    const openWindows = {};

    function createWindow(appId, appTitle, content) {
        if (openWindows[appId]) {
            bringToFront(openWindows[appId]);
            return;
        }

        const win = document.createElement('div');
        win.className = 'window';
        win.style.zIndex = zIndexCounter++;
        win.style.left = `${Math.random() * (window.innerWidth - 300)}px`;
        win.style.top = `${Math.random() * (window.innerHeight - 400)}px`;

        win.innerHTML = `
            <div class="window-header">
                <div class="traffic-lights">
                    <div class="traffic-light close"></div>
                    <div class="traffic-light minimize"></div>
                    <div class="traffic-light maximize"></div>
                </div>
                <div class="window-title">${appTitle}</div>
            </div>
            <div class="window-body">${content}</div>
        `;

        desktop.appendChild(win);
        openWindows[appId] = win;

        makeDraggable(win);

        win.querySelector('.close').addEventListener('click', () => {
            win.remove();
            delete openWindows[appId];
        });
        
        win.addEventListener('mousedown', () => bringToFront(win));

        return win;
    }
    
    function bringToFront(win) {
        win.style.zIndex = zIndexCounter++;
    }

    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = element.querySelector(".window-header");

        if (header) {
            header.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            bringToFront(element);
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // --- App Launcher ---
    const appFactories = {};

    function registerApp(appId, factory) {
        appFactories[appId] = factory;
    }

    dock.addEventListener('click', (e) => {
        const dockItem = e.target.closest('.dock-item');
        if (dockItem) {
            const appId = dockItem.dataset.app;
            if (appFactories[appId]) {
                appFactories[appId]();
            }
        }
    });
    
    window.createAppWindow = createWindow;
    window.registerApp = registerApp;
});
