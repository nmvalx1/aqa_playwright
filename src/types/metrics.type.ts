// интерфейсы делал gpt :)
export type ISODate = string;
export type ISODateOnly = string;
export interface DateParts {
  year: number;
  month: number;
  day: number;
}

export type OrderStatus =
  | "Draft"
  | "Pending"
  | "Paid"
  | "Shipped"
  | "Canceled"
  | string;
export type DeliveryCondition = "Pickup" | "Courier" | "Post" | string;

export interface Address {
  country: string;
  city: string;
  street: string;
  house: number;
  flat: number;
}

export interface Customer {
  _id: string;
  email: string;
  name: string;
  country: string;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  createdOn: ISODate;
  notes: string;
}

export interface ProductInOrder {
  _id: string;
  name: string;
  amount: number;
  price: number;
  manufacturer: string;
  received: boolean;
}

export interface Comment {
  _id: string;
  text: string;
  createdOn: ISODate;
}

export interface OrderHistoryItem {
  status: OrderStatus;
  customer: string;
  products: ProductInOrder[];
  total_price: number;
  action: string;
  changedOn: ISODate;
}

export interface DeliveryInfo {
  finalDate: ISODateOnly;
  condition: DeliveryCondition;
  address: Address;
}

export interface RecentOrder {
  _id: string;
  status: OrderStatus;
  customer: Customer;
  products: ProductInOrder[];
  total_price: number;
  createdOn: ISODate;
  delivery: DeliveryInfo;
  comments: Comment[];
  history: OrderHistoryItem[];
}

export interface OrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: RecentOrder[];
  ordersCountPerDay: {
    date: DateParts;
    count: number;
  }[];
}

export interface TopCustomer {
  customerName: string;
  customerEmail: string;
  totalSpent: number;
  ordersCount: number;
}

export interface CustomersMetrics {
  totalNewCustomers: number;
  topCustomers: TopCustomer[];
  customerGrowth: {
    date: DateParts;
    count: number;
  }[];
}

export interface TopProduct {
  name: string;
  sales: number;
}

export interface ProductsMetrics {
  topProducts: TopProduct[];
}

export interface Metrics {
  orders: OrdersMetrics;
  customers: CustomersMetrics;
  products: ProductsMetrics;
}

export interface IMetricsResponse {
  IsSuccess: boolean;
  Metrics: Metrics;
  ErrorMessage: string | null;
}
