export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1', 
                    title: 'Todo column',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 1',
                            cover: 'https://vcdn1-sohoa.vnecdn.net/2021/10/27/macbook-pro-2021-cnet-review-23-1635307337.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=FIheyR1HRqH-lOAwxTjM7g'
                        },
                         {
                            id: 'card-2',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 2',
                            cover: null
                        },
                        {
                            id: 'card-3',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 3',
                            cover: null
                        },
                        {
                            id: 'card-4',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 4',
                            cover: null
                        },
                        {
                            id: 'card-5',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 5',
                            cover: null
                        },
                        {
                            id: 'card-6',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 6',
                            cover: null
                        },
                        {
                            id: 'card-7',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 7',
                            cover: null
                        }
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'inprogress column',
                    cardOrder: ['card-8', 'card-9', 'card-10'],
                    cards: [
                        {
                            id: 'card-8',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 8',
                            cover: null
                        },
                        {
                            id: 'card-9',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 9',
                            cover: null
                        },
                        {
                            id: 'card-10',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 10',
                            cover: null
                        }
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'done column',
                    cardOrder: ['card-11', 'card-12', 'card-13'],
                    cards: [
                        {
                            id: 'card-11',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 11',
                            cover: null
                        },
                        {
                            id: 'card-12',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 12',
                            cover: null
                        },
                        {
                            id: 'card-13',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: ' Title of card 13',
                            cover: null
                        }
                    ]
                }
            ]
        }
    ]
}