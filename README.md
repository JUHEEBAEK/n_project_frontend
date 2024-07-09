# 프로젝트 Description

### ✔ 프로젝트명

NNNN

### ✔ 프로젝트인지 소개

풋살팀(동호회)의 관리를 액셀로 하고 있는데 그것을 좀 더 쉽게 하고 경기 기록을 기록하여 통계내보고 싶어서 만든 프로젝트.

<details>
  <summary> ✔ 디렉토리 구조</summary>
  <code>
    📦src
     ┣ 📂api
     ┃ ┣ 📜api-class.js
     ┃ ┣ 📜attend.js
     ┃ ┣ 📜auth.js
     ┃ ┣ 📜game.js
     ┃ ┣ 📜gmaeReport.js
     ┃ ┣ 📜index.js
     ┃ ┣ 📜member.js
     ┃ ┣ 📜memberSquad.js
     ┃ ┣ 📜modules.js
     ┃ ┣ 📜personal.js
     ┃ ┣ 📜ranking.js
     ┃ ┣ 📜schedule.js
     ┃ ┣ 📜squad.js
     ┃ ┣ 📜stadium.js
     ┃ ┣ 📜team.js
     ┃ ┣ 📜teamSplit.js
     ┃ ┣ 📜unitMember.js
     ┃ ┗ 📜unitTeam.js
     ┣ 📂assets
     ┃ ┣ 📂images
     ┃ ┃ ┣ 📂animation
     ┃ ┃ ┃ ┗ 📜apng_loader-ball.png
     ┃ ┃ ┣ 📂emblem
     ┃ ┃ ┃ ┣ 📜team_fs.png
     ┃ ┃ ┃ ┣ 📜team_nanna.png
     ┃ ┃ ┃ ┗ 📜team_nunnu.png
     ┃ ┃ ┣ 📂linear
     ┃ ┃ ┃ ┣ 📂dark
     ┃ ┃ ┃ ┃ ┣ 📜calendar.png
     ┃ ┃ ┃ ┃ ┣ 📜podium.png
     ┃ ┃ ┃ ┃ ┣ 📜scoreboard.png
     ┃ ┃ ┃ ┃ ┗ 📜tshirt.png
     ┃ ┃ ┃ ┗ 📂light
     ┃ ┃ ┃ ┃ ┗ 📜user.png
     ┃ ┃ ┣ 📂map
     ┃ ┃ ┃ ┣ 📜locationPin.png
     ┃ ┃ ┃ ┗ 📜selectPin.png
     ┃ ┃ ┣ 📜.DS_Store
     ┃ ┃ ┣ 📜barrier.png
     ┃ ┃ ┣ 📜bench.png
     ┃ ┃ ┣ 📜cemetery.png
     ┃ ┃ ┣ 📜close.svg
     ┃ ┃ ┣ 📜emb-default.png
     ┃ ┃ ┣ 📜field.png
     ┃ ┃ ┣ 📜football.png
     ┃ ┃ ┣ 📜football_mint.png
     ┃ ┃ ┣ 📜fsnnnn_emblem_official2.png
     ┃ ┃ ┣ 📜ghost.png
     ┃ ┃ ┣ 📜goal.png
     ┃ ┃ ┣ 📜kick-off.png
     ┃ ┃ ┣ 📜logo.png
     ┃ ┃ ┣ 📜photo-default.png
     ┃ ┃ ┣ 📜player1.png
     ┃ ┃ ┣ 📜player2.png
     ┃ ┃ ┣ 📜rainy.png
     ┃ ┃ ┣ 📜shoes.png
     ┃ ┃ ┣ 📜soccer-goal.png
     ┃ ┃ ┗ 📜sun.png
     ┃ ┣ 📂scss
     ┃ ┃ ┣ 📂components
     ┃ ┃ ┃ ┣ 📂core
     ┃ ┃ ┃ ┃ ┣ 📜footer.scss
     ┃ ┃ ┃ ┃ ┣ 📜toolbar.scss
     ┃ ┃ ┃ ┃ ┗ 📜view.scss
     ┃ ┃ ┃ ┣ 📂match
     ┃ ┃ ┃ ┃ ┣ 📜eventInput.scss
     ┃ ┃ ┃ ┃ ┗ 📜eventList.scss
     ┃ ┃ ┃ ┣ 📂report
     ┃ ┃ ┃ ┃ ┣ 📂tab
     ┃ ┃ ┃ ┃ ┃ ┗ 📜team.scss
     ┃ ┃ ┃ ┃ ┣ 📜eventList.scss
     ┃ ┃ ┃ ┃ ┣ 📜gameInfo.scss
     ┃ ┃ ┃ ┃ ┗ 📜gameList.scss
     ┃ ┃ ┃ ┣ 📂schedule
     ┃ ┃ ┃ ┃ ┗ 📜dateList.scss
     ┃ ┃ ┃ ┣ 📂squad
     ┃ ┃ ┃ ┃ ┗ 📜soccerField.scss
     ┃ ┃ ┃ ┣ 📂stadium
     ┃ ┃ ┃ ┃ ┣ 📜cardList.scss
     ┃ ┃ ┃ ┃ ┗ 📜map.scss
     ┃ ┃ ┃ ┗ 📜loading.scss
     ┃ ┃ ┣ 📂global
     ┃ ┃ ┃ ┣ 📜mediaQuery.scss
     ┃ ┃ ┃ ┗ 📜reset.scss
     ┃ ┃ ┣ 📂material
     ┃ ┃ ┃ ┣ 📜_button.scss
     ┃ ┃ ┃ ┣ 📜_card.scss
     ┃ ┃ ┃ ┣ 📜_color.scss
     ┃ ┃ ┃ ┗ 📜_text.scss
     ┃ ┃ ┣ 📂util
     ┃ ┃ ┃ ┣ 📜loading.scss
     ┃ ┃ ┃ ┗ 📜snackBar.scss
     ┃ ┃ ┣ 📂views
     ┃ ┃ ┃ ┣ 📂footer
     ┃ ┃ ┃ ┃ ┣ 📜attend.scss
     ┃ ┃ ┃ ┃ ┗ 📜memberDetails.scss
     ┃ ┃ ┃ ┣ 📂nav
     ┃ ┃ ┃ ┃ ┣ 📂match
     ┃ ┃ ┃ ┃ ┃ ┗ 📜matchInput.scss
     ┃ ┃ ┃ ┃ ┗ 📂team
     ┃ ┃ ┃ ┃ ┃ ┗ 📜unitTeam.scss
     ┃ ┃ ┃ ┣ 📜join.scss
     ┃ ┃ ┃ ┗ 📜login.scss
     ┃ ┃ ┗ 📜index.scss
     ┃ ┣ 📂value
     ┃ ┃ ┣ 📜CoreValueItem.json
     ┃ ┃ ┣ 📜Schedule.json
     ┃ ┃ ┣ 📜dummy.json
     ┃ ┃ ┣ 📜gameReport.json
     ┃ ┃ ┣ 📜header.json
     ┃ ┃ ┣ 📜match.json
     ┃ ┃ ┣ 📜member.json
     ┃ ┃ ┣ 📜position.json
     ┃ ┃ ┗ 📜squad.json
     ┃ ┗ 📜.DS_Store
     ┣ 📂common
     ┃ ┣ 📜token.js
     ┃ ┗ 📜user.js
     ┣ 📂components
     ┃ ┣ 📂authenticate
     ┃ ┃ ┣ 📜Authenticate.stories.js
     ┃ ┃ ┣ 📜Authenticate.vue
     ┃ ┃ ┗ 📜index.js
     ┃ ┣ 📂calendar
     ┃ ┃ ┣ 📜Add.vue
     ┃ ┃ ┣ 📜FullSchedule.vue
     ┃ ┃ ┗ 📜Schedule.vue
     ┃ ┣ 📂chart
     ┃ ┃ ┣ 📜Bar.vue
     ┃ ┃ ┗ 📜BarInverse.vue
     ┃ ┣ 📂core
     ┃ ┃ ┣ 📜Alert.vue
     ┃ ┃ ┣ 📜Back.vue
     ┃ ┃ ┣ 📜Breadcrumbs.vue
     ┃ ┃ ┣ 📜Footer.vue
     ┃ ┃ ┣ 📜Navigation.vue
     ┃ ┃ ┣ 📜Root.vue
     ┃ ┃ ┣ 📜Toolbar.stories.js
     ┃ ┃ ┣ 📜Toolbar.vue
     ┃ ┃ ┣ 📜View.vue
     ┃ ┃ ┗ 📜props.js
     ┃ ┣ 📂dialog
     ┃ ┃ ┣ 📂member
     ┃ ┃ ┃ ┗ 📜AddUnitMember.vue
     ┃ ┃ ┣ 📂squad
     ┃ ┃ ┃ ┣ 📜Position.vue
     ┃ ┃ ┃ ┗ 📜TeamList.vue
     ┃ ┃ ┗ 📂team
     ┃ ┃ ┃ ┗ 📜Modify.vue
     ┃ ┣ 📂loading
     ┃ ┃ ┣ 📜Loading.stories.js
     ┃ ┃ ┣ 📜Loading.vue
     ┃ ┃ ┗ 📜index.js
     ┃ ┣ 📂match
     ┃ ┃ ┣ 📜EventInput.vue
     ┃ ┃ ┗ 📜EventList.vue
     ┃ ┣ 📂member
     ┃ ┃ ┣ 📜CardList.vue
     ┃ ┃ ┣ 📜RatingList.vue
     ┃ ┃ ┣ 📜Search.vue
     ┃ ┃ ┗ 📜TableList.vue
     ┃ ┣ 📂ranking
     ┃ ┃ ┣ 📜Filter.vue
     ┃ ┃ ┗ 📜Table.vue
     ┃ ┣ 📂report
     ┃ ┃ ┣ 📂tab
     ┃ ┃ ┃ ┗ 📜Team.vue
     ┃ ┃ ┣ 📜DateAndQuarter.vue
     ┃ ┃ ┣ 📜EventList.vue
     ┃ ┃ ┣ 📜GameInfo.vue
     ┃ ┃ ┣ 📜GameList.vue
     ┃ ┃ ┣ 📜Header.vue
     ┃ ┃ ┗ 📜PositionView.vue
     ┃ ┣ 📂schedule
     ┃ ┃ ┣ 📜DateList.vue
     ┃ ┃ ┗ 📜InfoCard.vue
     ┃ ┣ 📂snackBar
     ┃ ┃ ┣ 📜SnackBar.stories.js
     ┃ ┃ ┣ 📜SnackBar.vue
     ┃ ┃ ┗ 📜index.js
     ┃ ┣ 📂squad
     ┃ ┃ ┣ 📜DateAndQuarter.vue
     ┃ ┃ ┣ 📜InputPosition.vue
     ┃ ┃ ┣ 📜Quarter.vue
     ┃ ┃ ┣ 📜TeamList.vue
     ┃ ┃ ┣ 📜TeamSplit.vue
     ┃ ┃ ┣ 📜TeamSplitList.vue
     ┃ ┃ ┗ 📜soccerField.vue
     ┃ ┣ 📂stadium
     ┃ ┃ ┣ 📜CardList.vue
     ┃ ┃ ┣ 📜Map.vue
     ┃ ┃ ┣ 📜Selector.vue
     ┃ ┃ ┗ 📜Toolbar.vue
     ┃ ┣ 📂team
     ┃ ┃ ┣ 📜Search.vue
     ┃ ┃ ┗ 📜TableList.vue
     ┃ ┣ 📂util
     ┃ ┃ ┣ 📜Loading.vue
     ┃ ┃ ┣ 📜SnackBar.vue
     ┃ ┃ ┗ 📜Spinner.vue
     ┃ ┣ 📂widget
     ┃ ┃ ┗ 📜Basic.vue
     ┃ ┣ 📜.DS_Store
     ┃ ┣ 📜MyButton.vue
     ┃ ┗ 📜index.js
     ┣ 📂constants
     ┃ ┣ 📜nav.json
     ┃ ┗ 📜snackbar.js
     ┣ 📂helpers
     ┃ ┣ 📜image.js
     ┃ ┗ 📜rules.js
     ┣ 📂mixins
     ┃ ┣ 📜auth.js
     ┃ ┣ 📜dialog.js
     ┃ ┣ 📜regex.js
     ┃ ┗ 📜util.js
     ┣ 📂plugins
     ┃ ┣ 📜moment.js
     ┃ ┣ 📜theme.js
     ┃ ┗ 📜vuetify.js
     ┣ 📂router
     ┃ ┣ 📜index.js
     ┃ ┣ 📜index_refactoring.js
     ┃ ┗ 📜routes.js
     ┣ 📂store
     ┃ ┣ 📂modules
     ┃ ┃ ┣ 📜account.js
     ┃ ┃ ┣ 📜attend.js
     ┃ ┃ ┣ 📜calendar.js
     ┃ ┃ ┣ 📜common.js
     ┃ ┃ ┣ 📜game.js
     ┃ ┃ ┣ 📜gameReport.js
     ┃ ┃ ┣ 📜member.js
     ┃ ┃ ┣ 📜personal.js
     ┃ ┃ ┣ 📜prepareMatch.js
     ┃ ┃ ┣ 📜ranking.js
     ┃ ┃ ┣ 📜squad.js
     ┃ ┃ ┣ 📜stadium.js
     ┃ ┃ ┣ 📜team.js
     ┃ ┃ ┗ 📜unitMember.js
     ┃ ┣ 📂modules_refactoring
     ┃ ┃ ┣ 📜account.js
     ┃ ┃ ┗ 📜global.js
     ┃ ┣ 📜constants.js
     ┃ ┣ 📜index.js
     ┃ ┗ 📜index_refactoring.js
     ┣ 📂stories
     ┃ ┣ 📜index.stories.js
     ┃ ┗ 📜index.stories.mdx
     ┣ 📂utils
     ┃ ┣ 📜index.js
     ┃ ┗ 📜sleep.js
     ┣ 📂views
     ┃ ┣ 📂app
     ┃ ┃ ┣ 📜App.vue
     ┃ ┃ ┣ 📜index.js
     ┃ ┃ ┗ 📜props.js
     ┃ ┣ 📂footer
     ┃ ┃ ┣ 📜GameReport.vue
     ┃ ┃ ┣ 📜GameReportDetail.vue
     ┃ ┃ ┣ 📜LeagueReport.vue
     ┃ ┃ ┣ 📜Member.vue
     ┃ ┃ ┣ 📜MemberDetails.vue
     ┃ ┃ ┣ 📜Ranking.vue
     ┃ ┃ ┗ 📜Squad.vue
     ┃ ┣ 📂login
     ┃ ┃ ┣ 📜Login.stories.js
     ┃ ┃ ┣ 📜Login.vue
     ┃ ┃ ┣ 📜index.js
     ┃ ┃ ┣ 📜login.scss
     ┃ ┃ ┗ 📜props.js
     ┃ ┣ 📂nav
     ┃ ┃ ┣ 📂match
     ┃ ┃ ┃ ┗ 📜MatchInput.vue
     ┃ ┃ ┣ 📂member
     ┃ ┃ ┃ ┣ 📜MemberAdd.vue
     ┃ ┃ ┃ ┣ 📜MemberAdmin.vue
     ┃ ┃ ┃ ┗ 📜Profile.vue
     ┃ ┃ ┣ 📂squad
     ┃ ┃ ┃ ┣ 📜MatchPrepare.vue
     ┃ ┃ ┃ ┗ 📜Squad.vue
     ┃ ┃ ┣ 📂stadium
     ┃ ┃ ┃ ┣ 📜Stadium.vue
     ┃ ┃ ┃ ┣ 📜StadiumAdd.vue
     ┃ ┃ ┃ ┗ 📜StadiumUpdate.vue
     ┃ ┃ ┣ 📂team
     ┃ ┃ ┃ ┣ 📜Details.vue
     ┃ ┃ ┃ ┣ 📜TeamAdd.vue
     ┃ ┃ ┃ ┣ 📜TeamAdmin.vue
     ┃ ┃ ┃ ┗ 📜UnitDetails.vue
     ┃ ┃ ┣ 📜Attend.vue
     ┃ ┃ ┣ 📜Schedule.vue
     ┃ ┃ ┗ 📜TeamView.vue
     ┃ ┣ 📂training
     ┃ ┃ ┗ 📜print.vue
     ┃ ┣ 📜Home.vue
     ┃ ┣ 📜Join.vue
     ┃ ┣ 📜Login.vue
     ┃ ┗ 📜NotFound.vue
     ┣ 📜.DS_Store
     ┣ 📜App.vue
     ┣ 📜appspec.yml
     ┣ 📜main.js
     ┣ 📜main_old.js
     ┗ 📜registerServiceWorker.js
  </code>    
</details>
 

## 프로젝트 정보

### ✔ 개발스택
> Front
> Vue: 이 프로젝트의 목적은 빨리 만들어서 써보고 싶었기 때문에 최대한 빠르게 개발할 수 있는 이미 습득한 언어인 Vue를 선택했다.

### ✔ 구현 목록

#### 필수 기능
    
    [Admin] 
    1. 회원관리 기능
    2. 경기장관리 기능
    3. 일정관리 기능
    4. 출결관리 기능
    5. 스쿼드 관리 기능
    6. 경기기록 관리 기능
    
    [User]
    1. 랭킹 뷰
    2. 경기 기록 뷰

## 참고자료

[기획서](https://docs.google.com/presentation/d/1RO_xCGLl5u1MKDj8FHVcyI9sEz4hQd-CjKr8h8eOkFw/edit)

[사용방법 1](https://drive.google.com/file/d/1vYa1_JVz4Ywl3WTfwNgDJoYwxGkIOeDB/view)
[사용방법 2](https://drive.google.com/file/d/1Cb820hNLKVonhLiRS64jxagw9RSElEwS/view)
[사용방법 3](https://drive.google.com/file/d/1L08Ir5vC-jHzuyf7AvlXmb7Nd8fikmqj/view)

