import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductModel } from '../models/product.model';
import sweetAlert from 'sweetalert';

declare var $: any;

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {
  p: number = 1;
  productObj = [];
  idProduct: number = 0;
  productModel: ProductModel
  indexUpdate: number;

  constructor() { }

  ngOnInit() {
    sweetAlert("Seja bem vindo(a)", "Olá! Espero que goste do que verá a seguir. Boa diversão!!\n Desenvolvido por Wagner Camargo Castilho.");

    // start a model
    this.productModel = new ProductModel;
  }

  /**
   * Add new product on the array object productObj
   * @author Wagner Camargo Castilho
   * 
   * @param obj object from ngForm - Required.
   */
  onSubmit(obj: NgForm) {
    this.idProduct++;
    let dateActual = new Date();
    this.productObj.push(
      {
        id: this.idProduct,
        name: obj.value.name,
        date: dateActual.toLocaleDateString("pt-BR"),
        value: obj.value.value
      });
    obj.resetForm();

    $('#modalAddProduct').modal('hide')

    sweetAlert("Cadastrado!", "Seu produto foi cadastrado com sucesso!", "success");
  }

  /**
   * Get index from obj and set a modal to show on modal update
   * @author Wagner Camargo Castilho
   * 
   * @param obj object from productObj - Required.
   */
  updateProductModel(obj: ProductModel) {
    // get index from obj to remove on the future
    this.indexUpdate = this.productObj.findIndex(f => f.id == obj.id);

    // set a model to show values on modal update
    this.productModel.id = obj.id;
    this.productModel.name = obj.name;
    this.productModel.date = obj.date;
    this.productModel.value = obj.value;
  }

  /**
   * Save the alterations of the update modal
   * @author Wagner Camargo Castilho
   * 
   * @param obj object from ngForm update modal - Required.
   */
  submitUpdate(obj: NgForm) {
    let dateActual = new Date();
    // de para - productObj
    this.productObj[this.indexUpdate].name = obj.value.name;
    this.productObj[this.indexUpdate].date = dateActual.toLocaleDateString("pt-BR");
    this.productObj[this.indexUpdate].value = obj.value.value;

    this.indexUpdate = null;

    // close modal
    $('#modalUpdateProduct').modal('hide')

    sweetAlert("Atualizado!", "Seu produto foi atualizado com sucesso!", "success");
  }

  /**
   * Delete a specify product
   * @author Wagner Camargo Castilho
   * 
   * @param id id from productObj - Required.
   */
  deleteProduct(id) {
    sweetAlert({
      title: "Você tem certeza?",
      text: "O produto selecionado será removido da lista!",
      icon: "warning",
      buttons: ["Não", "Sim"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          let indexDelete = this.productObj.findIndex(f => f.id == id);
          this.productObj.splice(indexDelete, 1);

          this.idProduct--;
          sweetAlert("Produto removido!", {
            icon: "success",
          });
        } else {
          sweetAlert("Produto não removido!");
        }
      });
  }

  /**
   * Delete all products who has marked on checkbox
   * @author Wagner Camargo Castilho
   * 
   */
  deleteAllProducts() {
    sweetAlert({
      title: "Você tem certeza?",
      text: "Os produtos selecionados serão removidos da lista!",
      icon: "warning",
      buttons: ["Não", "Sim"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.productObj = this.productObj.filter(f => f.state != true);
          sweetAlert("Os produtos foram removidos!", {
            icon: "success",
          });
        } else {
          sweetAlert("Os produtos não foram removidos!");
        }
      });
    
  }

  /**
   * Check all itens from table
   * @author Wagner Camargo Castilho
   * 
   * @param ev $event from iteration of table - Required.
   */
  checkAll(ev) {
    this.productObj.forEach(x => x.state = ev.target.checked)
  }

  /**
   * Check all checkbox from table
   * @author Wagner Camargo Castilho
   * 
   */
  isAllChecked() {
    if (this.productObj.length > 0) {
      return this.productObj.every(e => e.state);
    } else {
      return false;
    }
  }

}
