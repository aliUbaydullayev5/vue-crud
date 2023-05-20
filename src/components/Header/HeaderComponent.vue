<script>
import { Notify } from 'quasar';
import {onMounted, watch} from "vue"

export default {
  data(){
    return{
      userInfo: {
        product_type_id: '',
        name_uz: '',
        cost: '',
        address: '',
      },
      buttonDisabled: false,
      selectDefault: 'empty',
      filterSelect: 'all',
      filterInput: ''
    }
  },
  methods: {
    checkInputEmpty(){
      console.log(!this.userInfo.product_type_id.length)
      if(this.userInfo.product_type_id.length && this.userInfo.name_uz.length && this.userInfo.cost && this.userInfo.address.length){
        this.$store.dispatch('postUser', this.userInfo)
        this.buttonDisabled = false

        this.userInfo.product_type_id = ''
        this.userInfo.name_uz = ''
        this.userInfo.cost = ''
        this.userInfo.address = ''
        this.selectDefault = 'empty'
      }else{
        this.buttonDisabled = true
        setTimeout(()=> {
          this.buttonDisabled = false
        }, 1000)
      }
    }
  }
}
</script>

<template>
  <div class="headerMain">
    <div class="leftSection">
      <input type="text" placeholder="Name" v-model="userInfo.name_uz">
      <input type="number" placeholder="Cost" v-model="userInfo.cost">
      <input type="text" placeholder="Address" v-model="userInfo.address">
      <select v-model="selectDefault" @change="userInfo.product_type_id = $event.target.value">
        <option disabled :value="'empty'">Select value</option>
        <option v-for="item in $store.state.getPost.types" :key="item" :value="item.id">{{item.name_ru}}</option>
      </select>
      <q-btn color="blue" @click="checkInputEmpty" :disabled="buttonDisabled">
        Add User
      </q-btn>
    </div>
    <div class="rightSection">
      <input type="text" placeholder="Filter" @input="$store.dispatch('changeValues', {value: $event.target.value, type: 'inputValue'})">
      <select @change="$store.dispatch('changeValues', {value: $event.target.value, type: 'selectValue'})" >
        <option :value="'all'">All</option>
        <option v-for="item in $store.state.getPost.types" :key="item" :value="item.id">{{item.name_ru}}</option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style";
</style>
