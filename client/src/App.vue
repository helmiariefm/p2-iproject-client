<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { mapWritableState } from 'pinia';
  import { useCounterStore } from './stores/counter';

  export default{    
    computed: {
      ...mapWritableState(useCounterStore, ['isLogin'])
    },
    created(){
      if(localStorage.access_token){
        this.isLogin = true
      }
    }
  }
</script>

<template>  
  <RouterView />
</template>