import dotenv from 'dotenv';
dotenv.config();

console.log('VITE_SUPABASE_URL length:', process.env.VITE_SUPABASE_URL?.length);
console.log('VITE_SUPABASE_ANON_KEY length:', process.env.VITE_SUPABASE_ANON_KEY?.length);
console.log('SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length);
console.log('SUPABASE_JWT_SECRET length:', process.env.SUPABASE_JWT_SECRET?.length);
console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length);
