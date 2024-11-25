import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product.service';
import { OrderService } from '@app/_services/order.service';
import { Role } from '@app/_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  totalProducts: number = 0;
  lowStockProducts: number = 0;
  totalOrders: number = 0;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getProductsCount();
    this.getLowStockProducts();
    this.getOrdersCount();
  }

  getProductsCount() {
    this.productService.getProduct().subscribe(products => {
      this.totalProducts = products.length;  // Or use another logic to count products
    });
  }

  getLowStockProducts() {
    this.productService.getProduct().subscribe(products => {
      // Ensure quantity is treated as a number and filter products with low stock
      this.lowStockProducts = products.filter(product => {
        return Number(product.quantity) < 10;  // Convert to number before comparison
      }).length;  // Count the number of low stock products
    });
  }

  getOrdersCount() {
    this.orderService.getAllOrders().subscribe(orders => {
      this.totalOrders = orders.length;  // Total number of orders
    });
  }

  isAdmin(): boolean {
    // Logic to check if the user is admin
    return true;  // This should be based on your user authentication logic
  }
}
