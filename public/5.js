(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{129:function(t,e,a){"use strict";a.r(e);const s=a(0),i=a(115);s.use(i),e.default=new i.Store({state:{quizName:null,quizReady:!1,mainData:null,mainDataIsReady:!1,quizData:{score:0,maxScore:0,levels:[]},quizRawData:null,backgroundPictures:[402,702,516,404,405,406,705,408,509,440,410,448,704,417,147,316],gameOverPictureURL:"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSZVhfeXVPblhxNzA",successPictureURL:"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSd3U0S09YUkkwanc",failurePictureURL:"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSMzNOUGc3QndEOGM",userInfo:{login:"",fname:"",name:"",registered:"",passHash:"",photoURL:""},userResults:{}},getters:{quizLevelData:t=>{let e={balls:t.quizRawData.split(/[\s]*____quizBalls____[\s]*/)[1],type:t.quizRawData.split(/[\s]*____quizType____[\s]*/)[1],question:t.quizRawData.split(/[\s]*____quizQuestion____[\s]*/)[1],picture:t.quizRawData.split(/[\s]*____quizPicture____[\s]*/)[1],js:t.quizRawData.split(/[\s]*____quizJS____[\s]*/)[1],html:t.quizRawData.split(/[\s]*____quizHTML____[\s]*/)[1],rightInput:t.quizRawData.split(/[\s]*____rightInput____[\s]*/)[1],inputLegendBefore:t.quizRawData.split(/[\s]*____inputLegendBefore____[\s]*/)[1]||"",inputLegendAfter:t.quizRawData.split(/[\s]*____inputLegendAfter____[\s]*/)[1]||"",choiceVariants:t.quizRawData.split(/[\s]*____choiceVariants____[\s]*/)[1],rightChoicesNums:t.quizRawData.split(/[\s]*____rightChoice____[\s]*/)[1],wrongContent:t.quizRawData.split(/[\s]*____wrongContent____[\s]*/)[1],rightContent:t.quizRawData.split(/[\s]*____rightContent____[\s]*/)[1]};return e.balls=Number(e.balls?e.balls.split(/[\s]*____/)[0]:5),e.type=e.type.split(/[\s]*____/)[0],e.picture=e.picture?e.picture.split(/[\s]*____/)[0]:null,e.js=e.js?e.js.split(/[\s]*____/)[0]:null,e.html=e.html?e.html.split(/[\s]*____/)[0]:null,e.question=e.question.split(/[\s]*____/)[0],"choice"===e.type?(t.quizRawData,e.choiceVariants=e.choiceVariants.split(/[\s]*____/)[0].split(String.fromCharCode(10)).map(t=>t.trim().split(String.fromCharCode(10)).join("").split(String.fromCharCode(13)).join("")),e.rightChoicesNums=e.rightChoicesNums.split(/[\s]*____/)[0].split(",").map(t=>Number(t.trim().split(String.fromCharCode(10)).join("").split(String.fromCharCode(13)).join("")))):"input"===e.type?(t.quizRawData,e.rightInput=e.rightInput.split(/[\s]*____/)[0].split(String.fromCharCode(10)).filter(t=>t.length>0),e.inputLegendBefore=e.inputLegendBefore.split(/[\s]*____/)[0],e.inputLegendAfter=e.inputLegendAfter.split(/[\s]*____/)[0]):(t.quizRawData,e.wrongContent=e.wrongContent.split(/[\s]*____/)[0],e.rightContent=e.rightContent.split(/[\s]*____/)[0]),e},dataIsReady:t=>t.mainDataIsReady,mainMenuReady:t=>t.mainDataIsReady,mainMenuItems:t=>t.mainDataIsReady?t.mainData.map(t=>t.name):[]},mutations:{setQuizName:(t,e)=>t.quizName=e,initQuizData:t=>{t.quizData={gameOverPictureURL:t.gameOverPictureURL,successPictureURL:t.successPictureURL,failurePictureURL:t.failurePictureURL,score:0,maxScore:0,lives:10,levels:[]}},getRawData:(t,e)=>t.quizRawData=e,pushLevelData:(t,e)=>{t.quizData.levels.push(e)},buildQuiz:t=>{for(var e of(t.quizData.maxScore=0,t.quizData.levels))t.quizData.maxScore+=e.balls*(e.rightChoicesNums?e.rightChoicesNums.length:1);t.quizReady=!0},saveQuizResults:(t,e)=>{t.quizData.score+=e.score,t.quizData.lives-=e.lives},setMainData:(t,e)=>{t.mainData=e,t.mainDataIsReady=!0,t.mainMenuOptions=e.map(t=>t.name)},setUser:(t,e)=>t.userInfo=JSON.parse(JSON.stringify(e)),setUserResults:(t,e)=>t.userResults=e,setCookie:t=>{document.cookie=`user=${t.userInfo.login}`,document.cookie=`pass=${t.userInfo.passHash}`},saveAttemptResult:t=>{!t.userResults[t.quizName]&&(t.userResults[t.quizName]=[]),t.userResults[t.quizName].push(Math.round(100*t.quizData.score/t.quizData.maxScore)+"%"),localStorage.setItem(`${t.userInfo.fname} ${t.userInfo.name}`,JSON.stringify(t.userResults))}},actions:{async getUserInfo(t,e){let a=await fetch(`https://garevna-js-quiz.glitch.me/forms/${e}`);if(0===a.headers.get("Content-Type").indexOf("application/json"))return{error:`User ${e} was not found`};let s=await a.formData();return{name:s.get("name"),fname:s.get("lastName"),passHash:s.get("passHash"),photoURL:URL.createObjectURL(s.get("avatar")),registered:s.get("registered"),results:JSON.parse(s.get("results"))}},getQuizData(t,e){t.state.quizReady=!1,t.commit("initQuizData"),e.files.forEach(async a=>{let s=await(await fetch(`data/quiz/${e.folder}/${a}.md`).catch(t=>console.warn(`There is no such file: data/quiz/${e.folder}/${a}.md`))).text();t.commit("getRawData",s),t.commit("pushLevelData",t.getters.quizLevelData),t.commit("buildQuiz")})},saveResults(t,e){let a=new FormData;a.set("results",JSON.stringify(t.state.userResults)),fetch(`https://garevna-js-quiz.glitch.me/form/${t.state.userInfo.login}`,{method:"PATCH",body:a}).then(t=>console.log(t.ok))}}})}}]);