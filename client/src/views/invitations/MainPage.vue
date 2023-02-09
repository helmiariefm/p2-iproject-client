<script>
    import { mapState, mapActions } from 'pinia';
    import { useCounterStore } from '../../stores/counter';
    import Button from './components/Button.vue';

    export default{
        data(){
            return {
                isSampul: true
            }
        },
        components: {
            Button
        },
        computed: {
            ...mapState(useCounterStore, ['invitationDetail', 'tanggal', 'day', 'month', 'year', 'dateOnly'])
        },
        methods: {
            ...mapActions(useCounterStore, ['handleInvitation']),
            openInvitation(){
                this.isSampul = false
            }
        }, 
        created(){
            console.log(this.day, '<<<<')
            this.handleInvitation(this.$route.params.invitationName)
        }
    }
</script>

<template>
    <div v-if="isSampul" class="App">
      <header id="sampul" class="App-header-sampul">
        <img src="./assets/flower-cover.png" alt="logo" class='h-96 mb-9 md:h-96'/>
        <h1 class="text-[#996731] font-primary font-bold md:text-7xl text-6xl -translate-y-[330px] -translate-x-8 md:-translate-y-[338px]">{{ invitationDetail.cpw.slice(0,1) }}</h1>
        <h1 class="text-[#996731] font-primary font-bold md:text-7xl text-6xl -translate-y-64 translate-x-7 md:-translate-y-[276px]">{{ invitationDetail.cpp.slice(0,1) }}</h1>
        <h1 class='font-secondary text-secondary opacity-75 font-light text-lg mb-9'>You are Invited to Our Wedding</h1>
        <Button @click.prevent="openInvitation"/>
      </header>
    </div>
    <div v-else id='rizcahelmi' className='App'>
      <header className="undangan-header">        
        <div className='bg-slate-100 bg-opacity-60 brightness-50 w-screen h-screen z-0 absolute'></div>
        <Salju/>
        <h4 className='font-secondary text-primary font-light -translate-y-5 mb-9 z-10'>THE WEDDING OF</h4>
        <h1 className='text-primary font-primary -translate-y-5 text-7xl z-10 transform-gpu'>
            {{ invitationDetail.cpw }} <br/>&<br/> {{ invitationDetail.cpp }}
        </h1>                
      </header>  
      <div className='z-20 relative'>
        
        <!-- Second Section -->
        <div className="App">
            <div className='secondpg'>
                <Fade bottom>
                    <div className='py-6'>
                    <h1>Save Our Special Date</h1>
                    </div>
                </Fade>          
                <div className='bg-[#64748b] text-[#e5e5e5] text-4xl md:text-6xl -translate-y-3 mx-36 md:mx-[700px] rounded-md'>
                    <hr/>
                    <h1 className='font-semibold'>{{ this.tanggal }}<br/>{{ this.month }}</h1>
                </div>          
                <div className='flex grid-rows-3 gap-11 items-center justify-center -translate-y-[72px] md:-translate-y-[85px]'>     
                    <Fade right>
                    <div className='text-2xl'>
                        <hr className='bg-black w-24 mb-1 z-0 border-slate-400'/>
                        <h1>{{ this.day }}</h1>
                        <hr className='bg-black w-24 mt-1 z-0 border-slate-400'/>
                    </div>
                    </Fade>
                    <div className='md:w-[29px] mx-7'></div>
                    <Fade left>
                    <div className='text-2xl'>
                        <hr className='bg-black w-24 mb-1 z-0 border-slate-400'/>
                        <h1>{{ this.year }}</h1>
                        <hr className='bg-black w-24 mt-1 z-0 border-slate-400'/>
                    </div> 
                    </Fade>           
                </div>          
                <img className='-translate-y-[123px] md:hidden relative z-30' src='./assets/flower.png' alt='flower'/>          
            </div>      
        </div>
        
        <!-- Third Section -->
        <div class="App">
            <div id='namarizcahelmi' class='thirdpg'>
                <div class='-mt-9 md:-mt-14'>
                    <Fade bottom>
                    <!-- <h1 class='mt-11'>Bismillahirrahmanirrahim</h1> -->
                    <p class='text-base font-light mx-2'>
                        {{ this.invitationDetail.quote }}
                    </p>
                    </Fade>
                </div>      
                
                <div class='flex flex-wrap mt-11 translate-y-11'>
                    <Fade right>
                    <p class='text-amber-800 px-5 translate-y-1 md:translate-y-5 mx-auto font-primary text-3xl md:text-5xl md:mr-5 font-semibold leading-none'>
                        {{ this.invitationDetail.cpw }}
                        <p className='text-black font-secondary font-light -translate-y-3 text-sm md:text-xl mx-5 md:mx-0 text-center md:text-right mb-3'>                                                        
                            <br/>Ratu Bajak Laut
                        </p>                      
                    </p>  
                    </Fade>        
                    <img class='rounded-full mx-auto w-28 md:w-44 h-28 md:h-44 shadow-2xl' alt='CPW' src='./assets/hancock.jpg'/>
                </div>

                <p class='text-5xl text-amber-700 font-primary py-3 md:py-0 translate-y-9'>&</p>
                
                <div class='flex flex-wrap md:mt-4 mx-2 translate-y-11'>
                    <img class='rounded-full mx-auto w-28 md:w-44 h-28 md:h-44 shadow-2xl' alt='CPP' src='./assets/luffy.png'/>
                    <Fade left>
                    <p class='text-amber-800 px-5 md:translate-y-5 text-left mx-auto font-primary text-3xl mt-6 md:text-5xl md:ml-5 font-semibold leading-none'>
                        {{ this.invitationDetail.cpp }}
                        <p className='text-black font-secondary font-light -translate-y-3 text-sm md:tracking-normal md:text-xl mx-5 md:mx-0 text-center md:text-left'>                                      
                            <br/>Raja Bajak Laut
                        </p>                      
                    </p>
                    </Fade>
                </div>                           
            </div>
            </div>

        <!-- DateAndLocation Section -->
        <div>
            <div id='tanggalrizcahelmi' className='dateandlocation'>
            <img src='./assets/breakPage.png' alt='breakPage' className='h-44 -translate-y-16 md:-translate-y-14 md:hidden'/>
                <div className='-translate-y-5 md:translate-y-16'>
                    <Fade bottom><h1 className='text-xl md:text-4xl font-bold text-slate-700 tracking-widest'>{{ this.dateOnly }}</h1></Fade>
                    <div className='flex grid-rows-3 gap-5 md:gap-14 items-center justify-center text-lg md:text-2xl text-slate-700 my-4'>
                        <Fade right><h1>Akad<br/>{{ this.invitationDetail.akadStart.slice(0, 5) }} - {{ this.invitationDetail.akadEnd.slice(0, 5) }} WIB</h1></Fade>
                        <span className='bg-[#64748b] w-[2px] h-9'><span className='opacity-0'>.</span></span>
                        <Fade left><h1>Resepsi<br/>{{ this.invitationDetail.resepsiStart.slice(0, 5) }} - {{ this.invitationDetail.resepsiEnd.slice(0, 5) }} WIB</h1></Fade>
                    </div>                        
                    <Fade>
                        <div className='text-lg md:text-2xl font-normal text-slate-700 tracking-widest leading-tight mb-4'>
                        <!-- <h1>Masjid Al-Akhyar</h1> -->
                        <h1>
                            {{ this.invitationDetail.location }}
                        </h1>
                        </div>
                    </Fade>
                    <OpenLocation/>            
                </div>                              
            </div>
        </div>

        <!-- Footer -->
        <div class='-mt-[14px] w-screen h-40 bg-[#64748b] text-white pb-5'>
            <img src='./assets/transisi.png' alt='transisi' class='h-40 md:h-48 w-screen -translate-y-36 md:-translate-y-48'/>
            <div class='-mt-32'>        
                <h1 class='mx-auto text-primary'>Made With Love by Helmi Arief Muhammad</h1>                    
            </div>
            <div class='flex justify-evenly my-3 md:hidden'>     
                <!-- <div class='flex'>
                    <img src='./assets/ig.png' alt='breakPage' class='h-6 w-6 mr-1 md:-translate-y-14 md:hidden'/>
                    <a href='https://www.instagram.com/rizca.widya/' target='_blank' rel="noreferrer">
                    <h1>rizca.widya</h1>
                    </a>
                </div> -->
                <div class='flex'>
                    <img src='./assets/ig.png' alt='breakPage' class='h-6 w-6 mr-1 md:-translate-y-14 md:hidden'/>
                    <a href='https://www.instagram.com/helmiam05/' target='_blank' rel="noreferrer">
                    <h1 class="text-primary">helmiam05</h1>
                    </a>
                </div>     
            </div>
        </div>
      </div>      
      <!-- <Navigasi/> -->
    </div>
</template>