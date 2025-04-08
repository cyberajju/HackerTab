/**
 * Matrix Animation for HackerTab 2025
 * Developed by CyberTechAjju
 * © 2025 All Rights Reserved
 */

(function() {
    // Matrix animation variables
    var canvas, ctx;
    var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    var matrixChars = matrix.split("");
    var fontSize = 14;
    var columns = 0;
    var drops = [];
    var matrixColor = "#00ff00";
    var animationSpeed = 50;
    var animationId = null;
    var isRunning = false;
    var opacity = 0.15; // Increased opacity for darker effect
    var dropSpeed = 0.5;
    var dropResetChance = 0.975;
    var glowEffect = true;
    var glowIntensity = 0.2; // Reduced glow intensity for darker effect
    var trailEffect = true;
    var trailLength = 8; // Increased trail length

    // Initialize the animation
    function init() {
        canvas = document.getElementById("matrixCanvas");
        if (!canvas) {
            console.error("Matrix canvas not found");
            return;
        }
        
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Get canvas context
        ctx = canvas.getContext("2d");
        
        // Initialize matrix
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (var i = 0; i < columns; i++) {
            drops[i] = {
                y: Math.floor(Math.random() * -100),
                speed: Math.random() * 0.3 + 0.2, // Reduced speed range
                chars: [] // Array to store trail characters
            };
            
            // Initialize trail characters
            for (var j = 0; j < trailLength; j++) {
                drops[i].chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
            }
        }
        
        // Add resize event listener
        window.addEventListener("resize", handleResize);
        
        // Start animation
        start();
    }
    
    // Handle window resize
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reinitialize drops
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (var i = 0; i < columns; i++) {
            drops[i] = {
                y: Math.floor(Math.random() * -100),
                speed: Math.random() * 0.3 + 0.2, // Reduced speed range
                chars: []
            };
            for (var j = 0; j < trailLength; j++) {
                drops[i].chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
            }
        }
    }
    
    // Draw frame
    function draw() {
        // Semi-transparent black background for fade effect
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text color and font
        ctx.font = fontSize + "px monospace";
        
        // Draw characters
        for (var i = 0; i < drops.length; i++) {
            // Update trail characters
            if (Math.random() > 0.95) {
                drops[i].chars[0] = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }
            
            // Draw trail characters
            for (var j = 0; j < drops[i].chars.length; j++) {
                // Calculate position
                var x = i * fontSize;
                var y = (drops[i].y - j) * fontSize;
                
                // Skip if outside canvas
                if (y < -fontSize || y > canvas.height) continue;
                
                // Calculate opacity based on position in trail
                var charOpacity = (1 - (j / trailLength)) * 0.8; // Reduced overall opacity
                
                // Draw with glow effect if enabled
                if (glowEffect) {
                    // Draw glow
                    ctx.shadowColor = matrixColor;
                    ctx.shadowBlur = 3; // Reduced glow blur
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.fillStyle = `rgba(0, 255, 0, ${charOpacity * glowIntensity})`;
                    ctx.fillText(drops[i].chars[j], x, y);
                    
                    // Draw main character
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = `rgba(0, 255, 0, ${charOpacity})`;
                    ctx.fillText(drops[i].chars[j], x, y);
                } else {
                    // Draw without glow
                    ctx.fillStyle = `rgba(0, 255, 0, ${charOpacity})`;
                    ctx.fillText(drops[i].chars[j], x, y);
                }
            }
            
            // Reset drop when it reaches bottom
            if (drops[i].y * fontSize > canvas.height && Math.random() > dropResetChance) {
                drops[i].y = 0;
                
                // Reset trail characters
                for (var j = 0; j < trailLength; j++) {
                    drops[i].chars[j] = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                }
            }
            
            // Move drop
            drops[i].y += drops[i].speed;
        }
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
        }
    }
    
    // Stop animation
    function stop() {
        if (isRunning) {
            isRunning = false;
            clearTimeout(animationId);
        }
    }
    
    // Set matrix color
    function setColor(color) {
        matrixColor = color;
    }
    
    // Set animation speed
    function setSpeed(speed) {
        animationSpeed = speed;
        if (isRunning) {
            stop();
            start();
        }
    }
    
    // Expose public methods
    window.MatrixAnimation = {
        init: init,
        setColor: setColor,
        setSpeed: setSpeed,
        start: start,
        stop: stop
    };
})();