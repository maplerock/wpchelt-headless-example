import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const Home = { template: `
  <div>
    <div v-html='$root.homeIntro'></div>

    <div class="edit">
      <button v-on:click="$root.updateIntro">Save</button><br />
      <textarea v-model="$root.homeIntro" ></textarea>
    </div>
</div>` }
const Members = { template: `
  <div class="members">
    <div class="form">
      <input @keyup.enter="$root.saveNewMember" type="text" v-model="$root.title" />  
    </div>
  	<div class='grid'>
  		<div class='grid__item' v-for='(member, key) in $root.members'>
  			<h3>
  				<a v-bind:href="member.link">
  					{{member.title.rendered}}
  				</a>
  			</h3>
  			<span v-html='member.content.rendered'></span>
  			<p><small>Was added to WordPress: {{member.date}}</small></p>
        <button v-on:click="$root.deleteMember(member.id, key)">Delete</button>
  		</div>
  	</div>
  </div>` }



const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/members', component: Members },
  ]
})


new Vue({
  router,
  data: () => {
  	return {
  		dataURL: 'http://wpchelt.local/wp-json/wp/v2',
  		homeIntro: "Loading Data...",
  		isLoading: true,
  		members: {},
      title: '',
      headers: {
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      }
  	}
  },
  template: `
    <div id="app">
		<header class="app-header">
      	<h1><strong>WordPress Cheltenham</strong><br />App Demo</h1>
		    <ul class="nav">
          <li><router-link to="/">Intro</router-link></li>
  		    <li><router-link to="/members">Members</router-link></li>
		    </ul>
	    </header>
      <router-view class="view"></router-view>
    </div>
  `,
  mounted: function() {

    //http://wpchelt.local/wp-json/wp/v2/posts/1
 	  axios.get(`${this.dataURL}/posts/1`)
    .then((response) => {
        this.homeIntro = response.data.content.rendered;
    })
    .catch(function (error) {
        console.log(error);
    });

    //http://wpchelt.local/wp-json/wp/v2/members?order=asc&per_page=100
    axios.get(`${this.dataURL}/members?order=asc&per_page=100`)
    .then((response) => {
        this.members = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });



  },
  methods: {
    saveNewMember: function() {

      post_data = {
        'title': this.title,
        'status': 'publish'
      };
      
      vm = this;
      axios.post(`${this.dataURL}/members`, post_data, {headers: this.headers})
      .then((response) => {
          vm.$root.members.push(response.data)
          vm.$root.title = "";
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    deleteMember: function(id, key) {
      vm = this;
      axios.delete(`${this.dataURL}/members/${id}`, {headers: this.headers})
      .then((response) => {
          Vue.delete(vm.$root.members, key)
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    updateIntro: function() {

      post_data = {
        'content': this.homeIntro,
      };

      axios.post(`${this.dataURL}/posts/1`, post_data, {headers: this.headers})
      .then((response) => {
          alert("Intro Saved!")
      })
      .catch(function (error) {
          console.log(error);
      });
      
    }
  }
}).$mount('#app')