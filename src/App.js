// https://i.insider.com/6083405d5f61100018270ff3?width=1000&format=jpeg&auto=webp
import "./App.css";
import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "1b1e9307c300426685d7ddba871c8f75",
});

const particleOption = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    line_linked: {
      color: "#de0f1b",
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "SignIn",
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        dateJoined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({ user: data });
  };

  reset = () => {
    //Image and box would stay until new was accessed, used this to solve.
    this.setState({
      box: {},
      imageUrl: "",
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then(console.log);
  }

  calculatFaceLocation = (data) => {
    const Face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("InputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: Face.left_col * width,
      topRow: Face.top_row * height,
      rightCol: width - Face.right_col * width,
      bottomRow: height - Face.bottom_row * height,
    };
  };

  SetBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(
        {
          id: "face-detection",
          name: "face-detection",
          version: "6dc7e46bc9124c5c8824be4822abe105",
          type: "visual-detector",
        },
        this.state.input
      )
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState(Object.assign(this.state.user, { entries: data })); // Using object assign so only entries are affected
            });
        }
        this.SetBox(this.calculatFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  routeChange = (route) => {
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOption} />
        {this.state.route === "home" ? ( //ternary operator
          <div>
            <Navigation routeChange={this.routeChange} reset={this.reset} />
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "SignIn" ? ( //ternary operator
          <SignIn routeChange={this.routeChange} loadUser={this.loadUser} />
        ) : (
          <Register routeChange={this.routeChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;
