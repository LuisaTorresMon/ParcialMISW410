/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoffeeListComponent } from './coffee-list.component';
import { CoffeeService } from '../coffee.service';
import { of } from 'rxjs';
import { Coffee } from '../coffee';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('CoffeeListComponent', () => {
  let component: CoffeeListComponent;
  let fixture: ComponentFixture<CoffeeListComponent>;

  const mockData = [
    {
      id: 1,
      nombre: 'Café Especial para tí',
      tipo: 'Blend',
      region: 'Angelópolis, Antioquia',
      sabor: 'Panela, Durazno, Caramelo',
      altura: 1920,
      imagen:
        'https://cdn.shopify.com/s/files/1/0272/2873/3504/products/cafe-especial-para-ti-colores-cafe-colombiano-f_1_720x.jpg',
    },
    {
      id: 2,
      nombre: 'Café Especial Navegante',
      tipo: 'Café de Origen',
      region: 'Guatapé, Antioquia',
      sabor: 'Cítrico, Naranja, Cacao',
      altura: 1800,
      imagen:
        'https://cdn.shopify.com/s/files/1/0272/2873/3504/products/cafe-especial-navegante-cafe-colombiano-f_540x.png',
    },
    {
      id: 3,
      nombre: 'Café Especial El Prístino',
      tipo: 'Blend',
      region: 'Chinchiná, Caldas',
      sabor: 'Chocolate negro, Caramelo',
      altura: 1700,
      imagen:
        'https://cdn.shopify.com/s/files/1/0272/2873/3504/products/cafe-especial-pristino-1-cafe-colombiano-f_720x.png',
    },
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CoffeeListComponent],
      imports: [HttpClientTestingModule],
      providers: [CoffeeService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of coffees from the service', () => {
    const service = TestBed.inject(CoffeeService);
    spyOn(service, 'getCoffees').and.returnValue(of(mockData));
    component.getCoffees();
    expect(service.getCoffees).toHaveBeenCalled();
    expect(component.coffees.length).toBe(3);
    expect(component.coffees[0].nombre).toBe('Café Especial para tí');
    expect(component.coffees[1].nombre).toBe('Café Especial Navegante');
    expect(component.coffees[2].nombre).toBe('Café Especial El Prístino');
  });

  it('should count the number of blend and origin coffees', () => {
    const service = TestBed.inject(CoffeeService);
    spyOn(service, 'getCoffees').and.returnValue(of(mockData));
    component.getCoffees();
    expect(service.getCoffees).toHaveBeenCalled();
    expect(component.blend).toBe(2);
    expect(component.origen).toBe(1);
  });

  it('should start the counters with zero', () => {
    expect(component.blend).toBe(0);
    expect(component.origen).toBe(0);
  });

  it('should display a table with three rows plus header', async () => {
    const service = TestBed.inject(CoffeeService);
    spyOn(service, 'getCoffees').and.returnValue(of(mockData));
    await component.getCoffees();
    fixture.detectChanges();
    const tableRows = fixture.debugElement.queryAll(By.css('table tr'));
    expect(tableRows.length).toBe(4); // 3 rows + header
  });
});
