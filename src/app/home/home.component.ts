import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product.service';
import { OrderService } from '@app/_services/order.service';
import { AccountService } from '@app/_services/account.service'; // Import AccountService
import { Role } from '@app/_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  totalProducts: number = 0;
  lowStockProducts: number = 0;
  totalOrders: number = 0;
  account: any; // User account details

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private accountService: AccountService // Inject AccountService
  ) {}

  ngOnInit(): void {
    this.account = this.accountService.accountValue; // Fetch logged-in user account details
    this.getProductsCount();
    this.getLowStockProducts();
    this.getOrdersCount();
  }

  getProductsCount() {
    this.productService.getProduct().subscribe(
      products => {
        this.totalProducts = products.length;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getLowStockProducts() {
    this.productService.getProduct().subscribe(
      products => {
        this.lowStockProducts = products.filter(product => Number(product.quantity) < 10).length;
      },
      error => {
        console.error('Error fetching low stock products:', error);
      }
    );
  }

  getOrdersCount() {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.totalOrders = orders.length;
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  isAdmin(): boolean {
    return this.account?.role === Role.Admin; // Check if the logged-in user is an Admin
  }
}
