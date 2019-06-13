/**
 * VS Code Dark+ theme
 */
const theme = {
  plain: {
    color: 'rgb(156, 220, 254)',
    backgroundColor: '#1e1e1e'
  },
  styles: [
    /* CSS Edits Start */
    {
      types: ['rule'],
      languages: ['css'],
      style: {
        color: 'rgb(197, 134, 192)'
      }
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(156, 220, 254)'
      }
    },
    {
      types: ['atrule'],
      languages: ['css'],
      style: {
        color: 'rgb(181, 206, 168)'
      }
    },
    {
      types: ['class'],
      languages: ['css'],
      style: {
        color: 'rgb(181, 206, 168)'
      }
    },
    /* CSS Edits End */

    {
      types: ['prolog'],
      style: {
        color: 'rgb(0, 0, 128)'
      }
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(106, 153, 85)'
      }
    },
    {
      types: ['keyword'],
      style: {
        color: 'rgb(197, 134, 192)'
      }
    },
    {
      types: ['keyword'],
      languages: ['graphql'],
      style: {
        color: 'rgb(86, 156, 214)'
      }
    },
    {
      types: ['operator', 'builtin', 'changed'],
      style: {
        color: 'rgb(86, 156, 214)'
      }
    },
    {
      types: ['number', 'inserted'],
      style: {
        color: 'rgb(181, 206, 168)'
      }
    },
    {
      types: ['constant'],
      style: {
        color: 'rgb(100, 102, 149)'
      }
    },
    {
      types: ['attr-name', 'attr-value', 'variable', 'script'],
      style: {
        color: 'rgb(156, 220, 254)'
      }
    },
    {
      types: ['deleted', 'string', 'regex'],
      style: {
        color: 'rgb(206, 145, 120)'
      }
    },
    {
      types: ['punctuation', 'script-punctuation'],
      style: {
        color: 'rgb(212, 212, 212)'
      }
    },
    {
      types: ['function', 'function-variable'],
      style: {
        color: 'rgb(220, 220, 170)'
      }
    },
    {
      types: ['class-name', 'tag'],
      style: {
        color: 'rgb(78, 201, 176)'
      }
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(209, 105, 105)'
      }
    }
  ]
};

export default theme;
