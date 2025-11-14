const { createElement } = React;
const { render } = ReactDOM;

function App() {
  return createElement('h1', { style: { textAlign: 'center', marginTop: '50px' } }, 'Elektroninė parduotuvė');
}

render(createElement(App), document.getElementById('root'));
