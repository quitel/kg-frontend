const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // payload: state => state.app.payload,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
