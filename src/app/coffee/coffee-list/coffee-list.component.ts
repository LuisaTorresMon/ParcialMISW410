import { Component, OnInit } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeService } from '../coffee.service';

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})
export class CoffeeListComponent implements OnInit {

  coffees: Array<Coffee> = [];
  origen: number = 0;
  blend: number = 0;

  constructor(private coffeeService: CoffeeService) { }

  ngOnInit() {
    this.getCoffees();
  }

  getCoffees(): void {
    this.coffeeService.getCoffees().subscribe((coffees) => {
      this.coffees = coffees;
      for (let elemento of this.coffees){
        if(elemento['tipo'] == 'Blend'){
          this.blend++;
        }
        if(elemento['tipo'] == 'Café de Origen'){
          this.origen++;
        }
      }
    });
  }

}
