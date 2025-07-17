document.addEventListener('DOMContentLoaded', () => {
    const postsWrapper = document.querySelector('.posts-wrapper');
    if (!postsWrapper) return; // Exit if the element is not found

    const posts = postsWrapper.querySelectorAll('.post');
    let currentPostIndex = 0;
    const scrollInterval = 3000; // Scroll interval in milliseconds (3 seconds)

    // Assign click handlers to each post
    posts.forEach(post => {
        post.addEventListener('click', () => {
            // Replace 'property.html' with the actual URL
            window.location.href = 'property.html';
        });
    });

    // Function to handle scrolling
    function scrollToNextPost() {
        // Move to the next post
        currentPostIndex++;

        // If it's the end of the list, go back to the first post
        if (currentPostIndex >= posts.length) {
            currentPostIndex = 0;
        }

        const nextPost = posts[currentPostIndex];

        // Smoothly scroll the container to the top of the next post
        postsWrapper.scrollTo({
            top: nextPost.offsetTop,
            behavior: 'smooth'
        });
    }

    // Start automatic scrolling if there is more than one post
    if (posts.length > 1) {
        setInterval(scrollToNextPost, scrollInterval);
    }
});