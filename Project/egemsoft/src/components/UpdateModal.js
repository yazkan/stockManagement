import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import React from 'react';
import Form from 'react-bootstrap/Form';

export default class FormModal extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        show: false,
        product: this.props.product,
        reqInfo: ""
      }

    }
  
    handleClose = () => this.setState({show:false});
    handleDelete = () => {
        this.props.socket.emit("delete", this.state.product);

        this.setState({show:false});
    }
    handleUpdate = () => {
      //güncellenen ürünü socket ile servere gönder
        if(this.state.product.name === undefined || this.state.product.price === undefined || 
          this.state.product.name === "" || this.state.product.price === ""){
          this.setState({reqInfo:"**Ürün adı ve Fiyat bilgisi zorunludur."});
        }
        else{
          this.setState({show:false});
          this.props.socket.emit("update", this.state.product);
        }
    }

    handleShow = () => {
      this.setState({reqInfo:""});
      this.setState({show:true});
      this.setState({product: this.props.product});
    }
  
    render(){
      return (
        <>
            {this.props.children}
            <Button variant="info" onClick={this.handleShow}>Düzenle</Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Ürün Güncelle</Modal.Title>
            </Modal.Header>
            <p style={{color:"red"}}>{this.state.reqInfo}</p>
            <Modal.Body>Ürün Bilgileri</Modal.Body>
            <p>Ürünün Adı: </p>
            <Form.Control type="text" 
            placeholder={"Ürünün Adı"} 
            value={this.state.product.name} 
            onChange={e => this.setState(prevState => {
                let newproduct = Object.assign({},prevState.product);
                newproduct.name = e.target.value;
                return({product:newproduct});
            })}/>
            <br></br>
            <p>Ürünün Fiyatı: </p>
            <Form.Control type="number" 
            placeholder="Ürünün Fiyatı" 
            value={this.state.product.price} 
            onChange={e => this.setState(prevState => {
                let newproduct = Object.assign({},prevState.product);
                newproduct.price = e.target.value;
                return({product:newproduct});
            })}/>
            <br></br>
            <p>Resim Bağlantısı: </p>
            <Form.Control type="text" 
            placeholder="Resim Bağlantısı" 
            value={this.state.product.img} 
            onChange={e => this.setState(prevState => {
                let newproduct = Object.assign({},prevState.product);
                newproduct.img = e.target.value;
                return({product:newproduct});
            })}/>
            <br></br>
            <p>Kategori: </p>
            <Form.Control type="text" 
            placeholder="Kategori" 
            value={this.state.product.category} 
            onChange={e => this.setState(prevState => {
                let newproduct = Object.assign({},prevState.product);
                newproduct.category = e.target.value;
                return({product:newproduct});
            })}/>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleUpdate}>
                Güncelle
              </Button>
              <Button variant="danger" onClick={this.handleDelete}>
                Sil
              </Button>
            </Modal.Footer>
          </Modal>
          <br></br>
        </>
      );
    }
}