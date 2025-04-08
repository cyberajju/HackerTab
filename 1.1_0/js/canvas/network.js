/**
 * Network Effect Animation for HackerTab 2025
 * Developed by CyberTechAjju
 * © 2025 All Rights Reserved
 */

(function() {
    // Network animation variables
    var canvas, ctx;
    var networkColor = "#00ff00";
    var animationSpeed = 30; // milliseconds
    var animationId = null;
    var isRunning = false;
    var nodes = [];
    var connections = [];
    var nodeCount = 80; // More nodes for denser network
    var maxConnections = 150; // Maximum number of connections to draw
    var connectionDistance = 120; // Maximum distance for connections
    var nodeSize = 2; // Size of nodes
    var pulseEffect = true; // Enable pulse effect
    var pulseNodes = []; // Nodes that are pulsing

    // Initialize the animation
    function init() {
        canvas = document.getElementById("matrixCanvas");
        if (!canvas) {
            console.error("Canvas not found");
            return;
        }
        
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Get canvas context
        ctx = canvas.getContext("2d");
        
        // Initialize nodes
        initNodes();
        
        // Start animation
        startAnimation();
        
        // Add resize event listener
        window.addEventListener("resize", handleResize);
    }
    
    // Handle window resize
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initNodes();
    }
    
    // Initialize nodes
    function initNodes() {
        nodes = [];
        connections = [];
        pulseNodes = [];
        
        // Create nodes
        for (var i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5, // Slower movement
                vy: (Math.random() - 0.5) * 1.5,
                size: nodeSize + Math.random() * 2, // Varying node sizes
                pulsePhase: Math.random() * Math.PI * 2 // Random pulse phase
            });
        }
        
        // Select some nodes for pulsing
        for (var i = 0; i < nodeCount / 4; i++) {
            const randomIndex = Math.floor(Math.random() * nodes.length);
            pulseNodes.push(nodes[randomIndex]);
        }
    }
    
    // Draw network effect
    function draw() {
        // Clear canvas with fade effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            // Move nodes
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off walls with slight randomness
            if (node.x < 0 || node.x > canvas.width) {
                node.vx *= -1;
                node.x = node.x < 0 ? 0 : canvas.width;
                node.vx += (Math.random() - 0.5) * 0.5; // Add slight randomness
            }
            if (node.y < 0 || node.y > canvas.height) {
                node.vy *= -1;
                node.y = node.y < 0 ? 0 : canvas.height;
                node.vy += (Math.random() - 0.5) * 0.5; // Add slight randomness
            }
            
            // Update pulse phase
            if (pulseEffect && pulseNodes.includes(node)) {
                node.pulsePhase += 0.05;
                if (node.pulsePhase > Math.PI * 2) {
                    node.pulsePhase = 0;
                }
            }
            
            // Calculate pulse size
            let currentSize = node.size;
            if (pulseEffect && pulseNodes.includes(node)) {
                currentSize = node.size * (1 + Math.sin(node.pulsePhase) * 0.5);
            }
            
            // Draw node with glow effect
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, currentSize * 2
            );
            gradient.addColorStop(0, networkColor);
            gradient.addColorStop(1, "rgba(0, 255, 0, 0)");
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, currentSize * 2, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Find and draw connections
        connections = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    connections.push({
                        from: nodes[i],
                        to: nodes[j],
                        distance: distance,
                        opacity: 1 - distance / connectionDistance
                    });
                }
            }
        }
        
        // Sort connections by distance (draw closer ones on top)
        connections.sort((a, b) => b.distance - a.distance);
        
        // Draw connections with limit
        const connectionsToDraw = Math.min(connections.length, maxConnections);
        for (let i = 0; i < connectionsToDraw; i++) {
            const connection = connections[i];
            const opacity = connection.opacity * 0.7; // Slightly reduce opacity
            
            ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(connection.from.x, connection.from.y);
            ctx.lineTo(connection.to.x, connection.to.y);
            ctx.stroke();
        }
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
    
    // Change network color
    function setColor(color) {
        networkColor = color;
    }
    
    // Change animation speed
    function setSpeed(speed) {
        animationSpeed = speed;
        if (isRunning) {
            stopAnimation();
            startAnimation();
        }
    }
    
    // Expose public methods
    window.NetworkAnimation = {
        init: init,
        setColor: setColor,
        setSpeed: setSpeed,
        start: startAnimation,
        stop: stopAnimation
    };
})(); 