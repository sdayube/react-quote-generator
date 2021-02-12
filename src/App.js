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

    if (!quotes.length) {
      return (
        <main>
          <article className="box">
            <figure>
              <blockquote id="text">
                <ReactPlaceholder showLoadingAnimation type='text' rows={2} ready={this.state.ready} />  
              </blockquote>
              <figcaption id="author">
                <ReactPlaceholder showLoadingAnimation type='text' rows={1} ready={this.state.ready} />  
              </figcaption>
            </figure>
          </article>
        </main>
      );
    }

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
