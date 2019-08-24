import { Tarefa } from './../shared/tarefas.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  listaTarefas : Tarefa[] = [];
  editando : boolean = false;
  editandoIndex : number;
  tarefa : string = '';
  selectedAll = false;
  filtroMostrar = null;

  constructor() { }

  ngOnInit() {
  }

  selecionarTodos() {
    this.selectedAll = !this.selectedAll;
    this.listaTarefas.forEach(element => {
      element.selected = this.selectedAll;
    });
  }

  filtrar(filtro : any) {
    this.filtroMostrar = filtro;
  }

  onComplete(index : number) {
    this.listaTarefas[index].ativa = false;
    this.editandoIndex = index;
  }

  onEdit(index : number) {
    this.editando = true;
    this.tarefa = this.listaTarefas[index].descricao;
    this.editandoIndex = index;
  }

  onDelete(index : number) {
    this.listaTarefas.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.editando) {
      this.editando = !this.editando;
      this.listaTarefas[this.editandoIndex].descricao = value.tarefa;
    } else {
      this.listaTarefas.push(new Tarefa(this.listaTarefas.length + 1, value.tarefa, true, false));
    }
    form.resetForm();
  }

  excluir() {
    this.listaTarefas.forEach((element, index) => {
      if (element.selected)
        this.listaTarefas.splice(index, 1);
    });
  }

  excluirTodos() {
    this.listaTarefas = [];
  }

  selecionarLinha(index : number) {
    this.listaTarefas[index].selected = !this.listaTarefas[index].selected;
  }
}
