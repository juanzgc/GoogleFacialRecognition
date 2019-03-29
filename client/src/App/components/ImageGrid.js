import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

class ImageGrid extends Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    var {data} = this.props;

    console.log(data);
    return (
      // <div>
      //   <h1>Hello</h1>
      // </div>
      <div className='imageData' style={styles.root}>
        <GridList cellHeight={200} className={styles.GridList} cols={3}>
          {
            data.map(item => (
              <GridListTile key={item.title} cols={1}>
                <img src={item.link} atl={item.title} />
              </GridListTile>
            ))
          }
        </GridList>
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 500,
    height: 450,
  },
}

export default ImageGrid