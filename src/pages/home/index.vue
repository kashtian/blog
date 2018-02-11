<template>
    <div class="home">
        <header>
            <div class="intro">
                <div class="title">I AM KASH</div>
                <div class="small-title">欢迎来到我的主页</div>
                <div>ui demo: http://demo.cssmoban.com/cssthemes3/ft5_35_hold/index.html</div>
            </div>
        </header>

        <section class="container">
            <div class="tip">see my skills</div>
            <div class="skill-item">
                <div class="left">
                    <div class="big-img"></div>
                    <div class="small-img"></div>
                </div>                
                <div class="skill-intro">
                    <div class="name">web网站(SPA)</div>
                    <div class="detail">
                        技能：vuejs,css3，webpack<br/>
                        说明：前端网页采用轻量级框架vue实现，使用webpack打包项目
                    </div>
                </div>
            </div>
        </section>
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

    .container {
        width: 2000pr;
        margin: 40pr auto;
        font-size: 36pr;
        .tip {            
            text-align: center;
        }
        .skill-item {
            margin-top: 60pr;
            font-size: 0px;
            .left {
                position: relative;
                display: inline-block;
                vertical-align: top;
                width: 1300pr;
                height: 740pr;
                margin-right: 100pr;                
                .big-img {
                    width: 1000pr;
                    height: 760pr;
                    border-radius: 16pr;
                    background: no-repeat url('../../images/maifangma.png');
                    background-size: 100% 100%;
                }
                .small-img {
                    position: absolute;
                    top: 200pr;
                    right: 0pr;
                    width: 500pr;
                    height: 640pr;
                    border-radius: 16pr;
                    background: no-repeat url('../../images/chuangjia_mobile.png');
                    background-size: 100% 100%;
                }
            }
            .skill-intro {
                display: inline-block;
                vertical-align: bottom;
                width: 600pr;
                font-size: 36pr;
                line-height: 80pr;
                .name {
                    margin-bottom: 40pr;
                    font-size: 60pr;
                }
            }
        }
    }

}
</style>

<script src="./home.js"></script>