'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // also get name, business_name etc. from form if needed
  const name = formData.get('name') as string
  const businessName = formData.get('business_name') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }
  
  if (data.user) {
    // Insert into clients table
    const { error: dbError } = await supabase.from('clients').insert({
      user_id: data.user.id,
      business_name: businessName,
      business_goal: formData.get('business_goal') || 'd2c',
    })
    
    if (dbError) {
      console.error('Error creating client:', dbError)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
