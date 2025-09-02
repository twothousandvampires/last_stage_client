<!doctype html>
<html lang="en">
<style>
    @font-face {
        font-family: o;
        src: url("./fonts/manaspc.ttf");
    }
    html{
        font-family: o;
    }
</style>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <select style="visibility: hidden; position: fixed" name="select_template" id="select_template">
        <option value="swordman">swordman</option>
        <option value="flyer">flyer</option>
        <option value="cultist">cultist</option>
    </select>
     <div id="main">
       <img src="preview/logo.png"   alt="">
    </div>
    <div id="wrap">
        <div id="lobby"></div>
        <div id="canvas-wrap">
            <div id="hud">
                <div id="skill_icons">

                </div>
                <div id="player_stats" >
                    <div id="player_resourses"></div>
                    <div id="player_life"></div>
                </div>
                <div id="meta_info" >
                    <div id="time"></div>
                    <div id="killed"></div>
                </div>
            </div>
            <div style="filter:saturate(83%)">
                <canvas  id="canvas" width="400" height="400"></canvas>
            </div>
            <div id ="status">

            </div>
        </div>
    </div>
    <script type="module" src="index.js"></script>
</body>
</html>
<style>
    body{
        margin: 0;
        padding: 0;
    }
    #main p {
        font-size: 50px;
    }
    #main{
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        cursor: pointer;
    }
    #title .main_title{
        font-size: 20px;
        color: #001e3a;
    }
    #title{
        position: fixed;
        background-color: #2a9eb2;
        width: 400px;
        z-index: 667;
        border: 4px solid #3a7da3;
    }
    .select_ready_equip{
        height: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .pointer{
        cursor: pointer;
        text-align: center;
    }
    .equip_and_image{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    #ready_botton{
        text-align: center;
        width: 100%;
        background-color: #4a4a4a;
        cursor: pointer;
        padding: 8px;
        width: 200px;
    }
    .stat_wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .cannot_use{
        opacity: 0.3;
    }
    .cost_and_buy p{
        padding: 2px;
        text-align: center;
        cursor:  pointer;
        font-size: 18px;
        background-color: #b8860b;
    }
    #realise{
        position: fixed;
        top: 95%;
        left: 95%;
        font-size: 14px;
        color: #e0e07a;
    }
    #lobby_full{
        font-size: 30px;
        position: fixed;
        top: 45%;
        left: 50%;
        color: #e0e07a;
    }
    #hud{
        color: aquamarine;
    }
    .stat{
        display: grid;
        grid-template-columns:10% 80% 10%;
        gap: 10px;
        grid-template-rows: 1;
        width: 80%;
        
    }
    .stat p {
        text-align: center;
    }
    #stats{
        display: flex;
        flex-direction: column;
    }
    #canvas-wrap{
        height: 100%;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        display: none;
        flex-direction: column;
    }
    #player{
        visibility: hidden;
        display: flex;
        flex-direction: row;
    }
    #wrap{
        background-color: black;
        width: 100%;
        height: 100vh;
        display: none;
    }
    #lobby{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        grid-template-rows: 15% repeat(3, 1fr);
        height: 100vh; 
    }
    /* .lobby_cap{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      grid-column: 1 / 3;  
    } */
    .item_pull, .abilities_pull{
        background-color: #e0e07a;
        border: 8px solid #7a7a3a;
    }
    .item_pull{
        grid-column: 1;
     }
    .abilities_pull{
        grid-column: 2;
     }
    .player1 {
        grid-column: 1;
        grid-row: 2;
    }
    .player2 {
        grid-column: 2;
        grid-row: 2;
    }
    .player3 {
        grid-column: 1;
        grid-row: 3;
    }
    .player4 {
        grid-column: 2;
        grid-row: 3;
    }
    .player {
        background-color: #b8b85c;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border: 8px solid #7a7a3a;
        font-size: 18px;
    }
    .item_pull, .abilities_pull{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .select_and_preview{
        display: flex;
        flex-direction: column;
    }
    .right_top{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 80%;
    }
    .right_bottom{
        border-top: 8px solid #7a7a3a;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .right_block{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .selected_skill_div{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }
    .right_block{
        width: 60%;
    }
    .left_block{
        border-left: 8px solid #7a7a3a;
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    #player_stats, #meta_info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    #status{
        display: flex;
        flex-direction: row;
        justify-content: start;
        min-height: 54px;
    }
    .forge_item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #forge{
        z-index: 666;
        position: fixed;
        width: 800px;
        left: calc(50% - 400px);
        height: 500;
        top: calc(50% - 250px);
        background-color: #b8b85c;
        border: 6px solid #7a7a3a;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
    #upgrades{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-between;
        z-index: 666;
        position: fixed;
        width: 400px;
        left: calc(50% - 200px);
        height: 220px;
        top: calc(50% - 110px);
        background-color: #b8b85c;
        border: 6px solid #7a7a3a;
    }
    #hold_grace{
        width: 100%;
        background-color: #ff8c00;
        cursor: pointer;
    }
    #upgrades_list{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
    #upgrades p {
        color: aliceblue;
        font-size: 12px;
        text-align: center;
    }
    #upgrades div{
        
    }
    #upgrades div .underdiv{
        padding: 4px;
        background-color: wheat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>