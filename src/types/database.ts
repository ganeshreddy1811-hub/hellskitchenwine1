export interface Customer {
  id: string;
  first_name: string;
  phone: string;
  points: number;
  previous_points: number;
  recently_redeemed: boolean;
  opted_out: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  customer_id: string | null;
  phone: string;
  message_body: string;
  status: 'pending' | 'sent' | 'failed' | 'skipped';
  twilio_sid: string | null;
  error_message: string | null;
  sent_at: string | null;
  created_at: string;
}

export interface Settings {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}
