export const getProfileImage = (photoURL?: string) => {
  if (photoURL) {
    return { uri: photoURL }
  }
  return require("@/assets/images/defaultAvatar.png")
}