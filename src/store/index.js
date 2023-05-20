import {createStore} from "vuex"
import {getPost} from "src/store/getPost"

export default createStore({
  modules: {
    getPost: getPost
  }
})
