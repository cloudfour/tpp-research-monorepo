import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  selectedColor = "Cloud Blue";

  colors = [
    { hex: "#215cca", name: "Cloud Blue", id: "123" },
    { hex: "#158466", name: "PNW Green", id: "124" },
    { hex: "#d9118f", name: "PWA Pink", id: "125" },
    { hex: "#f27041", name: "Orange", id: "126" },
    { hex: "#485968", name: "Grey", id: "127" },
  ];

  changeColor(e) {
    this.selectedColor = e.detail.name;
  }
}
