<template>
    <div class="sidebar">
        <div class="box" @click="addCollection">
            <li><a href="javascript:void(0)">添加</a></li>
            <img src="../../assets/images/sidebar.png" alt="">
        </div>
    </div>
</template>

<script>

export default {
    name:'sider',
    setup(props, { emit }) {
        //添加一个集合方法
        const addCollection = ()=>{
            emit('addCollection')
        }

        return{
            addCollection,
        }
    },
    emits:[
        'addCollection',
    ]
}
</script>

<style scoped>
    .sidebar {
        width: 50px;
        position: absolute;
        right: 15px;
        top: 200px;
        border-radius: 15px;
        z-index: 4;
    }
    
    .sidebar li {
        position: relative;
        z-index: 3;
    }
    
    .sidebar .box li a {
        display: inline-block;
        width: 50px;
        height: 50px;
        background-color: #F4F4F4;
        border: #cacaca 1px solid;
        text-align: center;
        font-size: 13px;
        line-height: 50px;
        margin-top: -1px;
        border-radius: 10px;
    }
    .box{
        cursor: pointer;
    }
    .sidebar .box:hover li a{
        background: linear-gradient(to bottom, #f0a4b1, #eb3c3c);
        color: white;
    }
    
    .sidebar .box img {
        z-index: 4;
        position: absolute;
        width: 60px;
        top: -47px;
        right: 0px;
    }
</style>