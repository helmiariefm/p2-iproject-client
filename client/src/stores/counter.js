import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const useCounterStore = defineStore('counter', {
  state(){
    return {
      // server: 'http://localhost:3000',
      server: 'https://violet-fear-production.up.railway.app',
      isLogin: false,
      quotes: [],
      invitationDetail: [],
      day: [],
      month:[],
      year: [],
      tanggal: [],
      dateOnly: [],
      cek: []
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
        Toastify({
          text: "Successful register, please login",
          duration: 3000                
        }).showToast();
        this.router.replace({name: 'login'})
      } catch (err) {
        // console.log(err)
        const errMsg = err.response.data.message[0].message        
        Toastify({
          text: `${err.response.status} ${err.code}: ${errMsg}`,
          duration: 5000,
          close: true,
          style: {
              background: "linear-gradient(to right, #d45353, #ed9daa)",
            }
        }).showToast();
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
        Toastify({
          text: "Logged in",
          duration: 3000                
        }).showToast();
        this.router.replace({name: 'home'})
      } catch (err) {
        const errMsg = err.response.data.message[0].message        
        Toastify({
          text: `${err.response.status} ${err.code}: ${errMsg}`,
          duration: 5000,
          close: true,
          style: {
              background: "linear-gradient(to right, #d45353, #ed9daa)",
            }
        }).showToast();
      }
    },

    logout(){
      localStorage.clear('access_token')
      this.isLogin = false
      this.router.replace('/')
      Toastify({
        text: "Logged out",
        duration: 3000                
      }).showToast();
      this.router.replace({name: 'home'})
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
          onSuccess: (result) => {
            /* You may add your own implementation here */
            cb()
            this.router.push('/invitation-form')
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
        this.cek = data
        this.router.replace({path: `/${form.routeName}`})
        Toastify({
          text: "Successful create Invitation",
          duration: 3000                
        }).showToast();
      } catch (err) {
        console.log(this.data, '<<<<< DATA CREATE INVITATION')
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
