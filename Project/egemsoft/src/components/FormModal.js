import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import React from 'react';
import Form from 'react-bootstrap/Form';

export default class FormModal extends React.Component {
    constructor(){
      super();
      this.state = { 
        show: false,
        reqInfo: "",
        product: {}
      }

    }
  
    handleClose = () => this.setState({show:false});
    handleSave = () => {
      //oluşturulan ürünü socket ile servere gönder
      var temp = {
        name: this.state.product.name,
        price: this.state.product.price,
        img: this.state.product.img,
        category: this.state.product.category
      };

      //resim alanı boş bırakılmışsa default resim eklenir
      if(this.state.product.img === undefined || this.state.product.img === "")
        temp.img = "https://www.softwarearge.com/wp-content/uploads/2018/09/no-image-icon-6.png";
      
      if(this.state.product.category === undefined)
        temp.category = "";
      
      if(this.state.product.name === undefined || this.state.product.price === undefined || 
        this.state.product.name === "" || this.state.product.price === ""){
        this.setState({reqInfo:"**Ürün adı ve Fiyat bilgisi zorunludur."});
      }
      else{
        this.setState({show:false});
        this.props.socket.emit("create", temp);
      }
    }

    handleShow = () => {
      this.setState({product: {}});
      this.setState({show:true});
      this.setState({reqInfo: ""});
    }
  
    render(){
      return (
        <>
          <Button variant="danger" onClick={this.handleShow}>Ürün Ekle</Button>
    
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ürün Oluştur</Modal.Title>
            </Modal.Header>
            <p style={{color:"red"}}>{this.state.reqInfo}</p>
            <Modal.Body>ÜRÜN BİLGİLERİ</Modal.Body>
            <p>Ürün Adı: </p>
            <Form.Control type="text" placeholder="Ürün Adı" value={this.state.name} onChange={e => this.setState(prevState => {
                let newproduct = Object.assign({},prevState.product);
                newproduct.name = e.target.value;
                return({product:newproduct});
            })}/>
            <br></br>
            <p>Ürünün Fiyatı: </p>
            <Form.Control type="number" placeholder="Ürünün Fiyatı" value={this.state.price} onChange={e => this.setState(prevState => {
                let newproduct = Object.assign({},prevState.product);
                newproduct.price = e.target.value;
                return({product:newproduct});
            })}/>
            <br></br>
            <p>Resim Bağlantısı: </p>
            <Form.Control type="text" placeholder="Resim Bağlantısı" value={this.state.img} onChange={e => this.setState(prevState => {
                let newproduct = Object.assign({},prevState.product);
                newproduct.img = e.target.value;
                return({product:newproduct});
            })}/>
            <br></br>
            <p>Kategori: </p>
            <Form.Control type="text" placeholder="Kategori" value={this.state.category} onChange={e => this.setState(prevState => {
                let newproduct = Object.assign({},prevState.product);
                newproduct.category = e.target.value;
                return({product:newproduct});
            })}/>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleSave}>
                Ekle
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Kapat
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
}