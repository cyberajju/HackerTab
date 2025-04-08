/**
 * Hacker Terminal Animation for HackerTab 2025
 * Developed by CyberTechAjju
 * © 2025 All Rights Reserved
 */

(function() {
    // Terminal animation variables
    var canvas, ctx;
    var fontSize = 15; // Slightly larger font
    var columns = 0;
    var lines = [];
    var terminalColor = "#00ff41";
    var animationSpeed = 50;
    var animationId = null;
    var isRunning = false;
    var opacity = 0.1;
    var brightness = 1.0;
    var commands = [
        {
            cmd: "nmap -sV -sC -p- --min-rate 5000 10.10.10.123",
            output: [
                "Starting Nmap 7.94 ( https://nmap.org )",
                "PORT      STATE  SERVICE       VERSION",
                "22/tcp    open   ssh           OpenSSH 8.2p1",
                "80/tcp    open   http          Apache/2.4.41",
                "443/tcp   open   https         nginx 1.18.0",
                "3306/tcp  open   mysql         MySQL 8.0.28"
            ]
        },
        {
            cmd: "gobuster dir -u http://10.10.10.123 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 50",
            output: [
                "===============================================================",
                "/admin                (Status: 301) [Size: 312]",
                "/images               (Status: 301) [Size: 313]",
                "/login                (Status: 200) [Size: 1250]",
                "/api                  (Status: 301) [Size: 310]",
                "/backup               (Status: 301) [Size: 312]"
            ]
        },
        {
            cmd: "sqlmap -u 'http://10.10.10.123/login.php' --forms --batch --dbs --level 5 --risk 3",
            output: [
                "[*] starting @ 13:37:42",
                "[13:37:43] [INFO] testing for SQL injection on POST parameter 'username'",
                "[13:37:44] [INFO] found DB: 'information_schema'",
                "[13:37:45] [INFO] found DB: 'mysql'",
                "[13:37:46] [INFO] found DB: 'webapp_db'",
                "[13:37:47] [INFO] found table: 'users'"
            ]
        },
        {
            cmd: "hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://10.10.10.123 -t 4",
            output: [
                "Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak",
                "[DATA] max 4 tasks per 1 server, overall 4 tasks, 14344399 login tries",
                "[22][ssh] host: 10.10.10.123   login: admin   password: superman123",
                "[STATUS] attack finished for 10.10.10.123 (valid pair found)"
            ]
        },
        {
            cmd: "msfconsole -q",
            output: [
                "msf6 > use exploit/multi/http/apache_struts2_content_type_ognl",
                "msf6 exploit(multi/http/apache_struts2_content_type_ognl) > set RHOSTS 10.10.10.123",
                "RHOSTS => 10.10.10.123",
                "msf6 exploit(multi/http/apache_struts2_content_type_ognl) > set LHOST tun0",
                "LHOST => tun0",
                "msf6 exploit(multi/http/apache_struts2_content_type_ognl) > exploit",
                "[*] Started reverse TCP handler on 10.10.14.23:4444",
                "[*] Sending stage (3020772 bytes) to 10.10.10.123",
                "[*] Meterpreter session 1 opened"
            ]
        },
        {
            cmd: "hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt --force",
            output: [
                "hashcat (v6.2.6) starting...",
                "OpenCL API (OpenCL 3.0 PoCL 3.1+debian) - Platform #1 [The pocl project]",
                "Hashes: 1 digests; 1 unique digests, 1 unique salts",
                "5d41402abc4b2a76b9719d911017c592:hello",
                "Session completed."
            ]
        },
        {
            cmd: "john --format=md5 hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt",
            output: [
                "Using default input encoding: UTF-8",
                "Loaded 1 password hash (md5, md5($pass.$salt) [MD5 128/128 SSE2 4x3])",
                "Press 'q' or Ctrl-C to abort, almost any other key for status",
                "superman123      (admin)",
                "1g 0:00:00:01 DONE (2023-03-15 13:38) 0.5000g/s 5000p/s 5000c/s 5000C/s superman123"
            ]
        },
        {
            cmd: "wfuzz -c -z file,/usr/share/wordlists/dirb/common.txt --hc 404 http://10.10.10.123/FUZZ",
            output: [
                "********************************************************",
                "* Wfuzz 3.1.0 - The Web Fuzzer                         *",
                "********************************************************",
                "Target: http://10.10.10.123/FUZZ",
                "Total requests: 4614",
                "==================================================================",
                "ID         Response   Lines    Word     Chars       Payload",
                "==================================================================",
                "000000001:   200        12 L     127 W    1894 Ch   \"admin\"",
                "000000002:   200        12 L     127 W    1894 Ch   \"login\"",
                "000000003:   301         9 L     28 W     321 Ch    \"images\""
            ]
        },
        {
            cmd: "searchsploit apache 2.4",
            output: [
                "-----------------------------------------------------------------------",
                " Exploit Title                                    |  Path",
                "-----------------------------------------------------------------------",
                "Apache 2.4.x mod_proxy_fcgi - Remote Code Execut | linux/remote/50488.py",
                "Apache 2.4.49/2.4.50 - Path Traversal & RCE      | multiple/remote/50098.py",
                "Apache 2.4.49 - Path Traversal & RCE             | multiple/remote/50076.py"
            ]
        },
        {
            cmd: "volatility -f memory.dump imageinfo",
            output: [
                "Volatility Foundation Volatility Framework 2.6.1",
                "INFO    : volatility.debug    : Determining profile based on KDBG search...",
                "          Suggested Profile(s) : Win7SP1x64, Win7x64 (Instantiated with Win7SP1x64)",
                "                     AS Layer1 : WindowsAMD64PagedMemory (Kernel AS)",
                "                     AS Layer2 : FileAddressSpace (/root/memory.dump)",
                "                      PAE type : No PAE",
                "                           DTB : 0x187000L",
                "                          KDBG : 0xf80002803070L"
            ]
        }
    ];
    var currentCommand = "";
    var commandIndex = 0;
    var charIndex = 0;
    var typingSpeed = 80; // Base typing speed
    var typingSpeedVariation = 40; // Variation in typing speed
    var typingPauseChance = 0.05; // Chance of pausing between characters
    var typingPauseDuration = 200; // Duration of typing pause in ms
    var commandPauseDuration = 800; // Pause after command before showing output
    var outputLineDelay = 100; // Delay between output lines
    var nextCommandDelay = 2000; // Delay before starting next command
    var blinkSpeed = 500;
    var cursorVisible = true;
    var maxLines = 20; // Increased max lines
    var lineSpacing = 24; // Increased line spacing
    var terminalWidth = 800; // Slightly reduced width
    var terminalHeight = 500; // Slightly reduced height
    var terminalX = 0;
    var terminalY = 0;
    var promptText = "root@kali:~# ";
    var fadeSpeed = 0.05;
    var textOpacity = 0;
    var margin = 50; // Margin from screen edges

    // Initialize the animation
    function init() {
        canvas = document.getElementById("terminalCanvas");
        if (!canvas) {
            console.error("Terminal canvas not found");
            return;
        }
        
        // Set canvas to full window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        ctx = canvas.getContext("2d");
        
        // Calculate perfect center position
        terminalX = Math.max(margin, (canvas.width - terminalWidth) / 2);
        terminalY = Math.max(margin, (canvas.height - terminalHeight) / 2);
        
        // Initialize lines array
        lines = [];
        
        // Add resize event listener
        window.addEventListener("resize", handleResize);
        
        // Start animation
        start();
    }
    
    // Handle window resize
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate center position
        terminalX = Math.max(margin, (canvas.width - terminalWidth) / 2);
        terminalY = Math.max(margin, (canvas.height - terminalHeight) / 2);
    }
    
    // Draw frame
    function draw() {
        // Clear entire canvas with smooth fade
        ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw terminal background with slight transparency
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.fillRect(terminalX, terminalY, terminalWidth, terminalHeight);
        
        // Set text properties with smoother font
        ctx.font = `${fontSize}px 'Source Code Pro', 'Fira Code', monospace`;
        ctx.textBaseline = 'top';
        
        // Draw lines with smooth fade-in
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var y = terminalY + 20 + (i * lineSpacing);
            
            // Skip if line is outside terminal
            if (y > terminalY + terminalHeight - lineSpacing) continue;
            
            // Draw text with smooth glow effect
            ctx.shadowColor = terminalColor;
            ctx.shadowBlur = 3;
            ctx.fillStyle = terminalColor;
            
            var text = line.isCommand ? promptText + line.text : line.text;
            ctx.fillText(text, terminalX + 20, y);
        }
        
        // Draw cursor with smooth blink
        if (cursorVisible && currentCommand !== null) {
            var cursorX = terminalX + 20 + (promptText.length + currentCommand.length) * (fontSize * 0.6);
            var cursorY = terminalY + 20 + (lines.length * lineSpacing);
            
            if (cursorY <= terminalY + terminalHeight - lineSpacing) {
                ctx.fillStyle = terminalColor;
                ctx.fillRect(cursorX, cursorY, fontSize * 0.6, fontSize);
            }
        }
        
        // Reset shadow
        ctx.shadowBlur = 0;
    }
    
    // Apply brightness to color
    function applyBrightness(color, brightness) {
        // Convert hex to RGB
        var r = parseInt(color.substr(1,2), 16);
        var g = parseInt(color.substr(3,2), 16);
        var b = parseInt(color.substr(5,2), 16);
        
        // Apply brightness
        r = Math.floor(r * brightness);
        g = Math.floor(g * brightness);
        b = Math.floor(b * brightness);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Type next character with command output handling
    function typeNextChar() {
        if (!currentCommand) {
            currentCommand = commands[commandIndex].cmd;
            lines.push({ text: "", isCommand: true });
        }

        if (charIndex < currentCommand.length) {
            // Add character to current line
            lines[lines.length - 1].text = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            
            // Calculate next typing delay with variation
            var nextDelay = typingSpeed + (Math.random() * typingSpeedVariation);
            
            // Occasionally add a pause to simulate thinking
            if (Math.random() < typingPauseChance) {
                nextDelay += typingPauseDuration;
            }
            
            // Schedule next character
            setTimeout(typeNextChar, nextDelay);
        } else {
            // Command finished typing, pause before showing output
            setTimeout(() => {
                // Add output lines with delay between each line
                var output = commands[commandIndex].output;
                var outputIndex = 0;
                
                function addOutputLine() {
                    if (outputIndex < output.length) {
                        lines.push({ text: output[outputIndex], isCommand: false });
                        outputIndex++;
                        
                        // Remove old lines if exceeding terminal height
                        while (lines.length * lineSpacing > terminalHeight - 30) {
                            lines.shift();
                        }
                        
                        // Schedule next output line
                        setTimeout(addOutputLine, outputLineDelay);
                    } else {
                        // All output lines added, wait before next command
                        setTimeout(() => {
                            commandIndex = (commandIndex + 1) % commands.length;
                            currentCommand = "";
                            charIndex = 0;
                            typeNextChar();
                        }, nextCommandDelay);
                    }
                }
                
                // Start adding output lines
                addOutputLine();
            }, commandPauseDuration);
        }
    }
    
    // Toggle cursor
    function toggleCursor() {
        cursorVisible = !cursorVisible;
    }
    
    // Animation loop
    function animate() {
        draw();
        if (isRunning) {
            animationId = setTimeout(animate, animationSpeed);
        }
    }
    
    // Start animation
    function start() {
        if (!isRunning) {
            isRunning = true;
            animate();
            typeNextChar();
            setInterval(toggleCursor, blinkSpeed);
        }
    }
    
    // Stop animation
    function stop() {
        if (isRunning) {
            isRunning = false;
            clearTimeout(animationId);
        }
    }
    
    // Set terminal color
    function setColor(color) {
        terminalColor = color;
    }
    
    // Set animation speed
    function setSpeed(speed) {
        animationSpeed = speed;
        if (isRunning) {
            stop();
            start();
        }
    }
    
    // Set font size
    function setFontSize(size) {
        fontSize = size;
    }
    
    // Set opacity
    function setOpacity(value) {
        opacity = value;
    }
    
    // Set brightness
    function setBrightness(value) {
        brightness = value;
    }
    
    // Expose public methods
    window.TerminalAnimation = {
        init: init,
        setColor: setColor,
        setSpeed: setSpeed,
        setFontSize: setFontSize,
        setOpacity: setOpacity,
        setBrightness: setBrightness,
        start: start,
        stop: stop
    };
})(); 