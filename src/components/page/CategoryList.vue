<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <!--<van-row>-->
      <!--<van-col span="6">-->
      <!--<div id="leftNav">-->
      <!--<ul>-->
      <!--<li @click="clickCategory(index)" :class="{categoryActive:categoryIndex===index}"-->
      <!--v-for="(item,index) in category" :key="index">-->
      <!--{{item.MALL_CATEGORY_NAME}}-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--</van-col>-->
      <!--<van-col span="18">-->
      <!--<div class="tabCategorySub">-->
      <!--<van-tabs v-model="active">-->
      <!--<van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_CATEGORY_ID">-->
      <!--</van-tab>-->
      <!--</van-tabs>-->
      <!--</div>-->
      <!--</van-col>-->
      <!--</van-row>-->
      <div id="list-div">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
          >
            <div class="list-item" v-for="item in list" :key="item">
              {{item}}
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'

  export default {
    name: 'CategoryList',
    data() {
      return {
        category: [],
        categoryIndex: 0,
        categorySub: [],
        active: 0,
        list: [],
        loading: false,   //上拉加载使用
        finished: false,  //下拉加载是否没有数据了
        isRefresh: false, //下拉加载

        page: 1,          //商品列表的页数
        goodList: [],     //商品信息
        categorySubId: '' //商品子分类ID
      }
    },
    created() {
      this.getCategory()
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight
      // document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
      document.getElementById('list-div').style.height = winHeight - 90 + 'px'
    },
    methods: {
      onRefresh() {
        setTimeout(() => {
          this.isRefresh = false;
          this.list = [];
          this.onLoad()
        }, 500);
      },
      onLoad() {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          }
          this.loading = false;
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500)
      },
      clickCategory(index, categoryId) {
        this.categoryIndex = index
        this.getCategorySubByCategoryId(index + 1)
      },
      getCategory() {
        axios({
          url: url.getCategoryList,
          method: 'get',
        })
          .then(response => {
            console.log(response)
            if (response.data.code == 200 && response.data.message) {
              this.category = response.data.message
              this.getCategorySubByCategoryId(this.category[0].ID)
            } else {
              Toast('服务器错误，数据取得失败')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      //根据大类ID读取小类类别列表
      getCategorySubByCategoryId(categoryId) {
        axios({
          url: url.getCategorySubList,
          method: 'post',
          data: { categoryId: categoryId }
        })
          .then(response => {
            if (response.data.code == 200 && response.data.message) {
              this.categorySub = response.data.message
              this.active = 0
            } else {
              Toast('服务器错误，数据取得失败')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getGoodList() {
        axios({
          url: url.getGoodsListByCategorySubID,
          method: 'post',
          data: {
            categorySubId: this.categorySubId,
            page: this.page
          }
        })
          .then(response => {
            console.log(response)
            if (response.data.code == 200 && response.data.message.length) {
              this.page++
              this.goodList = this.goodList.concat(response.data.message)
            } else {
              this.finished = true;
            }
            this.loading = false;
            console.log(this.finished)
          })
          .catch(error => {
            console.log(error)
          })
      },
    }
  }
</script>

<style scoped>
  #leftNav ul li {
    line-height: 2rem;
    border-bottom: 1px solid #E4E7ED;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
  }

  .categoryActive {
    background-color: red;
  }

  .list-item {
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
  }

  #list-div {
    overflow: scroll;
  }
</style>
