export class ViewData {
    constructor(
        public name: string,
        public title: string,
        public img: string,
    ){};
}

export const views = {
    current: new ViewData(
        'current', 'Right Now', 
        'https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-connection-6.png&r=0&g=0&b=0'
    ),
    daily: new ViewData(
        'daily', 'Daily View',
        'https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-time-7.png&r=0&g=0&b=0'
    ),
    weekly: new ViewData(
        'weekly', 'Weekly View',
        'https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-calendar-7.png&r=0&g=0&b=0'
    )
}