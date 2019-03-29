import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {Helmet } from 'react-helmet';
import {Image} from 'react-bootstrap'
import '../styles/Home.css'

import { Card, Image as Image2 } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ImageGrid from '../components/ImageGrid'


// background color: #2695d5

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: undefined,
      data: undefined,
      count: 1
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

  handleSubmit(event) {
    // alert('Name: ' + this.state.name + ', submitted');
    event.preventDefault();
    fetch('/api/postName', {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        start: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      // alert("Data returned from Google");
      this.setState({data: data.items})
      // this.setState({data: data});
      const element = document.getElementById('imageData');
      console.log(element);
      element.scrollIntoView({behavior: 'smooth'})
    })
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
    const ImageLoader = () => (
      <div style={{marginTop: 20, marginBottom: 20}}>
        <ImageGrid data={this.state.data} />
        <Button disabled={(this.state.count > 9) ? true : false } variant="contained" onClick={this.getMoreData}>Load More</Button>
      </div>
    )

    return (
    <div className="App">
      <Helmet>
          <style>{'body { background-color: #f4fbff; }'}</style>
      </Helmet>
      <div style={{height: 400}}>
        <Image style={{maxHeight: '100%', width: '100%', objectPosition: 'center', objectFit: 'cover'}} src={process.env.PUBLIC_URL + '/images/home_background.jpg'} fluid alt="Background"/>
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
          <Card.Description>Enter your name below to begin</Card.Description>
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
        </Card.Content>
      </Card>
      </div>
      <div id="imageData" style={{marginTop: 20, marginBottom: 20}}>
      {
        this.state.data ? <ImageLoader /> : null 
      }
      </div>

    </div>
    );
  }
}
export default Home;