export async function onRequestPost(context: any) {
  const { request, env } = context
  
  try {
    const { name, email, business, message } = await request.json()
    
    // Validate required fields
    if (!name || !email || !business || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Harap isi semua kolom formulir.' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
    
    // Check for Resend API Key in Cloudflare Environment Variables
    const resendApiKey = env.RESEND_API_KEY
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not defined in Cloudflare Pages dashboard variables.')
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Kunci API email server belum dikonfigurasi. Harap hubungi administrator.' 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
    
    // Dispatch request to Resend API using standard Fetch
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'WeeCommerce Contact Form <onboarding@resend.dev>',
        to: 'alifnugraha.studio@gmail.com',
        subject: `Pesan Baru dari ${business} (${name})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 8px;">
            <h2 style="color: #e54a22; border-bottom: 2px solid #e54a22; padding-bottom: 8px; margin-bottom: 20px;">Pertanyaan Proyek E-Commerce Baru</h2>
            <p style="font-size: 14px; color: #334155; margin-bottom: 10px;"><strong>Nama Pengirim:</strong> ${name}</p>
            <p style="font-size: 14px; color: #334155; margin-bottom: 10px;"><strong>Alamat Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="font-size: 14px; color: #334155; margin-bottom: 10px;"><strong>Nama Brand / Bisnis:</strong> ${business}</p>
            <p style="font-size: 14px; color: #334155; margin-bottom: 6px;"><strong>Isi Pesan:</strong></p>
            <div style="background-color: #f8fafc; border-left: 4px solid #e54a22; padding: 15px; margin: 10px 0; color: #334155; font-size: 14px; line-height: 1.6; border-radius: 4px;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 30px; margin-bottom: 20px;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center;">Terkirim secara otomatis melalui Cloudflare Pages Functions & Resend API.</p>
          </div>
        `
      })
    })
    
    const emailResult = await emailResponse.json() as any
    if (emailResponse.ok) {
      return new Response(JSON.stringify({ success: true, id: emailResult.id }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    } else {
      return new Response(JSON.stringify({ success: false, message: emailResult.message || 'Gagal mengirim email.' }), {
        status: emailResponse.status,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
