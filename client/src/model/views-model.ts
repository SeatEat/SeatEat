export class ViewData {
    constructor(
        public name: string,
        public title: string,
        public svgPath: string,
    ){};
}

export const views = {
    current: new ViewData(
        'current', 
        'Right Now', 
        'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 19l1.5-5h-4.5l7-9-1.5 5h4.5l-7 9z'
    ),
    daily: new ViewData(
        'daily', 
        'Daily View',
        'M21.854 13.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208zm-9.005 5.359v-1.419h-2.594v-1.295l2.722-3.653h1.288v3.689h.816v1.259h-.815v1.419h-1.417zm0-2.679v-1.695l-1.263 1.695h1.263zm-7.768 2.679c0-.961.275-1.709 1.234-2.419 1.129-.836 1.99-1.165 1.99-1.939 0-.512-.308-.83-.804-.83-.69 0-.855.723-.855 1.411h-1.421c-.06-1.782.951-2.713 2.338-2.713 1.287 0 2.22.856 2.22 2.036 0 .589-.183 1.056-.576 1.469-.621.655-1.552.985-2.163 1.682h2.774v1.303h-4.737z'
    ),
    weekly: new ViewData(
        'weekly', 
        'Weekly View',
        'M17 1c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-12 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm13 5v10h-16v-10h16zm2-6h-2v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-8v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-2v18h20v-18zm4 3v19h-22v-2h20v-17h2zm-17 7h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z'
    )
}