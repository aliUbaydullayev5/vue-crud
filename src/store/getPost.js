export const getPost = {
  state: ()=> ({
    posts: [],
    types: [],
    loading: false,
    inputValue: '',
    selectValue: 'all'
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setType(state, types){
      state.types = types;
    },
    loadingFunc(state, {id, type}){
      state.posts = state.posts.map((value)=> ({
        ...value,
        [type]: value.id === id ? !value[type] : false
      }))
    }
  },
  actions: {
    changeValues({state, commit, dispatch}, payload){
      state[payload.type] = payload.value
    },
    async fetchPosts({commit}){
      try {
        const res = await fetch('http://94.158.54.194:9092/api/product')
          .then((res)=> res.json())
          .then((json)=> json.map((value)=> ({
            ...value,
            deleteLoading: false,
            editLoading: false,
            edit: false
          })))
        commit('setPosts', res)

        await fetch('http://94.158.54.194:9092/api/product/get-product-types')
          .then((res) => res.json()).then((json)=> commit('setType', json))
      }catch (e) {
        console.error(e)
      }
    },
    async deletePost({state, commit, dispatch}, payload){
      commit('loadingFunc', {id: payload, type: 'deleteLoading'})
      try {
        await fetch(`http://94.158.54.194:9092/api/product/${payload}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).finally(()=> {
          commit('loadingFunc', {id: payload, type: 'deleteLoading'})
          dispatch('fetchPosts')
        })
      }catch (e) {
        console.error(e)
      }
    },
    changeEdit({state, commit}, payload){
      commit('loadingFunc', {id: payload, type: 'edit'})
    },

    async changePost({state, commit, dispatch}, payload) {
      commit('loadingFunc', {id: payload.id, type: 'edit'})
      try {
        await fetch(`http://94.158.54.194:9092/api/product`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).finally(() => {
          commit('loadingFunc', {id: payload.id, type: 'edit'})
          dispatch('fetchPosts')
        })
      } catch (e) {
        console.error(e)
      }
    },
    async postUser({dispatch}, payload) {
      try {
        await fetch(`http://94.158.54.194:9092/api/product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product_type_id: payload.product_type_id,
            name_uz: payload.name_uz,
            cost: payload.cost,
            address: payload.address,
            created_date: (new Date()).toISOString()
          })
        }).finally(() => {
          dispatch('fetchPosts')
        })
      } catch (e) {
        console.error(e)
      }
    }
  },
}
