export async function safeFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        error: `Request failed (${response.status})`,
        data: null
      };
    }

    return {
      error: null,
      data: await response.json()
    };

  } catch (err: any) {
    return {
      error: err.message ?? "Unknown network error",
      data: null
    };
  }
}
