<template>
    <div class="container">
        <h3>Vue invoice Calc</h3>
        <div>
            <form class="d-flex">
                <input type="text" class="input-name input-form" placeholder="Product name" id="name" v-model="newProduct.name">
                <input type="text" class="input-price input-form" placeholder="Price" id="price" v-model="newProduct.price">
                <input type="text" class="input-qty input-form" placeholder="Qty" id="qty" v-model="newProduct.qty">
                <button class="button-form" @click.prevent="addNewProduct">Add</button>
            </form>
        </div>
        <div>
            <ul class="custom-table">
                <li class="list background-list-header">
                     <input type="checkbox" name="" id="" disabled class="list-elem list-header">
                      <span class="list-elem list-header border-right border-left">Product Name</span>
                      <span class="list-elem list-header border-right">Price</span>
                      <span class="list-elem list-header border-right">Qte</span>
                      <span class="list-elem list-header border-right">Sum</span>
                </li>
                <li class="list background-list-item" v-for="item in productArray" :key="item.id">
                     <input type="checkbox" name="" id="" v-model="item.checked" class="list-elem">
                      <span class="list-elem border-right border-left">{{item.name}}</span>
                      <span class="list-elem border-right">{{item.price}} $</span>
                      <span class="list-elem border-right">{{item.qty}}</span>
                      <span class="list-elem border-right">{{item.price*item.qty}} $</span>
                </li>
            </ul>
        </div>
        
        <div class="total-row">
            <button @click="deleteProduct">Delete</button>
            <div class="total">
                <h4>Total:</h4>
                <span>{{summa}} $</span>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
    beforeMount(){
        this.getProductArray()
    },
    data(){
        return{
            newProduct :{
                id:'',
                name:'',
                price:'',
                qty:'',
                checked:false
            },
            checkArray:[]
        }
    },
    computed:{
        ...mapState([
        'productArray',
        ]),
        summa(){
            return this.productArray.reduce((sum,elem)=>{return sum+elem.price*elem.qty},0)
        },
        selectToDelete(){
            return this.productArray.reduce((arrDelete,elem)=>{
                if(elem.checked){
                    arrDelete.push(elem.id)
                }
                return arrDelete
            },[])
        }
    },
    methods:{
        ...mapActions([
        'setLocalStotage',
        'saveProductArray',
        'getProductArray',
        'addNewProductVuex',
        'saveProductArray'
        ]),
        ...mapMutations([
            'deleteSelectProduct',
            
        ]),
        addNewProduct(){
            this.addNewProductVuex({...this.newProduct, id:'T'+this.newProduct.name+new Date()})
            this.saveProductArray()
            this.clearProduct()
        },
        clearProduct(){
            this.newProduct.id='',
            this.newProduct.name='';
            this.newProduct.price='';
            this.newProduct.qty='';
        },
        deleteProduct(){
        this.setLocalStotage();
        this.deleteSelectProduct(this.selectToDelete);
        this.saveProductArray();
        }
        
    },
    components:{
    }
}
</script>

<style>
ul{
    margin: 0;
    padding: 0;
}
.container{
    width: 800px;
    margin: 50px auto;
    text-align: center;
}
.d-flex{
    display: flex;
    justify-content: space-between;
    align-items: center
}
.row-div{
    display: flex;
    flex-direction: row;
    justify-content: space-between
}
.list{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
}
.list-elem{
    padding: 5px 0;
    list-style: none;
    flex: 0 0 20%;
}
.list-header{
    font-weight: bold;
}
.total-row{
    display: flex;
    justify-content: space-between;
    align-items: center
}

table{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
}

table tr{
    display: flex;
    justify-content: space-between;
}
table tr td{
    flex: 0 0 20%;
}
table tr th{
    flex: 0 0 20%;
}
.input-form{
    margin: 10px 0;
    padding: 5px 10px;
    box-sizing: border-box;
    max-width: 10%
}

.input-name{
    
    max-width: 60%;
    width: 50%;
}
button{
    box-sizing: border-box;
    padding: 10px 25px;
}
.button-form{
    
    flex: 0 0 20%
}
.total{
    flex: 0 0 15%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
}
.custom-table{
    border: 1px solid black;
}
.border-bottom{
    border-bottom: 1px solid black;
}
.border-right:not(:last-child){
    border-right: 1px solid black;

}
.border-left{
    border-left: 1px solid black;
}
.background-list-item{
    background-color: rgba(255, 255, 255, 0.637);
    
}
.background-list-item:nth-child(2n){
    background-color: rgba(151, 151, 151, 0.664);
}
.background-list-header{
    background-color: rgba(70, 71, 73, 0.486);
}
</style>