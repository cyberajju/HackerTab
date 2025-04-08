/**
 * Glitch Effect Animation for HackerTab 2025
 * Developed by CyberTechAjju
 * © 2025 All Rights Reserved
 */

(function() {
    // Glitch animation variables
    var canvas, ctx;
    var glitchColor = "#00ff00";
    var animationSpeed = 50; // milliseconds
    var animationId = null;
    var isRunning = false;
    var opacity = 0.1; // Low opacity for transparency
    var brightness = 0.7; // Low brightness
    var glitchIntensity = 0.5; // 0 to 1
    var glitchFrequency = 0.1; // 0 to 1
    var glitchDuration = 100; // milliseconds
    var lastGlitch = 0;
    var glitchActive = false;
    var glitchOffset = 0;
    var glitchChannels = {
        red: 0,
        green: 0,
        blue: 0
    };
    var imageData = null;
    var glitchText = "HACKERTAB 2025";
    var fontSize = 48;
    var textGlitch = false;
    var textGlitchOffset = 0;
    var textGlitchDuration = 50; // milliseconds
    var lastTextGlitch = 0;

    // Initialize the animation
    function init() {
        canvas = document.getElementById("glitchCanvas");
        if (!canvas) {
            console.error("Canvas not found");
            return;
        }
        
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Get canvas context
        ctx = canvas.getContext("2d");
        
        // Set initial style
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Start animation
        startAnimation();
        
        // Add resize event listener
        window.addEventListener("resize", handleResize);
    }
    
    // Handle window resize
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Draw glitch effect
    function draw() {
        // Clear canvas with semi-transparent black
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Apply glitch effect
        if (Math.random() < glitchFrequency && !glitchActive) {
            startGlitch();
        }
        
        if (glitchActive) {
            applyGlitchEffect();
        }
        
        // Draw text with glitch
        drawGlitchText();
    }
    
    // Start glitch effect
    function startGlitch() {
        glitchActive = true;
        lastGlitch = Date.now();
        
        // Random glitch offset
        glitchOffset = (Math.random() - 0.5) * 20 * glitchIntensity;
        
        // Random channel offsets
        glitchChannels.red = (Math.random() - 0.5) * 10 * glitchIntensity;
        glitchChannels.green = (Math.random() - 0.5) * 10 * glitchIntensity;
        glitchChannels.blue = (Math.random() - 0.5) * 10 * glitchIntensity;
        
        // Store current canvas state
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
    
    // Apply glitch effect
    function applyGlitchEffect() {
        if (Date.now() - lastGlitch > glitchDuration) {
            glitchActive = false;
            if (imageData) {
                ctx.putImageData(imageData, 0, 0);
            }
            return;
        }
        
        // Apply RGB channel shift
        var currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = currentImageData.data;
        
        for (var i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, Math.max(0, data[i] + glitchChannels.red));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + glitchChannels.green));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + glitchChannels.blue));
        }
        
        ctx.putImageData(currentImageData, glitchOffset, 0);
    }
    
    // Draw glitch text
    function drawGlitchText() {
        // Apply text glitch
        if (Math.random() < 0.1 && !textGlitch) {
            textGlitch = true;
            lastTextGlitch = Date.now();
            textGlitchOffset = (Math.random() - 0.5) * 10;
        }
        
        if (textGlitch) {
            if (Date.now() - lastTextGlitch > textGlitchDuration) {
                textGlitch = false;
                textGlitchOffset = 0;
            }
        }
        
        // Draw text with color and brightness
        var color = applyBrightness(glitchColor, brightness);
        ctx.fillStyle = color;
        
        // Draw main text
        ctx.fillText(glitchText, canvas.width / 2 + textGlitchOffset, canvas.height / 2);
        
        // Draw glitch layers
        if (textGlitch) {
            // Red channel
            ctx.fillStyle = `rgba(255, 0, 0, 0.5)`;
            ctx.fillText(glitchText, canvas.width / 2 + textGlitchOffset - 2, canvas.height / 2);
            
            // Blue channel
            ctx.fillStyle = `rgba(0, 0, 255, 0.5)`;
            ctx.fillText(glitchText, canvas.width / 2 + textGlitchOffset + 2, canvas.height / 2);
        }
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
    
    // Animation loop
    function animate() {
        draw();
        animationId = setTimeout(animate, animationSpeed);
    }
    
    // Start the animation
    function startAnimation() {
        if (!isRunning) {
            isRunning = true;
            animate();
        }
    }
    
    // Stop the animation
    function stopAnimation() {
        if (isRunning) {
            isRunning = false;
            clearTimeout(animationId);
        }
    }
    
    // Change glitch color
    function setColor(color) {
        glitchColor = color;
    }
    
    // Change animation speed
    function setSpeed(speed) {
        animationSpeed = speed;
        if (isRunning) {
            stopAnimation();
            startAnimation();
        }
    }
    
    // Change font size
    function setFontSize(size) {
        fontSize = size;
        ctx.font = `${fontSize}px monospace`;
    }
    
    // Set opacity
    function setOpacity(value) {
        opacity = value;
    }
    
    // Set brightness
    function setBrightness(value) {
        brightness = value;
    }
    
    // Set glitch intensity
    function setGlitchIntensity(value) {
        glitchIntensity = value;
    }
    
    // Set glitch frequency
    function setGlitchFrequency(value) {
        glitchFrequency = value;
    }
    
    // Expose public methods
    window.GlitchAnimation = {
        init: init,
        setColor: setColor,
        setSpeed: setSpeed,
        setFontSize: setFontSize,
        setOpacity: setOpacity,
        setBrightness: setBrightness,
        setGlitchIntensity: setGlitchIntensity,
        setGlitchFrequency: setGlitchFrequency,
        start: startAnimation,
        stop: stopAnimation
    };
})(); 