<template>
    <div class="crash">
        <div class="files">
            <span :class="[fnIndex==index?'act':'']" v-for="(item,index) in allFiles" :key="item"
                  @click="getAllKeys(item,index)">{{item}}</span>
        </div>
        <ul class="keys">
            <li :class="['',{'act':keyIndex==index}]" v-for="(item,index) in allKeys" :key="item"
                @click="getContent(item,index)">{{item}}
            </li>
        </ul>
        <div v-show="keyIndex!=-1" class="txt"><span>{{pre}}</span>
            <div>{{content}}</div>
            <div class="info"><span v-for="item in info" :key="item">{{item}} </span></div>
        </div>
    </div>
</template>

<script>
    import api from "../api"

    export default {
        name: 'CrashShow',
        data() {
            return {
                allFiles: [],
                allKeys: [],
                fn: '',
                fnIndex: -1,
                keyIndex: -1,
                pre: '',
                content: '',
                info: [],
            }
        },
        mounted() {
            this.getAllFiles()
        },
        methods: {
            async getAllFiles() {
                let ret = await api.allFiles();
                if (ret.isSuccess && ret.data) {
                    this.allFiles = ret.data
                }
            },
            async getAllKeys(fn, index) {
                this.fnIndex = index
                let ret = await api.allKeys({filename: fn});
                if (ret.isSuccess && ret.data) {
                    this.fn = fn
                    this.allKeys = ret.data
                }
            },
            async getContent(key, index) {
                this.keyIndex = index
                let ret = await api.getContent({filename: this.fn, key: key});
                if (ret.isSuccess && ret.data) {
                    let str = ret.data
                    let preIndex = str.indexOf(" ", str.indexOf(" ") + 1)

                    this.pre = str.substr(0, preIndex)
                    console.log(this.pre)
                    let contents=str.substr(preIndex).split("crashinfo:")
                    this.content = contents[0]
                    this.info = contents[1].split("\t")
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/reset.scss";


    $color: red;

    .files {
        span {
            margin-right: __vw(10);
            background: grey;
            color: white;
            padding: __vw(10);
        }

        .act {
            background: $color;
        }
    }

    .keys {
        float: left;
        margin: __vw(20) 0 0 10%;

        height: 70vh;
        overflow-y: auto;

        li {
            padding: __vw(10);
            background: grey;
            margin: __vw(4);
            color: blue;
        }

        .act {
            background: #42b983;
        }
    }

    .txt {
        float: left;
        width: 60%;
        height: 80vh;
        margin: __vw(20);
        padding: __vw(4);
        background: grey;
        text-align: left;
        //overflow: hidden;
        //text-overflow: ellipsis;
        //white-space: normal;

        span{
            background: red;
            color: white;
        }

        .info{
            margin-top: __vw(10);
            span{
                margin-right: __vw(10);
                background: greenyellow;
                color:red;
                padding: __vw(4);
            }
        }
    }
</style>
