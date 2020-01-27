import { Component, OnInit } from "@angular/core";

import { IconService } from "@ant-design/icons-angular";
import {
  InboxOutline,
  CalendarOutline,
  RightOutline,
  DownOutline,
  PlusOutline
} from "@ant-design/icons-angular/icons";

@Component({
  selector: "app-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.scss"]
})
export class LeftMenuComponent implements OnInit {
  constructor(private _iconService: IconService) {
    this._iconService.addIcon(
      ...[InboxOutline, CalendarOutline, RightOutline, DownOutline, PlusOutline]
    );
  }
  ngOnInit() {}
}
