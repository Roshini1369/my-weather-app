export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json({ error: "City is required" }, { status: 400 });
  }

  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "API key missing" }, { status: 500 });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  return Response.json(data);
}
