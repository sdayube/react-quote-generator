import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quote: {},
      ready: false,
    }
    this.changeQuote = this.changeQuote.bind(this);
  }

  selectQuote(quotes) {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  async componentDidMount() {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((quotes) => this.setState({
        quotes,
        quote: this.selectQuote(quotes),
        ready: true,
      }));
  }

  changeQuote() {
    this.setState({
      quote: this.selectQuote(this.state.quotes)
    });
  }

  render() {
    const { quote, ready } = this.state;
    return (
      <main>
        <article id="quote-box">
          <figure>
            <ReactPlaceholder
              showLoadingAnimation
              type='text'
              rows={3}
              ready={ready}
            >
              <blockquote id="text">"{quote.text}"</blockquote>
              <figcaption id="author">{quote.author}</figcaption>
            </ReactPlaceholder>
          </figure>
          <div className="buttons">
            <a
              href="https://twitter.com/intent/tweet"
              id="tweet-quote"
              className="button"
            >
              <i className="fa fa-twitter" />
            </a>
            <button
              type="button"
              id="new-quote"
              onClick={this.changeQuote}
              className="button"
            >
              New quote
            </button>
          </div>
        </article>
      </main>
    );
  }
}

export default App;
