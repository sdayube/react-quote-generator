import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quote: {},
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
      }));
  }

  changeQuote() {
    this.setState({
      quote: this.selectQuote(this.state.quotes)
    });
  }

  render() {
    const { quotes, quote } = this.state;
    // if (!quotes.length) {
      return (
        <main>
          <article className="box">
            <div className="loading">
              <p>Loading...</p>
            </div>
          </article>
        </main>
      );
    // }
    return (
      <main>
        <article id="quote-box" className="box">
          <figure>
            <blockquote id="text">"{quote.text}"</blockquote>
            <figcaption id="author">{quote.author}</figcaption>
          </figure>
          <a href="https://twitter.com/intent/tweet" id="tweet-quote">Tweet quote</a>
          <button type="button" id="new-quote" onClick={this.changeQuote}>New quote</button>
        </article>
      </main>
    );
  }
}

export default App;
