document.addEventListener('DOMContentLoaded', () => {
    const postsWrapper = document.querySelector('.posts-wrapper');
    if (!postsWrapper) return; // Выходим, если элемент не найден

    const posts = postsWrapper.querySelectorAll('.post');
    let currentPostIndex = 0;
    const scrollInterval = 3000; // Интервал прокрутки в миллисекундах (3 секунды)

    // Назначаем обработчики кликов на каждый пост
    posts.forEach(post => {
        post.addEventListener('click', () => {
            // Замени 'property.html' на реальный URL
            window.location.href = 'property.html';
        });
    });

    // Функция для прокрутки
    function scrollToNextPost() {
        // Переходим к следующему посту
        currentPostIndex++;

        // Если дошли до конца, возвращаемся к первому посту
        if (currentPostIndex >= posts.length) {
            currentPostIndex = 0;
        }

        const nextPost = posts[currentPostIndex];

        // Плавно прокручиваем контейнер к верхней границе следующего поста
        postsWrapper.scrollTo({
            top: nextPost.offsetTop,
            behavior: 'smooth'
        });
    }

    // Запускаем автоматическую прокрутку, если постов больше одного
    if (posts.length > 1) {
        setInterval(scrollToNextPost, scrollInterval);
    }
});