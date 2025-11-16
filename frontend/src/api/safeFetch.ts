export async function safeFetch(url: string, options: any = {}) {
  try {
    const raw = await fetch(url, options);

    if (!raw.ok) {
      return { error: `HTTP ${raw.status}`, data: null };
    }

    const data = await raw.json();
    return { error: null, data };

  } catch (e: any) {
    return { error: e.message, data: null };
  }
}
