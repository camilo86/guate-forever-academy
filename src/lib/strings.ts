export function getNameInitials(name: string | null | undefined, email = "") {
  console.log("name", name)
  console.log("email", email)

  if (!name) {
    if (email) {
      return getNameInitials(email)
    }

    return "U"
  }

  const [firstName, lastName] = name.toUpperCase().split(" ")

  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`
}
