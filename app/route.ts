
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const token = process.env.SUPERFRETE_TOKEN;
  const apiUrl = process.env.SUPERFRETE_API_URL;

  if (!token || !apiUrl) {
    return NextResponse.json(
      { error: "Configuração do frete ausente." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const cepDestino = String(body?.to?.postal_code ?? "")
      .replace(/\D/g, "");

    if (!/^\d{8}$/.test(cepDestino)) {
      return NextResponse.json(
        { error: "Informe um CEP de destino válido." },
        { status: 400 }
      );
    }

    if (!Array.isArray(body?.products) || body.products.length === 0) {
      return NextResponse.json(
        { error: "Informe os produtos e suas dimensões." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${apiUrl.replace(/\/+$/, "")}/api/v0/calculator`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "Encantarts-Ecommerce (contato@encantarts.com.br)",
        },
        body: JSON.stringify({
          ...body,
          from: { postal_code: "06810480" },
          to: { ...body.to, postal_code: cepDestino },
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "A SuperFrete não conseguiu calcular o frete." },
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Não foi possível consultar o frete." },
      { status: 500 }
    );
  }
}
