import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edeujowjwioldzdgyoqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZXVqb3dqd2lvbGR6ZGd5b3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NzY1OTUsImV4cCI6MjA2MjA1MjU5NX0.tgTdVhkorE7SEOhrQfHURmeA4hGqSc86K3I1_CavUpU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 