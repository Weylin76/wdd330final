document.addEventListener('DOMContentLoaded', function() {
    const musicSelect = document.getElementById('music');
    const coolMusic = document.getElementById('coolMusic');

    if (musicSelect && coolMusic) {
        musicSelect.addEventListener('change', function() {
            if (musicSelect.value === 'Yes') {
                coolMusic.play();
            } else {
                coolMusic.pause();
            }
        });
    }
});
