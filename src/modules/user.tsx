/**
 * Set or update the user's name
 * @param username Name of the user
 * @returns An empty promise
 */
export function updateUser(username: string): Promise<void> {
  return fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({ username }),
  }).then(() => undefined);
}
