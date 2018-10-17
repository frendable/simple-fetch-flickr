import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import autobind from 'react-autobind';
import styles from './SearchBar.css';

class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    }
    autobind(this);
  }

  updateState = value => {
    this.setState({
      inputValue: value,
    });
  }

  handleChange(e, { value }) {
    this.updateState(value);
  }

  render() {
    return (
      <div className={styles.container}>
        <label className={styles.tagSearch}>Tag Search</label>
        <Input type='text' placeholder='Search...' action>
          <Input onChange={this.handleChange} />
          <Button type='submit' onClick={this.props.onSubmitClick(this.state.inputValue)}>Search</Button>
        </Input>
      </div>
    )
  }
}

export default SearchBar;