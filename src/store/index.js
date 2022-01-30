import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        productArray : [],
        stroka:"It's state!"
    },
    mutations:{
        thisMutation(){
            console.log("It's mutatuions")
        },
        deleteSelectProduct(state, payload){
            state.productArray = state.productArray.filter((elem)=>{
                return !payload.some((elemId)=>{
                    return elemId==elem.id
                })
            })
        },
        setNewProduct(state,payload){
            state.productArray.push(payload)
        }
    },
    getters:{
        thisGetter(){
            console.log("It's Getters in Getters")
            return 'Holla'
        } 
    },
    actions:{
        setLocalStotage({state,commit,dispatch,getters}){
            console.log(state.stroka);
            commit('thisMutation');
            dispatch('thisActions');
            console.log(getters.thisGetter)
        },
        thisActions(){
            console.log("It's Actions")
        },
        saveProductArray({state}){
            localStorage.setItem('productArray',JSON.stringify(state.productArray))
        },
        getProductArray({state}){
            state.productArray = JSON.parse(localStorage.getItem('productArray'))
            if(state.productArray == undefined){
                state.productArray = []
            }
        },
        addNewProductVuex({commit},payload){
            commit('setNewProduct',payload)
        }
    }
})