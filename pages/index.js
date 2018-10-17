import Head from 'next/head';
import React from 'react';
import { Fetch } from 'react-data-fetching';
import { Grid, Image, Loader } from 'semantic-ui-react';

import SearchBar from '../components/SearchBar';
import styles from './style.css';

class Home extends React.PureComponent {
  state = {
    tags: null,
    isLoadingMore: false,
  }

  refetchData = () => {
    this.setState(() => ({
      isLoadingMore: true
    }));
  }

  renderItem = (entry, key) => {
    return (
      <Grid.Column mobile={16} tablet={8} computer={4} key={key}>
        <div className={styles.imageContainer} title={entry.title}>
          <a href={entry.link} target="_blank">
            <Image src={entry.media.m} size="normal" wrapped />
          </a>
          <div className={styles.infobar}>
            <div className={styles.text}>
              <label title={entry.title}>{entry.title}</label>
              <br />
              <label>by {entry.author}</label>
            </div>
          </div>
        </div>
      </Grid.Column>
    )
  };

  handleError = (error) => {
    console.error(error);
  }

  handleSearch = keyword => () => {
    this.setState({
      tags: keyword
    });
    this.refetchData();
  }

  saveData = () => {
    this.setState({
      isLoadingMore: false,
    })
  }

  render() {
    {
      /* Use cross origin request to anywhere, because of CORS Problem */
      this.prefixUrl = 'https://cors-anywhere.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';  
    }
    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {/* Manual import css for semantic ui using static file */}
          <link rel="stylesheet" href="/static/semantic.min.css" />
        </Head>
        <SearchBar onSubmitClick={this.handleSearch} />

        <Fetch
          url={this.state.tags ? `${this.prefixUrl}&tags=${this.state.tags}` : this.prefixUrl}
          method='GET'
          timeout={5000}
          headers={{
            'Cache-Control': 'no-cache',
          }}
          loader={
            <div className={styles.loadingContainer}>
              <Loader active>
                Loading
              </Loader>
            </div>
          }
          error={this.handleError}
          refetchKey={this.state.isLoadingMore}
          onFetch={this.saveData}
        >
          {({ data }) => {
            const result = data;
            return (
              <div className={styles.itemContainer}>
                <Head>
                  <title>{result && result.title}</title>
                </Head>

                {(result && result.items.length > 0) ? 
                <Grid columns='equal' relaxed>
                  {result.items.map((entry, key) => {
                      return this.renderItem(entry, key);
                  })}
                </Grid>
                : `No Result Found`}
              </div>
            )
          }}
        </Fetch>
      </div>
    )
  }
}

export default Home;