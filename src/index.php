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
    <select style="visibility: hidden" name="select_template" id="select_template">
        <option value="swordman">swordman</option>
        <option value="flyer">flyer</option>
        <option value="cultist">cultist</option>
    </select>
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
    .pointer{
        cursor: pointer;
        width: 40px;
        text-align: center;
    }
    .stat_wrap{
        border: 10px solid transparent;
        border-image: url('img/client/frame1.png') 30 round;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .cannot_use{
        opacity: 0.3;
    }
    #hud{
        color: aquamarine;
    }
    .stat{
        display: flex;
        flex-direction: row;
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
        display: flex;
        flex-direction: column;
    }
    #player{
        visibility: hidden;
        display: flex;
        flex-direction: row;
    }
    #wrap{
        background-color: black;
        width: 100vw;
        height: 100vh;
    }
    #lobby{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        grid-template-rows: repeat(2, 1fr);
    }
    .player1 {
        grid-column: 1;
        grid-row: 1;
    }
    .player2 {
        grid-column: 2;
        grid-row: 1;
    }
    .player3 {
        grid-column: 1;
        grid-row: 2;
    }
    .player4 {
        grid-column: 2;
        grid-row: 2;
    }
    .player{
        background-color: aqua;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .item_pull{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        grid-column: 3;
        grid-row: 1 / 3;
    }
    .select_and_preview{
        display: flex;
        flex-direction: column;
    }
    .right_top{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .right_bottom{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
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
        width: 40%;
    }
    #player_stats{
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
    #upgrades{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-between;
        z-index: 666;
        position: fixed;
        width: 300px;
        left: calc(50% - 150px);
        height: 150px;
        top: calc(50% - 75px);
        background-color: goldenrod;
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
        max-width: 80px;
    }
    #upgrades div .underdiv{
        padding: 4px;
        background-color: wheat;
    }
</style>