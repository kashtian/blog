<template>
    <div class="resume">
        <section class="container">
            <div class="tip">see my skills</div>
            <div class="skill-item" :class="{reverse: index % 2 != 0}" v-for="(item, index) in list" :key="item.name">
                <div class="img-content">
                    <div :class="[img.type, img.name]"
                         v-for="img in item.images" :key="img.name">
                    </div>
                </div>                
                <div class="skill-intro">
                    <div class="name">{{item.name}}</div>
                    <div>技能：{{item.skill}}</div>
                    <div>说明：{{item.desc}}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="less" scoped>
.resume {
    .container {
        width: 2000pr;
        margin: 40pr auto;
        font-size: 36pr;
        .tip {            
            text-align: center;
        }
        .skill-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 120pr;
            font-size: 0px;
            &.reverse {
                flex-direction: row-reverse;
            }
            .img-content {
                position: relative;
                width: 1300pr;
                height: 740pr;    
                font-size: 0px;          
                .big {
                    width: 1000pr;
                    height: 760pr;
                    border-radius: 16pr;                    
                    background: no-repeat;
                    background-size: 100% 100%;
                }
                .small {
                    position: absolute;
                    top: 200pr;
                    right: 0pr;
                    width: 500pr;
                    height: 640pr;
                    border-radius: 16pr;
                    background: no-repeat;
                    background-size: 100% 100%;
                }
                .same {
                    display: inline-block;
                    width: 500pr;
                    height: 840pr;
                    border-radius: 16pr;   
                    background: no-repeat;
                    background-size: 100% 100%;
                    &:first-child {
                        margin-right: 100pr;
                    }
                }
                .maifangma {                    
                    background-image: url('../../images/maifangma.png');
                }
                .chuangjia-mobile {                    
                    background-image: url('../../images/chuangjia_mobile.png');
                }
                .fangguanjia {
                    background-image: url('../../images/fangguanjia.png');
                }
                .qukuai {
                    background-image: url('../../images/qukuai.png');
                }
            }
            .skill-intro {
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

<script>
import data from './data.json';

export default {
    name: 'resume',
    path: '/resume',
    title: '简历',

    data() {
        return {
            list: data
        }
    }
}
</script>