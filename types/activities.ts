export interface Activity {
  id: string;
  user: string;             
  action: string;           
  entity: string;           
  entityId?: string | null; 
  message: string;          
  meta?: Record<string, any> | null; 
  createdAt: string;        
}
