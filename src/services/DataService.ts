import { createClient } from '@supabase/supabase-js';

// Supabase configuration - these are automatically available in Lovable projects
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Data types for our application
export interface BusinessData {
  id: string;
  business_name: string;
  business_description: string;
  business_location: string;
  logo_url?: string;
  theme: string;
  website_url: string;
  qr_code_data: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerMessage {
  id: string;
  business_id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface EmailSubscriber {
  id: string;
  business_id: string;
  email: string;
  name?: string;
  subscribed_at: string;
}

export interface EmailCampaign {
  id: string;
  business_id: string;
  subject: string;
  content: string;
  sent_to_count: number;
  created_at: string;
  sent_at?: string;
}

// Business Data Service
export class BusinessDataService {
  static async createBusiness(businessData: Omit<BusinessData, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('businesses')
      .insert([businessData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getBusiness(id: string) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateBusiness(id: string, updates: Partial<BusinessData>) {
    const { data, error } = await supabase
      .from('businesses')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}

// Products Service
export class ProductsService {
  static async getProducts(businessId: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}

// Messages Service
export class MessagesService {
  static async getMessages(businessId: string) {
    const { data, error } = await supabase
      .from('customer_messages')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async createMessage(message: Omit<CustomerMessage, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('customer_messages')
      .insert([message])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async markAsRead(id: string) {
    const { data, error } = await supabase
      .from('customer_messages')
      .update({ read: true })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}

// Email Service
export class EmailService {
  static async getSubscribers(businessId: string) {
    const { data, error } = await supabase
      .from('email_subscribers')
      .select('*')
      .eq('business_id', businessId)
      .order('subscribed_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async addSubscriber(subscriber: Omit<EmailSubscriber, 'id' | 'subscribed_at'>) {
    const { data, error } = await supabase
      .from('email_subscribers')
      .insert([{ ...subscriber, subscribed_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async sendCampaign(campaign: Omit<EmailCampaign, 'id' | 'created_at' | 'sent_at'>) {
    // First, save the campaign
    const { data, error } = await supabase
      .from('email_campaigns')
      .insert([{ 
        ...campaign, 
        created_at: new Date().toISOString(),
        sent_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;

    // In a real application, you would integrate with an email service provider here
    // For now, we'll just store the campaign data
    return data;
  }

  static async getCampaigns(businessId: string) {
    const { data, error } = await supabase
      .from('email_campaigns')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
}

// File Storage Service
export class StorageService {
  static async uploadFile(bucket: string, file: File, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    
    if (error) throw error;
    return data;
  }

  static async getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }

  static async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) throw error;
  }
}