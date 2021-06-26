export const boardLinesProps = [
  [ 
    {
      id: 'line-a',
      className: 'border-top-none',

      cells: [
        {
          id: 'a1',
          className: 'border-left-none',
          isMarked: false,
          playerMarkedCell: ''
        },
  
        {
          id: 'a2',
          className: '',
          isMarked: false,
          playerMarkedCell: ''
        },
  
        {
          id: 'a3',
          className: 'border-right-none',
          isMarked: false,
          playerMarkedCell: ''
        }
      ]
    }
  ],

  [      
    {
      id: 'line-b',
      className: '',

      cells: [
        {
          id: 'b1',
          className: 'border-left-none',
          isMarked: false,
          playerMarkedCell: ''
        },
  
        {
          id: 'b2',
          className: '',
          isMarked: false,
          playerMarkedCell: ''
        },
  
        {
          id: 'b3',
          className: 'border-right-none',
          isMarked: false,
          playerMarkedCell: ''
        }
      ]
    }
  ],

  [
    {
      id: 'line-c',
      className: 'border-bottom-none',

      cells: [
        {
          id: 'c1',
          className: 'border-left-none',
          isMarked: false,
          playerMarkedCell: ''
        },
  
        {
          id: 'c2',
          className: '',
          isMarked: false,
          playerMarkedCell: ''
        },
  
        {
          id: 'c3',
          className: 'border-right-none',
          isMarked: false,
          playerMarkedCell: ''
        }
      ]
    }
  ]
];