import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { messages, systemPrompt } = await request.json()

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Missing Anthropic API Key in environment variables.' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      })
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error('Anthropic API Error:', errorData)
      return NextResponse.json({ error: 'Failed to fetch from AI provider' }, { status: 500 })
    }

    const data = await res.json()
    const reply = data.content.filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n').trim()

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Proxy Chat Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
