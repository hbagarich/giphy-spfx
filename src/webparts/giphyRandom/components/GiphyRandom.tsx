import * as React from 'react';
import styles from './GiphyRandom.module.scss';
import { IGiphyRandomProps } from './IGiphyRandomProps';
import { IGiphyRandomState } from './IGiphyRandomState';
import { TextField, PrimaryButton } from 'office-ui-fabric-react';
import { default as pnp, ItemAddResult } from "sp-pnp-js";

export default class GiphyRandom extends React.Component<IGiphyRandomProps, IGiphyRandomState> {
  constructor(props: IGiphyRandomProps) {
    super(props);
    this.state = {
      gifUrl: '',
      searchQuery: '',
      showGif: false
    };
    this.searchQueryChanged = this.searchQueryChanged.bind(this);
    this.searchStart = this.searchStart.bind(this);
    this.onkeyUp = this.onkeyUp.bind(this);
    this.saveToSharePoint = this.saveToSharePoint.bind(this);
  }

  public render(): React.ReactElement<IGiphyRandomProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <TextField
            value={this.state.searchQuery}
            placeholder="Search giphy"
            onChanged={this.searchQueryChanged}
            className={styles.searchQueryField}
            onKeyUp={this.onkeyUp}
          />
          <PrimaryButton text="Search" onClick={this.searchStart} className={styles.searchButton} />

          {this.state.showGif &&
            <div>
              <PrimaryButton text="Upload" onClick={this.saveToSharePoint} />
              <img style={{ width: '100%', height: '100%' }} src={this.state.gifUrl}
              />
            </div>
          }
        </div>
      </div>
    );
  }

  private onkeyUp(event) {
    if (event.key == 'Enter') {
      this.searchStart();
    }
  }

  private searchQueryChanged(newValue: string) {
    this.setState({ ...this.state, searchQuery: newValue });
  }

  private saveToSharePoint() {
    pnp.sp.web.lists.getByTitle(this.props.listName).items.add({
      Title: this.state.searchQuery,
      Url: this.state.gifUrl
    }).then((iar: ItemAddResult) => {

      console.log(iar);
    })
      .catch(err => {
        console.log(err);
      });
  }

  private searchStart() {
    fetch('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + this.state.searchQuery, {
      method: 'get'
    }).then(r => {
      r.json().then(response => {
        this.setState({ ...this.state, showGif: true, gifUrl: response.data.image_url });
      });
    }).catch(err => {
      // Error :(
    });
  }
}
