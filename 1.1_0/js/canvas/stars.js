/**
 * Stars Animation for HackerTab 2025
 * Developed by CyberTechAjju
 * © 2025 All Rights Reserved
 */

(function() {
    // Stars animation variables
    var canvas, ctx;
    var stars = [];
    var starColor = "#00ff00";
    var animationSpeed = 30; // milliseconds
    var animationId = null;
    var isRunning = false;
    var opacity = 0.1; // Low opacity for transparency
    var brightness = 0.7; // Low brightness
    var numStars = 200;
    var starSize = 2;
    var starSpeed = 0.5;
    var starTrail = 0.95; // Trail effect (0 to 1)
    var starField = [];
    var starFieldOpacity = 0.3;
    var starFieldSize = 3;
    var starFieldSpeed = 0.2;
    var starFieldTrail = 0.98;

    // Initialize the animation
    function init() {
        canvas = document.getElementById("starsCanvas");
        if (!canvas) {
            console.error("Canvas not found");
            return;
        }
        
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Get canvas context
        ctx = canvas.getContext("2d");
        
        // Initialize stars
        initStars();
        
        // Start animation
        startAnimation();
        
        // Add resize event listener
        window.addEventListener("resize", handleResize);
    }
    
    // Handle window resize
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }
    
    // Initialize stars
    function initStars() {
        stars = [];
        starField = [];
        
        // Create stars
        for (var i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * starSize + 1,
                speed: Math.random() * starSpeed + 0.5,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
        
        // Create star field
        for (var i = 0; i < numStars / 2; i++) {
            starField.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * starFieldSize + 1,
                speed: Math.random() * starFieldSpeed + 0.2,
                opacity: Math.random() * 0.3 + 0.2
            });
        }
    }
    
    // Draw stars
    function draw() {
        // Clear canvas with fade effect
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw star field
        drawStarField();
        
        // Draw stars
        drawStars();
    }
    
    // Draw star field
    function drawStarField() {
        starField.forEach(star => {
            // Update position
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
            
            // Draw star
            var color = applyBrightness(starColor, brightness);
            ctx.fillStyle = `rgba(${hexToRgb(color)}, ${star.opacity * starFieldOpacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // Draw stars
    function drawStars() {
        stars.forEach(star => {
            // Update position
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
            
            // Draw star
            var color = applyBrightness(starColor, brightness);
            ctx.fillStyle = `rgba(${hexToRgb(color)}, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw trail
            if (star.trail) {
                ctx.fillStyle = `rgba(${hexToRgb(color)}, ${star.opacity * starTrail})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y - star.speed * 2, star.size * 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
        });
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
    
    // Convert hex to RGB string
    function hexToRgb(hex) {
        var r = parseInt(hex.substr(1,2), 16);
        var g = parseInt(hex.substr(3,2), 16);
        var b = parseInt(hex.substr(5,2), 16);
        return `${r}, ${g}, ${b}`;
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
    
    // Change star color
    function setColor(color) {
        starColor = color;
    }
    
    // Change animation speed
    function setSpeed(speed) {
        animationSpeed = speed;
        if (isRunning) {
            stopAnimation();
            startAnimation();
        }
    }
    
    // Set opacity
    function setOpacity(value) {
        opacity = value;
    }
    
    // Set brightness
    function setBrightness(value) {
        brightness = value;
    }
    
    // Set number of stars
    function setNumStars(value) {
        numStars = value;
        initStars();
    }
    
    // Set star size
    function setStarSize(value) {
        starSize = value;
        initStars();
    }
    
    // Set star speed
    function setStarSpeed(value) {
        starSpeed = value;
        initStars();
    }
    
    // Set star trail
    function setStarTrail(value) {
        starTrail = value;
    }
    
    // Expose public methods
    window.StarsAnimation = {
        init: init,
        setColor: setColor,
        setSpeed: setSpeed,
        setOpacity: setOpacity,
        setBrightness: setBrightness,
        setNumStars: setNumStars,
        setStarSize: setStarSize,
        setStarSpeed: setStarSpeed,
        setStarTrail: setStarTrail,
        start: startAnimation,
        stop: stopAnimation
    };
})();