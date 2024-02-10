type User = {
  name: string,
  email: `${string|number}@${string|number}.${string}`,
  /** Date.prototype.toISOString */
  created: ReturnType<typeof Date.prototype.toISOString>,
  active: boolean
}
