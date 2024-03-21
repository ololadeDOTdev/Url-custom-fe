import { getToken } from "./localStorage";

export async function apiHandler({
  path,
  method = "GET",
  body,
}: {
  path: string;
  method?: string;
  body?: object;
}) {
  try {
    console.log(getToken());
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      throw Error("Failed with status " + response.status);
    }

    const resData = await response.json();

    return {
      error: null,
      data: resData,
    };
  } catch (err: unknown) {
    console.log((err as Error).message);
    return {
      error: (err as Error).message,
      data: null,
    };
  }
}


export function parseShortenedLink(shortenedLink : string) {
  return `${import.meta.env.VITE_API_URL}/${shortenedLink}`
}