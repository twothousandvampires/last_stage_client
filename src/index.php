<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Cache-Control" content="max-age=3600">
    <title>Last stage</title>
    <script src="https://cdn.socket.io/4.4.1/socket.io.min.js"></script>
<body>
    <select style="visibility: hidden; position: fixed" name="select_template" id="select_template">
        <option value="swordman">swordman</option>
        <option value="flyer">flyer</option>
        <option value="cultist">cultist</option>
    </select>
     <div id="main">
       <img id="logo" src="preview/logo.png" alt="logo">
    </div>
    <div id="wrap">
        <div id="top-panel">
            <p style="margin-right: 20px;" id="info">info</p>
            <p id='record'>records</p>
            <div id="game-info">
                <h1 style="text-align: center;">LAST STAGE</h1>
                <div id="modile-info">
                    <h3>Smartphone movement</h3>
                    <p>
                        If you play on a smartphone, there are 2 sticks.The first one is for movement, the second one is for using abilities.
                        The distance from the center of the second stick will determine how far away the point on the map will be, if the ability requires it.
                    </p>
                </div>
                <h3>There are 2 types of resources in the game:</h3>
                <ul>
                    <li>energy</li>
                    <li>courage (hidden)</li>
                </ul>
                <h4>Each class gets them differently:</h4>
                <ul>
                    <li>Swordsman gains energy when dealing damage with abilities, courage when killing</li>
                    <li>The sorcerer gains energy over time, courage when using the spell</li>
                    <li>The cultist gains courage and energy when receiving damage</li>
                </ul>
                <p>
                    Each ability except the last one does not consume energy, you just need to have enough energy to use it.
                    The last ability consumes energy when used. Utility skills only have a cooldown.
                    The main gameplay is using the first skill, getting enough energy for the second, and then using the last one.
                </p>
                <p>
                    Utility uses by pressing 'E'.
                </p>
                <p>Courage hiddenly affects the strength of skills and the character, and is lost when receiving damage.</p>
                <br>

                <h3>Damage system</h3>
                <p>
                    There is no so-called damage amount in the game. There is simply DAMAGE, let's imagine it as just a one damage. Any ability deals one damage.
                    There are 2 ways to decrease or increase it. The one who deals damage is affected by the critical strike characteristic, which gives a chance to deal double damage.
                    The one who receives damage may have the negative "FRAGILE" status, which doubles the damage received.
                    <h4>
                        If pierce rating is higher than armour rating you have a chance to deal additional damage.
                    </h4>
                    <p>
                        So for now maximum damage is 8. 1(default) + 1(from pierce) * 2 (double damage) * 2 (fragile stutus on target)
                    </p>
                </p>
                </br>

                <h3>Defending mechanics:</h3>
                <h4>Life</h4>
                <p>
                    The player starts with 3 lives, and regenerates them over time. 
                    By default, you can't regenerate more than 3, but there are ways to bypass it (for example, "LUST FOR LIFE"<span><img width="60px" height="60px" src="icons/lust for life.png" title="you can learn it by grace"></span>.). 
                    If you have more than 3 lives, your status will be - "BLESSED".
                </p>
                 <h4>Ward</h4>
                <p>
                    There is another defensive mechanic in the game - "WARD". If you have a ward, when you receive damage it will be spent, triggers for receiving damage will not work in this case.
                    <img src="/preview/ward.png" width="120px" height="120px">
                </p>
                <h4>Block</h4>
                <p>You can block damage by pressing space, each class has a different block chance and it can be increased in different ways.</p>
                <p>You immediately enter a blocked state after pressing SPACE. Don't rely on the animation.</p>

                <h4>Armour rate</h4>
                <p>
                    The units have an armor rating, which is calculated if there was no block, the armor rating gives a chance not to receive damage, the "PIERCE" <span><img width="60px" height="60px" src="icons/pressure.png" title="you can learn it by grace"> characteristic helps to bypass the armor. 
                    Enemies can also have armor and this "PIERCE"</span>.
                </p>
                <h4>
                    If armour rating is higher than pierce rating you have a chance to block damage.
                </h4>
                </br>

                <h3>Other:</h3>
                <h4>The player has 2 currencies:</h4>
                <p>
                    <ul>
                        <li>grace (spent on improving the character, buying and improving new/existing skills, getting strong buffs for a while)</li>
                        <li>gold (spent on purchasing and upgrading items)</li>
                    </ul>
                </p>
                <p>
                    In total you can have 6 items, 2 you take at the beginning, 2 you buy, 2 you find.
                </p>

                </br>
                <h3>Game drop:</h3>
                <p>
                    When killing enemies, you will get something:
                    <ul>
                        <li>Grace - gives you 1 grace <span><img width="120px" height="120px" src="preview/grace.png"></span></li>
                        <li>Essence - increases health and briefly increases vision radius <span><img  width="120px" height="120px" src="preview/entity.png"></span></li>
                        <li>Energy sphere - gives 2 energy and phasing<span><img width="120px" height="120px" src="preview/charged_sphere.png"></span></li>
                        <li>Rift - spends 1 grace and casts a powerful spell <span><img class="bg" width="120px" height="120px" src="preview/split.gif"></span></li>
                        <li>Item - gives a random item <span><img  width="120px" height="120px" src="preview/item_drop.gif"></li>
                    </ul>
                </p>
                <h4>If you kill a enemy by youself you will get gold.</h4>

                </br>
                <h3>Portal</h3>
                <p>Periodically a portal will appear where you can spend gold and grace to improve the character.<span><img class="bg" width="120px" height="120px"" src="preview/grace_portal.png"></p>

                </br>
                <h3>Statuses</h3>
                <p>During the game, negative and positive statuses will be applied to you, for example:
                    <ul>
                        <li>weakness - you can't block and receive energy <span><img width="60px" height="60px" src="icons/weakness.png"></span></li>
                        <li>poison - you can't gain life <span><img width="60px" height="60px" src="icons/poison.png"></span></li>
                        <li>stream - receiving energy every 2 seconds <span><img width="60px" height="60px" src="icons/stream.png"></span></li>
                        <li>immortality - you can't take damage <span><img width="60px" height="60px" src="icons/immortality.png"></span></li>
                        <li>phasing - you can move through enemies <span><img width="60px" height="60px" src="icons/phase.png"></span></li>
                        <li>etc.</li>
                    </ul>
                </p>
                <h2>HAFE FUN!</h2>
            </div>
        </div>
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
</div>
</div>
    <script src="bundle.js"></script>
