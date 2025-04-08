/**
 * Background Images for HackerTab 2025
 * Developed by CyberTechAjju
 * © 2025 All Rights Reserved
 */

const BACKGROUNDS = {
    default: [
        {
            name: "Classic Matrix",
            url: "media/bg/bg0.jpg",
            credit: "HackerTab"
        },
        {
            name: "Default Matrix",
            url: "media/bg/bg1.jpg",
            credit: "HackerTab"
        },
        {
            name: "Dark Matrix",
            url: "media/bg/bg2.jpg",
            credit: "HackerTab"
        },
        {
            name: "Cyber Matrix",
            url: "media/bg/bg3.jpg",
            credit: "HackerTab"
        },
        {
            name: "Binary Matrix",
            url: "media/bg/bg4.jpg",
            credit: "HackerTab"
        },
        {
            name: "Neon Matrix",
            url: "media/bg/bg5.jpg",
            credit: "HackerTab"
        }
    ],
    hacker: [
        {
            name: "Matrix Code",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Binary World",
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Cyber Security",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Hacker Terminal",
            url: "https://images.unsplash.com/photo-1544191696-102db4ecff4e?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Markus Spiske on Unsplash"
        },
        {
            name: "Code Wall",
            url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Markus Spiske on Unsplash"
        },
        {
            name: "Digital Security",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        }
    ],
    mrRobot: [
        {
            name: "Mr. Robot Dark",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Mr. Robot Light",
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Mr. Robot Glitch",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "E Corp",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Fsociety",
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Elliot's Room",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        }
    ],
    abstract: [
        {
            name: "Digital Network",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Data Flow",
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Cyber Space",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Digital Grid",
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Binary Landscape",
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        },
        {
            name: "Data Visualization",
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=3840&q=80",
            credit: "Photo by Dan Cristian Pădureț on Unsplash"
        }
    ]
};

// Function to get all backgrounds
function getAllBackgrounds() {
    return BACKGROUNDS;
}

// Function to get backgrounds by category
function getBackgroundsByCategory(category) {
    return BACKGROUNDS[category] || BACKGROUNDS.default;
}

// Function to get a random background
function getRandomBackground(category = null) {
    if (category && BACKGROUNDS[category]) {
        const backgrounds = BACKGROUNDS[category];
        return backgrounds[Math.floor(Math.random() * backgrounds.length)];
    }
    
    const allCategories = Object.keys(BACKGROUNDS);
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
    const backgrounds = BACKGROUNDS[randomCategory];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

// Export functions
window.BackgroundManager = {
    getAll: getAllBackgrounds,
    getByCategory: getBackgroundsByCategory,
    getRandom: getRandomBackground
}; 