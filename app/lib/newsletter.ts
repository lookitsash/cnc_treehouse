const BASE_URL = "https://treehousechallenge.contractornation.com";

export type Subscriber = {
  id: string;
  name: string;
  email: string;
  created_on: string;
};

async function request(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: process.env.API_KEY ?? "",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`${init?.method ?? "GET"} ${path} failed with ${res.status}`);
  }

  return res;
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const res = await request("/newsletter");
  const subscribers: Subscriber[] = await res.json();

  return subscribers.sort(
    (a, b) => Date.parse(b.created_on) - Date.parse(a.created_on)
  );
}

export async function createSubscriber(name: string, email: string) {
  await request("/newsletter", {
    method: "POST",
    body: JSON.stringify({ name, email }),
  });
}

export async function deleteSubscriber(id: string) {
  await request(`/newsletter/${id}`, { method: "DELETE" });
}
