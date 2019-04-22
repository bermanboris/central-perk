export interface OrderRequest {
  name: string;
  phone: string;
  address: string;
}

export interface TaskRequest {
  name: string;
  phone: string;
  address: string;
}

export interface CustomerResponse {
  success: boolean;
  customer: Customer;
}

export interface Customer {
  id: number;
  name: string;
  address: string;
  address_second_line?: any;
  zipcode?: any;
  borough?: any;
  city?: any;
  state?: any;
  district?: any;
  lat: number;
  lng: number;
  phone?: any;
  image: string;
  email?: any;
  company_id: number;
  external_id: string;
  confirmation_code: string;
  language?: any;
  house_number?: any;
  street?: any;
  address_type?: any;
}

export interface Task {
  active_way_point_id: number;
  address?: any;
  asap: boolean;
  cancelled_at?: any;
  company_name?: any;
  created_at: string;
  customer: Customer;
  delivery_price?: any;
  discount?: any;
  distance_traveled?: any;
  ended_time?: any;
  external_id: string;
  extras?: any;
  id: number;
  lat?: any;
  late: boolean;
  late_reason?: any;
  left_to_be_paid?: any;
  lng?: any;
  priority: number;
  scheduled_at?: any;
  shared_locations: any[];
  started_time?: any;
  status: number;
  tag_id: number;
  task_inventories: any[];
  task_notes: any[];
  team_ids: any[];
  tip_driver_enabled: boolean;
  title: string;
  total_price?: any;
  user?: any;
  user_id?: any;
  uuid: string;
  way_points: Waypoint[];
}

export interface Waypoint {
  address?: any;
  address_second_line?: any;
  address_type?: any;
  asap: boolean;
  automatic_checkin: boolean;
  automatic_checkout: boolean;
  borough?: any;
  checkin_lat?: any;
  checkin_lng?: any;
  checkin_time?: any;
  checkout_lat?: any;
  checkout_lng?: any;
  checkout_time?: any;
  city?: any;
  company_name?: any;
  customer: Customer;
  customer_id: number;
  done: boolean;
  eta?: any;
  etl?: any;
  find_me: boolean;
  has_to_leave_by?: any;
  id: number;
  lat?: any;
  late: boolean;
  lng?: any;
  location_name?: any;
  no_earlier_than?: any;
  no_later_than?: any;
  note?: any;
  phone: string;
  position: number;
  rating?: any;
  scans: any[];
  scheduled_at?: any;
  silent: boolean;
  state?: any;
  task_id: number;
  zipcode?: any;
}

export interface TaskResponse {
  success: boolean;
  task: Task;
}

export type Payload = {
  [key: string]: any;
};

export type SignedPayload = Payload & {
  timestamp: number;
  access_token?: string;
  signature?: string;
};
