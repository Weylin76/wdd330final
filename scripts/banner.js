document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('banner');
    console.log('Banner element:', banner); // Debug log to check the banner element

    if (banner) {
        let date = new Date();
        let dayOfWeek = date.getDay();
        let weekday = '';

        // Determine the name of the day
        switch (dayOfWeek) {
            case 0:
                weekday = 'Sunday';
                break;
            case 1:
                weekday = 'Monday';
                break;
            case 2:
                weekday = 'Tuesday';
                break;
            case 3:
                weekday = 'Wednesday';
                break;
            case 4:
                weekday = 'Thursday';
                break;
            case 5:
                weekday = 'Friday';
                break;
            default:
                weekday = 'Saturday';
        }

        // Create and append a message based on the day of the week
        let span = document.createElement('span');
        switch (dayOfWeek) {
            case 0:
                span.textContent = `Today is ${weekday}. Time to take a break from work, and enjoy the time off!`;
                break;
            case 1:
                span.textContent = `Today is ${weekday}. I am a Friday person in a Monday world!`;
                break;
            case 2:
                span.textContent = `Today is ${weekday}. I guess it is better than Monday, but barely!`;
                break;
            case 3:
                span.textContent = `Today is ${weekday}. Mike! Mike! Mike! What day is it Mike? .... Hump Day, Yeah!`;
                break;
            case 4:
                span.textContent = `Today is ${weekday}. Yeah, if Thursday could be Friday, That would be great!`;
                break;
            case 5:
                span.textContent = `Today is ${weekday}, We "Work"!`;
                break;
            case 6:
                span.textContent = `OH, ${weekday} ........ I so love you"!`;
                break;
        }
        // Append the message to the banner
        banner.appendChild(span);
    } else {
        console.error('Banner element not found.');
    }
});






