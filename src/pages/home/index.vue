<template>
    <div class="home">
        <header>
            <div class="intro">
                <div class="title">I AM KASH</div>
                <div class="small-title">欢迎来到我的主页</div>
            </div>
        </header>
    </div>
</template>

<style lang="less">
.home {
    header {
        height: 800pr;
        color: #fff;        
        font-size: 40pr;
        text-align: center;
        background: no-repeat center url('../../images/yourname_bg.jpg');
        background-size: 100%;
        .intro {
            height: 100%;
            background: rgba(0,0,0,0.5);            
            overflow: hidden;
        }
        .title {
            margin: 240pr 0px 60pr;            
            font-size: 100pr;
        }
    }
}
</style>

<script src="./home.js"></script>