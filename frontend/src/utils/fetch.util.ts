/**
 * Utility function for making GET requests.
 * @param url
 */
export async function fetchGetRequest(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Request failed with status code ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
