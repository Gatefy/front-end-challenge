import { Component, OnInit } from "@angular/core";

import { IconService } from "@ant-design/icons-angular";
import {
  SearchOutline,
  PlusCircleOutline,
  SettingOutline,
  BellOutline
} from "@ant-design/icons-angular/icons";

import { TodoService } from "../todo/services/todo.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private _iconService: IconService
  ) {
    this._iconService.addIcon(
      ...[SearchOutline, PlusCircleOutline, SettingOutline, BellOutline]
    );
  }
  totalTasks: number;

  ngOnInit() {
    this.totalQuantity();
  }

  totalQuantity() {
    this.totalTasks = this.todoService.totalTasks();
  }
}
