/**
 * Trails Animation for HackerTab 2025
 * Developed by CyberTechAjju
 * © 2025 All Rights Reserved
 */

(function() {
    // Trails animation variables
    var canvas, ctx;
    var particles = [];
    var trailColor = "#00ff00";
    var animationSpeed = 30; // milliseconds
    var animationId = null;
    var isRunning = false;
    var opacity = 0.1; // Low opacity for transparency
    var brightness = 0.7; // Low brightness
    var numParticles = 100;
    var particleSize = 3;
    var particleSpeed = 2;
    var trailLength = 20;
    var mouseX = 0;
    var mouseY = 0;
    var isMouseMoving = false;
    var mouseTimeout = null;

    // Initialize the animation
    function init() {
        canvas = document.getElementById("trailsCanvas");
        if (!canvas) {
            console.error("Canvas not found");
            return;
        }
        
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Get canvas context
        ctx = canvas.getContext("2d");
        
        // Initialize particles
        initParticles();
        
        // Add event listeners
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        
        // Start animation
        startAnimation();
    }
    
    // Handle window resize
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
    // Handle mouse movement
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Clear previous timeout
        if (mouseTimeout) {
            clearTimeout(mouseTimeout);
        }
        
        // Set timeout to stop mouse movement
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        
        // Create particles
        for (var i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * particleSize + 1,
                speedX: Math.random() * particleSpeed - particleSpeed / 2,
                speedY: Math.random() * particleSpeed - particleSpeed / 2,
                trail: [],
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    // Draw particles
    function draw() {
        // Clear canvas with fade effect
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            // Update position
            if (isMouseMoving) {
                // Move towards mouse
                var dx = mouseX - particle.x;
                var dy = mouseY - particle.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0) {
                    particle.x += dx * 0.05;
                    particle.y += dy * 0.05;
                }
            } else {
                // Random movement
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Bounce off walls
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX *= -1;
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY *= -1;
                }
            }
            
            // Update trail
            particle.trail.push({x: particle.x, y: particle.y});
            if (particle.trail.length > trailLength) {
                particle.trail.shift();
            }
            
            // Draw trail
            var color = applyBrightness(trailColor, brightness);
            for (var i = 0; i < particle.trail.length; i++) {
                var point = particle.trail[i];
                var trailOpacity = (i / particle.trail.length) * particle.opacity;
                
                ctx.fillStyle = `rgba(${hexToRgb(color)}, ${trailOpacity})`;
                ctx.beginPath();
                ctx.arc(point.x, point.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw particle
            ctx.fillStyle = `rgba(${hexToRgb(color)}, ${particle.opacity})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
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
    
    // Change trail color
    function setColor(color) {
        trailColor = color;
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
    
    // Set number of particles
    function setNumParticles(value) {
        numParticles = value;
        initParticles();
    }
    
    // Set particle size
    function setParticleSize(value) {
        particleSize = value;
        initParticles();
    }
    
    // Set particle speed
    function setParticleSpeed(value) {
        particleSpeed = value;
        initParticles();
    }
    
    // Set trail length
    function setTrailLength(value) {
        trailLength = value;
    }
    
    // Expose public methods
    window.TrailsAnimation = {
        init: init,
        setColor: setColor,
        setSpeed: setSpeed,
        setOpacity: setOpacity,
        setBrightness: setBrightness,
        setNumParticles: setNumParticles,
        setParticleSize: setParticleSize,
        setParticleSpeed: setParticleSpeed,
        setTrailLength: setTrailLength,
        start: startAnimation,
        stop: stopAnimation
    };
})();
