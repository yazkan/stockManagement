import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormModal from './components/FormModal.js';
import Figure from 'react-bootstrap/Figure';
import UpdateModal from './components/UpdateModal';


class App extends Component {
  constructor(){
    super();
    
    this.state = {
      productsArr : []
    };
  }



  componentDidMount() {
    this.props.socket.on("createout", productArray => {
      //başta ürün listesinin çekilmesi
      this.setState({productsArr : productArray});
    });

    this.props.socket.on("startout", productArray => {
      //create işleminden sonra yeni ürün listesinin çekilmesi
      this.setState({productsArr : productArray});
    });

    this.props.socket.on("updateout", productArray => {
      this.setState({productsArr : productArray});

    });

    this.props.socket.on("deleteout", productArray => {
      this.setState({productsArr : productArray});
    });
  }


  render(){
    return (
      <div className="App">
        <p>STOK YÖNETİM VE TAKİP PANELİ</p>

        <FormModal socket = {this.props.socket}></FormModal>
        <br></br>
        {this.state.productsArr.map((product) => {
          return <UpdateModal key={product.id} product = {product} socket = {this.props.socket}><Figure>
          <Figure.Image 
            width={171}
            height={180}
            alt="171x180 Image"
            src= {product.img}
          />
          <Figure.Caption>
            ID: {product.id}
            <br></br>
            Name: {product.name}
            <br></br>
            Price: {product.price}
            <br></br>
            Category: {product.category}
          </Figure.Caption>
        </Figure></UpdateModal>
        })}
      </div>
  )}
}


export default App;
