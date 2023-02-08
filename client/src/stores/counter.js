import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', {
  state(){
    return {
      server: 'http://localhost:3000',
      isLogin: false,
      quotes: [],
      invitationDetail: [],
      day: [],
      month:[],
      year: [],
      tanggal: [],
      dateOnly: []
    }
  },
  actions: {
    async registerHandler(form){ 
      console.log(form)     
      try {
        const {data} = await axios({
          method: 'post',
          url: `${this.server}/register`,
          data: form
        })
        // console.log(data, '<<<<< ')
        this.router.replace({name: 'home'})        
      } catch (err) {
        console.log(err)
      }
    },

    async login(form){
      try {
        const {data} = await axios({
          method: 'post',
          url: `${this.server}/login`,
          data: form
        })
        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true
        this.router.push('/')
      } catch (err) {
        console.log(err)
      }
    },

    logout(){
      localStorage.clear('access_token')
      this.isLogin = false
      this.router.replace('/')     
    },

    async changeBuyStatus(){
      try {
        const {data} = await axios({
          method: 'patch',
          url: `${this.server}/buy-invitation`,
          headers: {access_token: localStorage.access_token}
        })
      } catch (err) {
        console.log(err)
      }
    },

    async buy(){
      try {
        const {data} = await axios({
          method: 'post',
          url: `${this.server}/generate-midtrans-token`,
          headers: {access_token: localStorage.access_token}
        })

        const cb = this.changeBuyStatus   

        window.snap.pay(data.token, {
          onSuccess: function(result){
            /* You may add your own implementation here */
            cb()
            alert("payment success!"); console.log(result);
          },
          // onPending: function(result){
          //   /* You may add your own implementation here */
          //   alert("wating your payment!"); console.log(result);
          // },
          // onError: function(result){
          //   /* You may add your own implementation here */
          //   alert("payment failed!"); console.log(result);
          // },
          // onClose: function(){
          //   /* You may add your own implementation here */
          //   alert('you closed the popup without finishing the payment');
          // }
        })
      } catch (err) {
        console.log(err)
      }
    },

    async generateQuotes(){
      try {
        const {data} = await axios.get('http://localhost:3000/generatequotes')
        this.quotes = data
      } catch (err) {
        console.log(err)
      }
    },

    async createInvitation(form){ 
      console.log(form)
      try {
        const {data} = await axios({
          method: 'post',
          url: `${this.server}/createinvitation`,
          headers: {access_token: localStorage.access_token},
          data: form
        })
        // console.log(data, '<<<<< ')
        this.router.replace({name: 'home'})        
      } catch (err) {
        console.log(err)
      }
    },

    async handleInvitation(name){
      try {
        const {data} = await axios.get(`${this.server}/${name}`, {
          headers: {access_token: localStorage.getItem('access_token')}
        })
        this.invitationDetail = data

        const date = new Date(this.invitationDetail.weddingDay)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.dateOnly = date.toLocaleDateString('en-CA', options)
        // console.log(date.toLocaleDateString('en-CA', options))

        const tanggalWedding = new Date(this.invitationDetail.weddingDay)
        const getTanggal = tanggalWedding.getDate()
        this.tanggal = getTanggal

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weddingDay = new Date(this.invitationDetail.weddingDay)
        let getDay = days[weddingDay.getDay()]
        if(getDay.length > 6){
          getDay = getDay[0] + getDay[1] + getDay[2] + getDay[3]
        }
        this.day = getDay
        
        // console.log(this.invitationDetail.akadStart.slice(0, 5))

        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ]
        const weddingMonth = new Date(this.invitationDetail.weddingDay)
        let getMonth = months[weddingMonth.getMonth()]
        if(getMonth.length > 3){
          getMonth = getMonth[0] + getMonth[1] +getMonth[2]
        }
        this.month = getMonth

        const weddingYear = new Date(this.invitationDetail.weddingDay)
        const getYear = weddingYear.getFullYear()
        this.year = getYear        

        // console.log(this.day, '<<<< THIS.DAY')
        this.router.push(`/${name}`)
      } catch (err) {
        console.log(err)        
      }
    },

    async googleLogin(res) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${this.server}/googlelogin`,
          data: {
            idToken: res.credential
          }
        });
        // console.log(data, 'ini dataaa')
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.username);
        // this.currentPage = "dashboard";        
        // console.log(data.access_token)
        this.isLogin = true;
        this.router.push("/");        
      } catch (err) {
        console.log(err)
      }
    }
  }
})
