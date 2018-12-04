import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ToDo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  _ToDos: ToDo[];

  _form: FormGroup;
  _filter: string;
  _temp: ToDo;

  constructor(protected _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFormFields();
    this._ToDos = [];
  }

  initFormFields() {
    this._filter = 'all';

    this._form = this._formBuilder.group({
      description: [null, Validators.required]
    });
  }

  get dataTable() {
    let data = [];

    // Filter Data
    if (this._filter === 'onlyDone') {
      data = this._ToDos.filter(todo => todo.done === true);
    } else if (this._filter === 'noDone') {
      data = this._ToDos.filter(todo => todo.done === false);
    } else {
      data = this._ToDos;
    }
    return data;
  }

  addItem() {
    const { description } = this._form.value;

    if (this._temp) {
      this._temp = Object.assign(this._temp, { description });
    } else {
      this._temp = new ToDo(description);
      this._ToDos.push(this._temp);
    }

    this._temp = null;
    this._form.reset();
  }

  editItem(todo: ToDo) {
    this._temp = todo;
    this._form.setValue({ description: todo.description });
  }

  removeItem(item: ToDo) {
    const index = this._ToDos.indexOf(item);
    this._ToDos.splice(index, 1);
  }

  removeDones() {
    this._ToDos = this._ToDos.filter(todo => todo.done === false);
  }

  removeAll() {
    this._ToDos = [];
  }
}