</body>
</html>
<style>
    body{
        background-color: black;
    }
     @font-face {
        font-family: o;
        src: url("./fonts/manaspc.ttf");
    }
    html{
        font-family: o;
    }
    body{
        margin: 0;
        padding: 0;
    }
    #logo{
        width: 1380px;
        height: 920px;
    }
    @media (max-width: 425px) {
        #logo{
            width: 276px;
            height: 184px;
        }
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
    @media (max-width: 425px) {
        #title .main_title{
            font-size: 12;
        }
    }
    #title{
        position: fixed;
        background-color: #2a9eb2;
        width: 400px;
        z-index: 667;
        border: 4px solid #3a7da3;
    }
    @media (max-width: 425px) {
        #title{
            font-size: 8px;
            position: fixed;
            background-color: #2a9eb2;
            width: 200px;
            z-index: 667;
            border: 4px solid #3a7da3;
        }
    }
    .select_ready_equip{
        height: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    @media (max-width: 425px) {
        .select_ready_equip {
            background-color: #b8b85c;
            align-items: flex-start;
            height: 130px;
        }
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
    @media (max-width: 425px) {
        #ready_botton {
            width: 150px;
        }
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
        left: 40%;
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
    @media (max-width: 425px) {
        #lobby{
            display: flex;
            flex-direction: column;
            grid-template-rows: 15% repeat(3, 1fr);
            height: 100vh;
        }
        #lobby p{
            font-size: 14px;
        }
    }
    .build{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    .build p {
        cursor: pointer;
        padding: 2px;
        background-color: #b8860b;
        margin: 4px;
    }
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
    @media (max-width: 425px) {
        .player{
            flex-direction: column;
        }
    }
    .item_pull, .abilities_pull{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow-y: auto;
    }
    @media (max-width: 425px) {
        .item_pull{
            flex-wrap: wrap;
        }
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
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    @media (max-width: 425px) {
        .right_block{
            width: 90%;
        }
    }
    .selected_skill_div{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
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
    @media (max-width: 425px) {
        .left_block{
            align-items: flex-end;
            justify-content: center;
            width: 90%;
            border-left: none;
        }
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
        top: calc(50% - 250px);
        background-color: #b8b85c;
        border: 6px solid #7a7a3a;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
    #record-name-input{
        padding: 6px;
        z-index: 668;
        position: fixed;
        width: auto;
        height: 120px;
        left: calc(50% - 180px);
        top: calc(50% - 60px);
        background-color: #b8b85c;
        border: 6px solid #7a7a3a;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #record-name-input .bot{
        width: 60%;
        display: flex;
        flex-direction: column;
    }
    #suggest{
        z-index: 667;
        position: fixed;
        width: 800px;
        left: calc(50% - 400px);
        top: calc(50% - 250px);
        background-color: #b8b85c;
        border: 6px solid #7a7a3a;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
    @media (max-width: 425px) {
        #forge{
            width: 400px;
            left: calc(50% - 200px);
            font-size: 10px;
        }
        #forge img{
            width: 40px;
            height: 40px;
            
        }
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
        word-wrap: break-word;
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
    #second-touch-zone{
        background-image: url('/preview/joystick.png');
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: fixed;
        bottom: 15%;
        left: 60%;
        z-index: 1000;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: none;
        display: flex;
        flex-direction: column;
        touch-action: none;
    }
    #touch-zone{
        background-image: url('/preview/joystick.png');
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: fixed;
        bottom: 15%;
        left: 12%;
        z-index: 1000;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: none;
        display: flex;
        flex-direction: column;
        touch-action: none;
    }
    #modile-info{
        display: none;
    }
    #defend_and_special{
        position: fixed;
        bottom: 13%;
        width: 40px;
        left: 50%;
        z-index: 1000;
        height: 150px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    #defend {
        width: 40px;
        height: 40px;
        background-image: url('./preview/defend.png');
    }
    #special {
        width: 40px;
        height: 40px;
        background-image: url('./preview/special.png');
    }
    #records_table{
        width: 40%;
        position: fixed;
        top: 25%;
        background-color: #e0e07a;
        left: 30%;
        height: 25%;
        padding: 6px;
        border: 4px solid #7a7a3a;
    }
    #records_table table{
        width: 100%;
    }
    #game-info{
        display: none;
        width: 80%;
        position: fixed;
        top: 5%;
        background-color: #e0e07a;
        overflow-y: scroll;
        height: 90%;
        padding: 6px;
        border: 4px solid #7a7a3a;
    }
    #game-info .bg{
        background-color: #1e1e1e;
    }
    #top-panel{
        z-index: 666666666666;
        background-color: #3a7da3;
        position: sticky;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        position: sticky;
    }
    #top-panel p{
        cursor: pointer;
        font-size: 18px;
    }
</style>