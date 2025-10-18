registerApp('terminal', () => {
    const content = `
        <div class="terminal-body">
            <div class="terminal-output">Welcome to WebTerm!</div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">$></span>
                <input type="text" class="terminal-input" autofocus>
            </div>
        </div>
    `;
    const win = createAppWindow('terminal', 'Terminal', content);
    const output = win.querySelector('.terminal-output');
    const input = win.querySelector('.terminal-input');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value;
            output.innerHTML += `\n$> ${command}`;
            handleCommand(command);
            input.value = '';
            win.querySelector('.terminal-body').scrollTop = win.querySelector('.terminal-body').scrollHeight;
        }
    });

    function handleCommand(command) {
        const [cmd, ...args] = command.split(' ');
        switch (cmd) {
            case 'echo':
                output.innerHTML += `\n${args.join(' ')}`;
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            case 'help':
                output.innerHTML += '\nAvailable commands: echo, clear, help, date';
                break;
            case 'date':
                output.innerHTML += `\n${new Date()}`;
                break;
            default:
                output.innerHTML += `\n-bash: ${command}: command not found`;
        }
    }
});
