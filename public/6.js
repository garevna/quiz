(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{114:function(t,n,i){"use strict";i.r(n);const e={props:["states"],data:function(){return{quiz:{}}},computed:{width:{get:function(){return Math.max(window.innerWidth/2,300)}},height:{get:function(){return window.innerHeight-100}},localDrawer:{get:function(){return this.$root.drawer},set:function(t){this.$root.$emit("navigation-drawer-state",t)}}},template:'\n      <v-container class="transparent">\n        <v-navigation-drawer app\n                             bottom\n                             absolute\n                             temporary\n                             class="transparent"\n                             :width="width"\n                             v-model = "localDrawer">\n            <v-list class="pa-0 transparent">\n                <v-list-item>\n                    <v-list-item-avatar tile>\n                        <img src="./images/js-icon.svg" width="40">\n                    </v-list-item-avatar>\n                    <v-list-item-content>\n                        <v-list-item-title>\n                            &nbsp;&nbsp;Quiz\n                        </v-list-item-title>\n                    </v-list-item-content>\n                </v-list-item>\n\n                <v-divider></v-divider>\n\n                <v-list-item class="transparent"\n                             v-for = "item in states"\n                             :key = "item"\n                             @click = "clickHandler ( item )">\n                    <v-list-item-action>\n                        <v-icon>assignment</v-icon>\n                    </v-list-item-action>\n                    <v-list-item-content>\n                        <v-list-item-title>\n                              {{ item }}\n                        </v-list-item-title>\n                    </v-list-item-content>\n                </v-list-item>\n            </v-list>\n        </v-navigation-drawer>\n      </v-container>\n    ',methods:{clickHandler:async function(t){this.$root.$emit("closeNavigationPanel");let n=this.$root.$store.state.mainData.filter(n=>n.name===t)[0];location.hash=n.folder,this.$root.$store.commit("setQuizName",t),await this.$root.$store.dispatch("getQuizData",{folder:n.folder,files:n.levels}),this.$root.$emit("start-quiz",t)}},components:{}};n.default=e}}]);