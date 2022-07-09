import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal } from 'bootstrap'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      products: [
        { 
          id: 13445, name: "Miracuolus Refining Toner", brand: "Avoskin", price: 109900, stock: 12, 
          image: "https://www.soco.id/cdn-cgi/image/w=150,format=auto,dpr=1.45/https://images.soco.id/3f794f71-4ed0-4262-a13b-cfb82bd280b2-image-0-1627354259406", 
          detail: "Toner eksfoliasi dari Avoskin yang memiliki kandungan AHA-BHA-PHA-PGA yang dipadukan dengan Niacinamide, Tea Tree 2%, Witch Hazel, dan Aloe Vera. "
        },
        { 
          id: 21334, name: "Acne Spot Serum", brand: "Azarine", price: 29900, stock: 15, 
          image: "https://www.soco.id/cdn-cgi/image/w=150,format=auto,dpr=1.45/https://images.soco.id/ca5f02e7-b97e-4819-99a8-818ea279b0a6-.jpg",
          detail: "Serum totol jerawat dengan dual action untuk mengeringkan jerawat dalam 2 hari dan memudarkan bekasnya (PIE/PIH)"
        },
        { 
          id: 31245, name: "Double Gentle Skin Cleanser", brand: "Cetaphil", price: 459000, stock: 2, 
          image: "https://www.soco.id/cdn-cgi/image/w=150,format=auto,dpr=1.45/https://images.soco.id/e89cf14b-575a-4f8d-a246-e3b2f9579434-.jpg",
          detail: "Pembersih yang paling laris dan disukai banyak orang, formulanya hypoallergenic yang lembut dan efektif. Membersihkan sekaligus melembapkan."
        },
      ],
      action: "",
      id: 0,
      name: "",
      brand: "",
      price: 0,
      stock: 0,
      image: "",
      detail: "",
      selectedItem: null
    }
  }
  addProduct() {
    this.modalProduct = new Modal(document.getElementById("product-modal"))
    this.modalProduct.show()
    this.setState({
      id: Math.floor((Math.random() * 100000) + 1),
      name: "",
      brand: "",
      price: 0,
      stock: 0,
      image: "",
      detail: "",
      action: "insert"
    })
  }
  editProduct(item) {
    this.modalProduct = new Modal(document.getElementById("product-modal"))
    this.modalProduct.show()
    this.setState({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      stock: item.stock,
      image: item.image,
      detail: item.detail,
      action: "update",
      selectedItem: item
    })
  }
  saveProduct(event) {
    event.preventDefault()

    this.modalProduct.hide()

    let tempProduct = this.state.products

    if (this.state.action === "insert") {
      tempProduct.push({
        id: this.state.id,
        name: this.state.name,
        brand: this.state.brand,
        price: this.state.price,
        stock: this.state.stock,
        image: this.state.image,
        detail: this.state.detail,
      })
    } else if (this.state.action === "update") {
      let index = tempProduct.indexOf(this.state.selectedItem)
      tempProduct[index].id = this.state.id
      tempProduct[index].name = this.state.name
      tempProduct[index].brand = this.state.brand
      tempProduct[index].price = this.state.price
      tempProduct[index].stock = this.state.stock
      tempProduct[index].image = this.state.image
      tempProduct[index].detail = this.state.detail
    }
    this.setState({ products: tempProduct })
    console.log(this.state.products)
  }
  deleteProduct(item) {
    if (window.confirm("Do you want to delete this data? ")) {
      let tempProduct = this.state.products
      let index = tempProduct.indexOf(item)

      tempProduct.splice(index, 1)
      this.setState({ products: tempProduct })
    }
  }
  viewProduct(item) {
    this.modalProduct = new Modal(document.getElementById("product-view"))
    this.modalProduct.show()
    this.setState({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      stock: item.stock,
      image: item.image,
      detail: item.detail,
      action: "update",
      selectedItem: item
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="d-flex justify-content-between mb-3">
            <h2>Our Product</h2>
            <button className="btn btn-success col-lg-2 col-sm-6" onClick={() => this.addProduct()}>+ Product</button>
          </div>
          {this.state.products.map(item => (
            <div className="col-lg-3 mt-4">
              <div className="card">
                <div className="card-body text-center">
                  <img src={item.image} width="130"></img>
                  <div className="desc mt-5" style={{ textAlign: "left" }}>
                    <h5>{item.brand}</h5>
                    <h4>{item.name}</h4>
                    <h3>Rp.{item.price}</h3>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <button className="btn btn-primary btn-sm text-white" onClick={() => this.viewProduct(item)}>View</button>
                    <button className="btn btn-warning btn-sm text-white mx-1" onClick={() => this.editProduct(item)}>Edit</button>
                    <button className="btn btn-danger btn-sm text-white" onClick={() => this.deleteProduct(item)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div class="modal fade" id="product-modal" tabindex="-1" aria-labelledby="product-modal-label" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="product-modal-label">Prodact Form</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form onSubmit={ev => this.saveProduct(ev)}>
                  <div class="mb-3">
                    <label for="product-name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="product-name" value={this.state.name} onChange={ev => this.setState({ name: ev.target.value })} />
                  </div>
                  <div className="row mb-3">
                    <div class="col-lg-4">
                      <label for="product-brand" class="form-label">Brand</label>
                      <input type="text" class="form-control" id="product-brand" value={this.state.brand} onChange={ev => this.setState({ brand: ev.target.value })} />
                    </div>
                    <div class="col-lg-4">
                      <label for="product-price" class="form-label">Price</label>
                      <input type="number" class="form-control" id="product-price" value={this.state.price} onChange={ev => this.setState({ price: ev.target.value })} />
                    </div>
                    <div class="col-lg-4">
                      <label for="product-stock" class="form-label">Stock</label>
                      <input type="number" class="form-control" id="product-stock" value={this.state.stock} onChange={ev => this.setState({ stock: ev.target.value })} />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="detail-product">Detail</label>
                    <textarea class="form-control" placeholder="" id="detail-product" style={{height: "80px"}} value={this.state.detail} onChange={ev => this.setState({ detail: ev.target.value })}></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="product-image" class="form-label">Image</label>
                    <input type="url" class="form-control" id="product-image" aria-describedby="image-desc" value={this.state.image} onChange={ev => this.setState({ image: ev.target.value })} />
                    <div id="image-desc" class="form-text text-danger"><i> Please input url image</i></div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary mx-2">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="product-view" tabindex="-1" aria-labelledby="product-modal-label" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="product-modal-label">Prodact Detail</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body detail-product p-5">
                <div className="row">
                  <div className="col-lg-4 text-center py-3">
                    <img src={this.state.image} width="200"></img>
                  </div>
                  <div className="col-lg-8">
                    <h6>{this.state.brand}</h6>
                    <h5>{this.state.name}</h5>
                    <div className="row" style={{fontWeight: "400", fontSize: "18px", color: "#bebebe"}}>
                      <span className="col-lg-3 col-sm-4">Rp.{this.state.price}</span>
                      <span className="col-lg-4 col-sm-4">stock : {this.state.stock}</span>
                    </div>
                    <p className="mt-4 text-secondary">{this.state.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
