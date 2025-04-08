/**
 * Binary Animation for HackerTab 2025
 * Developed by CyberTechAjju
 * © 2025 All Rights Reserved
 */

(function() {
    // Binary animation variables
    var canvas, ctx;
    var fontSize = 14;
    var columns = 0;
    var drops = [];
    var binaryColor = "#00ff00";
    var animationSpeed = 30; // milliseconds
    var animationId = null;
    var isRunning = false;
    var opacity = 0.05; // Lower value for smoother fade
    var binaryChars = ["0", "1"]; // Binary characters
    var dropSpeed = 1; // Speed of falling drops
    var dropResetChance = 0.975; // Chance to reset drop at bottom
    var glowEffect = true; // Enable glow effect
    var glowIntensity = 0.5; // Intensity of glow effect

    // Initialize the animation
    function init() {
        canvas = document.getElementById("binaryCanvas");
        if (!canvas) {
            console.error("Binary canvas not found");
            return;
        }
        
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Get canvas context
        ctx = canvas.getContext("2d");
        
        // Initialize drops
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (var i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
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
            drops[i] = Math.floor(Math.random() * -100);
        }
    }
    
    // Draw frame
    function draw() {
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = binaryColor;
        ctx.font = fontSize + "px monospace";
        
        for (var i = 0; i < drops.length; i++) {
            var char = Math.random() > 0.5 ? "1" : "0";
            
            // Apply glow effect if enabled
            if (glowEffect) {
                ctx.shadowColor = binaryColor;
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            }
            
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Reset drop after it reaches bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > dropResetChance) {
                drops[i] = 0;
            }
            
            // Increment drop position
            drops[i] += dropSpeed;
            
            // Turn off shadow for next iteration
            if (glowEffect) {
                ctx.shadowBlur = 0;
            }
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
    
    // Set binary color
    function setColor(color) {
        binaryColor = color;
    }
    
    // Set animation speed
    function setSpeed(speed) {
        animationSpeed = speed;
        if (isRunning) {
            stop();
            start();
        }
    }
    
    // Change font size
    function setFontSize(size) {
        fontSize = size;
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (var i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
        }
    }
    
    // Toggle glow effect
    function setGlowEffect(enabled) {
        glowEffect = enabled;
    }
    
    // Set glow intensity
    function setGlowIntensity(intensity) {
        glowIntensity = intensity;
    }
    
    // Set drop speed
    function setDropSpeed(speed) {
        dropSpeed = speed;
    }
    
    // Expose public methods
    window.BinaryAnimation = {
        init: init,
        setColor: setColor,
        setSpeed: setSpeed,
        setFontSize: setFontSize,
        setGlowEffect: setGlowEffect,
        setGlowIntensity: setGlowIntensity,
        setDropSpeed: setDropSpeed,
        start: start,
        stop: stop
    };
})(); 