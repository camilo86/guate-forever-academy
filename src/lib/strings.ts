export function getNameInitials(name: string | null | undefined) {
  if (!name) return ""

  const [firstName, lastName] = name.toUpperCase().split(" ")

  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`
}
