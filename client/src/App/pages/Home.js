import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {Helmet } from 'react-helmet';
import {Image as Image1} from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/Home.css'

import { Card, Image as Image2 } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ImageGrid from '../components/ImageGrid'

import unirest from 'unirest';
import uuidv1 from 'uuid/v1';

// background color: #2695d5

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      data: undefined,
      count: 1,
      type: undefined,
      img: '',
      imgUrl: '',
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMoreData = this.getMoreData.bind(this);
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.setState({count: 1})
  };

  // https://instagram.fzty2-1.fna.fbcdn.net/vp/fb030b4b417ebf9b17eaae3c1ae27823/5D7774D7/t51.2885-15/e35/54511075_337188533591000_8990582897760035229_n.jpg?_nc_ht=instagram.fzty2-1.fna.fbcdn.net



  handleFileInput = (e) => {
    e.preventDefault();
    console.log("Input file: ", e.target.files[0]);

    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('uploadFile', file);

    const imgUrl = URL.createObjectURL(file) // Used to preview the image
    this.setState({type: 'image', data: undefined, img: imgUrl})

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (function(prevThis) {
      return function (event) {
        event.preventDefault();
        var dataUrl = event.target.result;
        var image1 = new Image();
        image1.src = dataUrl;
        image1.onload = (function(oldThis, image1) {
          return function (e) {
            // console.log(e);
            e.preventDefault();
            console.log(image1)
            // var image1 = e.path[0];
            var canvas = document.createElement('canvas');
            var width = image1.width;
            var height = image1.height;
            var maxWidth = 600;
            var maxHeight = 600;
            if (width > height) {
              if (width > maxWidth) {
                  height = Math.round(height * maxWidth / width);
                  width = maxWidth;
              }
            } 
            else {
              if (height > maxHeight) {
                  width = Math.round(width * maxHeight / height);
                  height = maxHeight;
              }
            }
            canvas.width = width;
            canvas.height = height;
        
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image1, 0, 0, width, height);

            var resizedImageUrl = canvas.toDataURL("image/png", 0.7);
            // console.log(oldThis);
            oldThis.setState({ imgUrl: resizedImageUrl}, function() {
              console.log("New state wait callback: ", oldThis.state.imgUrl);
              oldThis.handleSubmit(e);
            });

            console.log(resizedImageUrl);
          }
        })(prevThis, image1);
        // console.log(dataUrl);
        // console.log("Base 64: ", event.target.result);
      }
    })(this)
    reader.onerror = function (error) {
      console.log("Error: ", error);
    }
    // fetch('api/postImg', {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   file: img
    // })
    // .then(response => response.json())
    // .then(img => {
    //   console.log(img);
    // })
    // Begin the fetch for google images
    
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true})
    let galleryName = uuidv1().toString(); // creates a random gallery name
    let prevThis = this;
    // Enrolls the face into the Kairos Face Recognition
    unirest.post("https://kairosapi-karios-v1.p.rapidapi.com/enroll")
    .header("X-RapidAPI-Host", "kairosapi-karios-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "139f1bfd55msha539592df3ee41dp1c0f85jsn5b87d99d6514")
    .header("Content-Type", "application/json")
    .send({"image":this.state.imgUrl,"gallery_name":galleryName,"subject_id":galleryName})
    .end(function (result) {
      console.log(result.body); // interesting to see the characteristics

      // fetch the google custom search engine
      fetch('/api/postName', {
        method: "POST",
        body: JSON.stringify({
          name: prevThis.state.name,
          start: 1
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {

        let newData = data.items.map(elem => {
          console.log(elem);
          function checkFaces(fn) {
            unirest.post("https://kairosapi-karios-v1.p.rapidapi.com/recognize")
            .header("X-RapidAPI-Host", "kairosapi-karios-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "139f1bfd55msha539592df3ee41dp1c0f85jsn5b87d99d6514")
            .header("Content-Type", "application/json")
            .send({"image":elem.link,"gallery_name":galleryName})
            .end(function (result) {
              console.log(result.body);
              // result.body.images
              let isRecognition = false;
              if (result.body.images) {
                let detect = result.body.images.map(face => {
                  if (face.transaction.status === "success") {
                    console.log("Success got a match");
                    isRecognition = true;
                  }
                  return face;
                })
                console.log(isRecognition);
              }
              fn({
                link: elem.link,
                title: elem.title,
                isRecognition: isRecognition
              })
            });
          }

          return checkFaces( function(results) {
            console.log(results);
            return results;
          })
        })
        console.log(newData);
        // console.log(data);
        prevThis.setState({data: data.items})
        // this.setState({data: data});
        const element = document.getElementById('imageData');
        console.log(element);
        element.scrollIntoView({behavior: 'smooth'})
        prevThis.setState({loading: false})
      })
    });




  }

  getMoreData(event) {
    this.setState({count: this.state.count+1})
    event.preventDefault();
    fetch('/api/postName', {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        start: this.state.data.length + 1
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      // alert("Data returned from Google");
      this.setState({data: [...this.state.data, ...data.items]})
      console.log("new data: ", this.state.data);
    })
  }

  render() {

    const LoadView = () => {
      if (this.state.loading) {
        return (<CircularProgress size={25} color="secondary" />)
      }
      return null;
    }

    const ImageLoader = () => (
      <div style={{marginTop: 20, marginBottom: 20}}>
        <ImageGrid data={this.state.data} />
        <Button disabled={(this.state.count > 9) ? true : false } variant="contained" onClick={this.getMoreData}>Load More</Button>
      </div>
    )

    const RenderButtonOrPreview = () => {
      if (this.state.img === '' || this.state.img === undefined) {
        return (
          <div>
            <Card.Description>
              <div style={{marginTop: 10, marginBottom: 10}}>
                <strong>AND</strong>
              </div>
            </Card.Description>

            <input className="html-input-hide" type='file' accept="image/*" id="contained-button-file" onChange={this.handleFileInput} />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" >Upload Image</Button>
            </label>
          </div>
        )
      }
      else {
        return (
          <div style={{height: 200, marginTop: 15, marginBottom: 10}}>
            <Image1 style={{maxHeight: '100%', maxWidth: '100%', objectPosition: 'center', objectFit: 'cover'}} src={this.state.img} />
            {/* <Button variant="contained" component="span">Continue</Button> */}
          </div>
        )
      }

    }

    return (
    <div className="App">
      <Helmet>
          <style>{'body { background-color: #f4fbff; }'}</style>
      </Helmet>
      <div style={{height: 400}}>
        <Image1 style={{maxHeight: '100%', width: '100%', objectPosition: 'center', objectFit: 'cover'}} src={process.env.PUBLIC_URL + '/images/home_background.jpg'} fluid alt="Background"/>
      </div>
      <div className="center" style={{marginTop: 20, marginBottom: 20}}>
      <Card>
        <Card.Content>
          <Image2 floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          <Card.Header>Google Face Detection API</Card.Header>
          <Card.Meta>Find yourself today!</Card.Meta>
          <Card.Description>
            Are you thinking of applying to jobs but worried about what potential employers may find after a Google search of your name?
          </Card.Description>
          <Card.Description>
            <strong>No need to worry!</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Description>Enter your name and upload a picture of yourself below to begin</Card.Description>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-name"
              label="Full Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
            />
          </form>
          <RenderButtonOrPreview />
        </Card.Content>
      </Card>
      </div>
      <div id="imageData" style={{marginTop: 20, marginBottom: 20}}>
      <LoadView />
      {
        this.state.data ? <ImageLoader /> : null 
      }
      </div>

    </div>
    );
  }
}
export default Home;