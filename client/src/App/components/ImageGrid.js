import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class ImageGrid extends Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    var {data} = this.props;
    const noRec = "No Detection Found";
    const rec = "Successful Detection";
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
                <GridListTileBar
                  title={item.isRecognition ? rec : noRec}
                  style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'}}
                />
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