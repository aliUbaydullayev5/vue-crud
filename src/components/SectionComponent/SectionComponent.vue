<script>
export default {
  data(){
    return {
      id: '',
      product_type_id: '',
      name_uz: '',
      cost: '',
      address: '',
      created_date: ''
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    idOfItem: {
      type: [String, Number],
      required: true
    },
    filterValue: {
      type: String
    },
    filterSelect: {
      type: String
    },
  },
  computed: {
    formattedDateTime() {
      const dateTime = new Date(this?.item?.created_date);
      const options = {
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(dateTime);
    },
  },
  methods: {
    changeFunc(value){
        this.id = value.id
        this.product_type_id = value.product_type_id
        this.name_uz = value.name_uz
        this.cost = value.cost
        this.address = value.address
        this.created_date = value.created_date
      this.$store.dispatch('changeEdit', value.id)
    }
  }
}
</script>

<template>
  <div class="main" v-if="idOfItem === 0">
    <p class="id title">%</p>
    <p class="name title">Name</p>
    <p class="cost title">Cost</p>
    <p class="address title">Address</p>
    <p class="date title">Date</p>
    <p class="title">Edit / Delete</p>
  </div>

  <div class="main" v-if="
  (item.name_uz.includes($store.state.getPost.inputValue) ||
  item.address.includes($store.state.getPost.inputValue) ||
  (item.cost + '').includes($store.state.getPost.inputValue)) &&
  ((item.product_type_id + '') === ($store.state.getPost.selectValue + '')
  ||
  'all' === ($store.state.getPost.selectValue + ''))
">
    <p class="id">{{idOfItem}}</p>
    <input type="text"
           v-if="item?.edit"
           v-model="name_uz"
    >
    <p class="name"
       v-if="!item?.edit"
    >
      {{item?.name_uz}}
    </p>


    <input
      type="number"
      v-if="item?.edit"
      v-model="cost"
    >
    <p
      class="cost"
      v-if="!item?.edit">
      {{item?.cost}}
    </p>

    <input
      type="text"
      v-if="item?.edit"
      v-model="address"
    >
    <p
      class="address"
      v-if="!item?.edit"
    >
      {{item?.address}}
    </p>

    <p class="date">{{ formattedDateTime }}</p>

    <div class="buttons">
      <q-btn
        color="primary"
        v-if="!item.editLoading && !item.edit"
        @click="()=> changeFunc(item)"
      >
        Edit
      </q-btn>
      <q-btn color="primary" disable v-if="item.editLoading && !item.edit">
        <div>
          <q-spinner-ios
            color="white"
            size="30px"
          />
        </div>
      </q-btn>

      <q-btn
        color="primary"
        v-if="item.edit"
        @click="()=> $store.dispatch('changePost', {
          id,
          product_type_id,
          name_uz,
          cost,
          address,
          created_date
        })"
      >
        OK
      </q-btn>



      <q-btn color="red" @click="$store.dispatch('deletePost', item.id)" v-if="!item.deleteLoading && !item.edit">
        Delete
      </q-btn>
      <q-btn color="red" disable v-if="item.deleteLoading && !item.edit">
        <div>
          <q-spinner-ios
            color="white"
            size="30px"
          />
        </div>
      </q-btn>

      <q-btn color="red" v-if="item.edit" @click="()=> $store.dispatch('changeEdit', item.id)">
        CANSEL
      </q-btn>


    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style';
</style>
