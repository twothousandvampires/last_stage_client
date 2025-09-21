import Sound from "./Sound"

export default class UI{
    socket: any

    constructor(socket: any){
        this.socket = socket
    }

    createImage(path: string, width = 50, height = 50): HTMLElement{
        let image = new Image()
        image.width = width
        image.height = height
        image.src = path

        return image
    }

    updateSkill(data){
        let skill_icons = document.getElementById('skill_icons')
        skill_icons.innerHTML = ''

        data.forEach(elem => {
            let img = this.createImage('./icons/' + elem.name + '.png')
            img.id = elem.type
            skill_icons.appendChild(img)
        })
    }

    createParagraph(text: string): HTMLElement{
        let p = document.createElement('p')
        p.innerText = text

        return p
    }

    createAvailableSkillsBlock(skills: [], title: string){

        let div = document.createElement('div')
        div.style.margin = '4px'
        let p = this.createParagraph(title)
        p.style.fontSize = '12px'
        div.appendChild(p)
        
        let div_wrap = document.createElement('div')

        skills.forEach(elem => {
            let image = this.createImage('./icons/' + elem.name + '.png')
            image.style.margin = '2px'
            image.addEventListener('click', () => {
                Sound.setSound('select_skill')
                this.socket.emit('select_skill', elem.name)

            })
            this.applyTitle(image, {
                main_title: elem.name,
                text: elem.desc
            })
            div.appendChild(image)
            div_wrap.appendChild(div)
        })

        return div_wrap

    }
    createDiv(classes: string): HTMLElement{
        let div = document.createElement('div')
        div.className +=classes

        return div
    }
    getSelectedSkillByType(abilities: any, type: number){
        return abilities.find(elem => elem.type === type && elem.selected)
    }
    createParagraphAppend(text: string, parent: HTMLElement): HTMLElement{
        let p = this.createParagraph(text)
        parent.appendChild(p)

        return p
    }

    createSelect(item: any): any{
        let template = document.getElementById('select_template')
        if(!template) return

        let select = template.cloneNode(true)
        // template?.parentNode?.removeChild(template)

        select.style.visibility = 'visible'

        select.addEventListener('change', (e) => {
            this.socket.emit('change_class', e.target.value)
        })

       
        select.style.position = 'static'
        select.value = item.name
        select.style.width = '100%'

        return select
    }

    createTitle(title_text: any, e: any){
       this.closeTitle()
       
        let title_div = this.createDiv('')
        let text = this.createParagraph('')
        
        let main_title = undefined

        if(typeof title_text === 'object'){
            text.innerText = title_text.text
            if(title_text.main_title){
                main_title = this.createParagraph(title_text.main_title)
                main_title.classList = 'main_title'
            }
        }
        else{
             text.innerText = title_text
        }

        title_div.id = 'title'
        title_div.style.top = (e.pageY + 15) + 'px'
        title_div.style.left = (e.pageX  + 15) + 'px'

        if(main_title){
            title_div.appendChild(main_title)
        }
        title_div.appendChild(text)

        title_div.addEventListener('touchstart' ,() => {
            this.closeTitle()
        })

        document.getElementsByTagName('body')[0].appendChild(title_div)

        const rect = title_div.getBoundingClientRect();

        if(rect.bottom > window.innerHeight){
            title_div.style.top = (e.pageY - rect.height- 15) + 'px'
        }
        if(rect.right > window.innerWidth){
            title_div.style.left = (e.pageX - rect.width - 15) + 'px'
        }
    }

    closeTitle(){
        let exist = document.getElementById('title')
        if(exist){
            exist.parentNode?.removeChild(exist)
        }
    }

    applyTitle(elem, info, with_cursor = true){
        if(with_cursor){
              elem.style.cursor = 'help'
        }
      
        elem.addEventListener('mouseover', (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.createTitle(info, e)
        })

        elem.addEventListener('mouseleave' , (e) => {
            this.closeTitle()
        })
    }

    createRealiseBar(data){
        let info = data.realise

        if(data.realise_info){
           info += (" " + data.realise_info)
        }

        let bar = this.createParagraph(info)
        bar.id = 'realise'
    
        document.getElementsByTagName('body')[0].appendChild(bar)
    }

    createRecordsTable(data){
        let exist = document.getElementById('records_table')

        if(exist){
            return
        }


        let parent = this.createDiv('')

        parent.addEventListener('click', () => {
            parent.parentNode?.removeChild(parent)
        })

        parent.id = 'records_table'
        data = data[0]

        let table = document.createElement('table')
        let th = document.createElement('tr')
        th.style.fontSize = '18px'
        th.style.fontWeight = 'bold'

        let type = document.createElement('td')
        type.innerText = 'class'
        th.appendChild(type)

        let name = document.createElement('td')
        name.innerText = 'name'
        th.appendChild(name)

         let kills = document.createElement('td')
        kills.innerText = 'kills'
        th.appendChild(kills)

        let date = document.createElement('td')
        date.innerText = 'date'
        th.appendChild(date)

        table.appendChild(th)

        for(let i = 0; i < data.length; i++){
            let e = data[i]
            let tr = document.createElement('tr')

            let type = document.createElement('td')
            type.innerText = e.class
            tr.appendChild(type)

            let name = document.createElement('td')
            name.innerText = e.name
            tr.appendChild(name)

            let kills = document.createElement('td')
            kills.innerText = e.kills
            tr.appendChild(kills)

            let date = document.createElement('td')
            date.innerText = e.created.split('T')[0]
            tr.appendChild(date)


            table.appendChild(tr)
        }
        parent.appendChild(table)

        document.getElementsByTagName('body')[0].appendChild(parent)
    }

    createStats(item: any){
        let wrap = document.createElement('div')
        wrap.className = 'stat_wrap'

        let build = this.createDiv('build')
        let save = this.createParagraphAppend('save build', build)
        let load = this.createParagraphAppend('load build', build)

        save.addEventListener('click', () => {
            localStorage.setItem(item.template.name, JSON.stringify(item.template))
        })

        load.addEventListener('click', () => {
            let data = JSON.parse(localStorage.getItem(item.template.name))
            if(!data) return 
            if(data.name != item.template.name) return

            let skills = data.abilities.filter(elem => elem.selected)
            
            skills.forEach(elem => {
                this.socket.emit('select_skill', elem.name)
            })

            data.item.forEach(elem => {
                this.socket.emit('pick_item', elem.name)
            })

            let keys = Object.keys(data.stats)


            keys.forEach(stat_name => {
                for(let i = 0;i < item.template.stats[stat_name] - data.stats[stat_name]; i++){
                    this.socket.emit('decrease_stat', stat_name)
                }
            })
            
            keys.forEach(stat_name => {
                for(let i = 0; i < data.stats[stat_name] - item.template.stats[stat_name]; i++){
                    this.socket.emit('increase_stat', stat_name)
                }
            })
            
        })

        wrap.appendChild(build)

        this.createParagraphAppend('remain stat points: ' + item.template.stat_count, wrap)

        for(let stat in item.template.stats){
            let dec = this.createParagraph(item.id === this.socket.id ? '-' : ' ')
            dec.className = 'pointer'

            dec.addEventListener('click', () => {
                if(item.template.stats[stat] <= 0 || item.id !== this.socket.id) return

                Sound.setSound('menu button')
                this.socket.emit('decrease_stat', stat)
            })
            
            let stat_name = this.createParagraph(stat + ' : ' + item.template.stats[stat])
            this.applyTitle(stat_name, {
                main_title: stat,
                text: item.template.stats_description[stat]
            })

            let inc = this.createParagraph(item.id === this.socket.id ? '+' : ' ')
            inc.className = 'pointer'
            
            inc.addEventListener('click', () => {
                if(item.template.stat_count <= 0 || item.id !== this.socket.id) return

                Sound.setSound('menu button 2')
                this.socket.emit('increase_stat', stat)
            })
            
            let div = document.createElement('div')
            div.className = 'stat'
            div.appendChild(dec)
            div.appendChild(stat_name)
            div.appendChild(inc)
        
            wrap?.appendChild(div)
        }

        return wrap
    }
    createBlock(item: any, index: number){
        
        let wrap = document.createElement('div')

        let left = this.createDiv('left_block')
        let right = this.createDiv('right_block')

        let stats = this.createStats(item)
        left.appendChild(stats)

        let select = this.createSelect(item.template)
        let preview = this.createImage('./preview/' + item.template.name + '.gif', 160, 160)

        let right_top = this.createDiv('right_top')
    
        let select_preview = this.createDiv('select_and_preview')

        let ready = this.createParagraph(item.ready ? 'cancel' : 'ready')

        ready.id = 'ready_botton'

        ready.addEventListener('click', () => {
            this.socket.emit('player_ready')
        })
       
        select_preview.appendChild(preview)
       
        right_top.appendChild(select_preview)

        let select_ready_equip = this.createDiv('select_ready_equip')

        select_ready_equip.appendChild(select)

        let div = this.createDiv('equip_and_image')
        let e_p = this.createParagraph("equip: ")
        div.appendChild(e_p)
     
        item.template.item.forEach(item => {
            let image = this.createImage('./icons/' + item.name+ '.png')

            this.applyTitle(image, {
                main_title: item.name,
                text: ''
            })
            image.addEventListener('click', () => {
                Sound.setSound('menu item drop')
                this.socket.emit('unpick_item', item.name)
            })
            
            div.appendChild(image)     
        })

        select_ready_equip.appendChild(div)
        select_ready_equip.appendChild(ready)

        right_top.appendChild(select_ready_equip)

        right.appendChild(right_top)

        let skills = this.createDiv('right_bottom')

        let main = this.getSelectedSkillByType(item.template.abilities, 1)

        let second = this.getSelectedSkillByType(item.template.abilities, 2)

        let third = this.getSelectedSkillByType(item.template.abilities, 3)

        let utility = this.getSelectedSkillByType(item.template.abilities, 4)

        let main_div = this.createDiv('selected_skill_div')

        let p = this.createParagraph('main: ' + main.name)
        let image = this.createImage('./icons/' + main.name + '.png')
        this.applyTitle(image, {
                main_title: main.name,
                text: main.desc
            })
        

        main_div.appendChild(p)
        main_div.appendChild(image)

        skills.appendChild(main_div)

        let second_div = this.createDiv('selected_skill_div')

        p = this.createParagraph('secondary: ' + second.name)

        if(index === 0){
            p.addEventListener('click', () => {
                this.socket.emit('set_start_scenario', 'learning')
            })
        }
        image = this.createImage('./icons/' + second.name + '.png')
        this.applyTitle(image, {
                main_title: second.name,
                text: second.desc
            })

        second_div.appendChild(p)
        second_div.appendChild(image)

        skills.appendChild(second_div)

        let third_div = this.createDiv('selected_skill_div')

        p = this.createParagraph('finisher: ' + third.name)
        image = this.createImage('./icons/' + third.name + '.png')
        this.applyTitle(image, {
                main_title: third.name,
                text: third.desc
            })
        

        third_div.appendChild(p)
        third_div.appendChild(image)

        skills.appendChild(third_div)

        let utility_div = this.createDiv('selected_skill_div')

        p = this.createParagraph('utility: ' + utility.name)
        image = this.createImage('./icons/' + utility.name + '.png')
        this.applyTitle(image, {
                main_title: utility.name,
                text: utility.desc
            })
        
        utility_div.appendChild(p)
        utility_div.appendChild(image)

        skills.appendChild(utility_div)
        
        right.appendChild(skills)

        wrap.append(right)
          wrap.append(left)
       
        return wrap
    }

    showGameCanvas(players_data: any){
        let section = document.getElementById('lobby')
        section?.parentNode?.removeChild(section)
        
        let players_skills = players_data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => elem.selected)
        let skill_icons = document.getElementById('skill_icons')
        skill_icons.innerHTML = ''

        players_skills.forEach(elem => {
            let img = this.createImage('./icons/' + elem.name + '.png')
            if(elem.type === 1){
                img.id = 'first'
            }
            if(elem.type === 2){
                img.id = 'secondary'
            }
            if(elem.type === 3){
                img.id = 'finisher'
            }
            if(elem.type === 4){
                img.id = 'utility'
            }
            skill_icons.appendChild(img)
        })

        section = document.getElementById('canvas-wrap')
        let template = document.getElementById('select_template')

        template.parentNode.removeChild(template)

        section.style.display = 'flex'
        section.style.visibility = 'visible'
    }

    updateStats(data: any, items: any){
        this.closeTitle()
        // fill a lobby
        let lobby = document.getElementById('lobby')
        
        if(!lobby) return
        
        lobby.innerHTML = ''

        // items
        let items_div = this.createDiv('item_pull')

        items.forEach(item => {
            let image = this.createImage('./icons/' + item.name + '.png')
            this.applyTitle(image, {
                main_title: item.name,
                text: item.description
            })
            
            image.style.margin = '2px'

            image.addEventListener('click', () => {
                Sound.setSound('menu item take')
                this.socket.emit('pick_item', item.name)
            })

            items_div.appendChild(image)
        })

        lobby.appendChild(items_div)

        let avalable_main_skills = data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => !elem.selected && elem.type === 1)
        let avalable_secondary_skills = data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => !elem.selected && elem.type === 2)
        let avalable_finishers_skills = data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => !elem.selected && elem.type === 3)
        let avalable_utility_skills = data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => !elem.selected && elem.type === 4)

        // abilities
        let abilities_div = this.createDiv('abilities_pull')

        abilities_div.appendChild(this.createAvailableSkillsBlock(avalable_main_skills, 'available main skills: '))
        abilities_div.appendChild(this.createAvailableSkillsBlock(avalable_secondary_skills, 'available secondary skills: '))
        abilities_div.appendChild(this.createAvailableSkillsBlock(avalable_finishers_skills, 'available finishers skills: '))
        abilities_div.appendChild(this.createAvailableSkillsBlock(avalable_utility_skills, 'available utility skills: '))

        lobby.appendChild(abilities_div)

        data.sort((a, b) => {
            return a.id === this.socket.id ? -1 : 1
        })

        data.forEach((item, index) => {
            let block = this.createBlock(item, index)
            block.classList += 'player player' + (index + 1)
            if(item.ready){
                block.style.backgroundColor = '#e0e07a'
            }
            lobby.appendChild(block)
        });
    }

    deleteStatus(name: string){
        let exist = document.getElementById('status_' + name)

        if(exist){
            exist.parentNode?.removeChild(exist)
            this.closeTitle()
        }
    }

    newStatus(status: any){
    
        let exist = document.getElementById('status_' + status.name)

        if(exist){
            exist.parentNode?.removeChild(exist)
        }

        let wrap = document.getElementById('status')

        let div = document.createElement('div')
        div.id = 'status_' + status.name

        let img = this.createImage('./icons/' + status.name + '.png')

        this.applyTitle(img, {
            main_title: status.name,
            text: status.desc
        })
        
        div.appendChild(img)

        wrap?.appendChild(div)

        if(status.duration){
            setTimeout(() => {
                if(div){
                    div.parentNode?.removeChild(div)
                    this.closeTitle()
                }
            }, status.duration)
        }
        
    }

    createSuggestRecord(kills: number = 666){
        let exist = document.getElementById('suggest')
        
        if(exist){
            return
        }

        let parrent = this.createDiv('')
        parrent.id = 'record-name-input'
        
        let top = this.createDiv('')
        let kills_p = this.createParagraph(kills + ' ' +  'enemies defeated, who are you stranger?')
        top.appendChild(kills_p)

        let bot = this.createDiv('bot')

        let p = document.createElement('input')
        p.style.marginBottom = '6px'
        let b = document.createElement('button')
        b.innerText = 'remember me as...'

        b.addEventListener('click', () => {
            let name = p.value  
            if(name != ''){
                this.socket.emit('add_record', name)
                this.closeSuggest()
            }
        })

        bot.appendChild(p)
        bot.appendChild(b)
        
        parrent.appendChild(top)
        parrent.appendChild(bot)

        document.getElementsByTagName('body')[0].appendChild(parrent)
    }


    createSuggestForgings(data, item_id){
        let exist = document.getElementById('suggest')
        
        if(exist){
            return
        }

        let parrent = document.createElement('div')
        parrent.id = 'suggest'

        data.forEach((item, index) => {
            let wrap = this.createDiv('forge_item')
            let p = this.createParagraph(item.name)

            this.applyTitle(p, {
                main_title: item.name,
                text: item.description
            })

            p.addEventListener('click', (e) => {
                e.stopPropagation()
                this.socket.emit('pick_forging', item_id, index)
            })

            wrap.appendChild(p)
            wrap.addEventListener('click', () => {
                this.closeSuggest()
            })
            parrent.appendChild(wrap)

        })

        document.getElementsByTagName('body')[0].appendChild(parrent)
    }

    createSuggestItem(data){
        let exist = document.getElementById('suggest')
        
        if(exist){
            return
        }

        let parrent = document.createElement('div')
        parrent.id = 'suggest'

        data.forEach((item, index) => {
            let wrap = this.createDiv('forge_item')
            let img = this.createImage('./icons/' + item.name + '.png', 80, 80)
            this.applyTitle(img, {
                main_title: item.name,
                text: item.description
            })

            img.addEventListener('click', (e) => {
                e.stopPropagation()
                this.socket.emit('buy_item', index)
                Sound.setSound('gold spending')
            })

            wrap.appendChild(img)
            wrap.addEventListener('click', () => {
                this.closeSuggest()
            })
            parrent.appendChild(wrap)
        })

        document.getElementsByTagName('body')[0].appendChild(parrent)
    }

    closeSuggest(){
        let exist = document.getElementById('suggest')
        
        if(exist){
            exist.parentNode?.removeChild(exist)
        }
    }

    showForgings(data: any){
        let exist = document.getElementById('forge')
        
        if(exist){
            return
        }

        let parrent = document.createElement('div')
        parrent.id = 'forge'

        let cost_and_buy = this.createDiv('cost_and_buy')

        let gold = this.createParagraph('gold: ' + data.gold)
        cost_and_buy.appendChild(gold)

        let donate = this.createParagraph('donate')

        donate.addEventListener('click', () => {
            if(data.gold >= 20){
                this.socket.emit('donate')
                Sound.setSound('donate')
            }
        })

        this.applyTitle(donate, {
            main_titl: undefined,
            text: 'donate 20g to get 1 grace'
        }, false)

        cost_and_buy.appendChild(donate)

        if(data.can_buy){
            let buy = this.createParagraph('buy item')

            this.applyTitle(buy, {
                main_titl: undefined,
                text: 'buy new random item for 30g'
            },false)

            buy.addEventListener('click', () => {
                this.socket.emit('buy')
            })

            gold.style.fontSize = '20px'
            cost_and_buy.appendChild(buy)
        }

        parrent.appendChild(cost_and_buy)

        data.items.forEach(item => {
            let wrap = this.createDiv('forge_item')
            let img = this.createImage('./icons/' + item.name + '.png', 80, 80)

            this.applyTitle(img, {
                main_title: item.name,
                text: item.description + '\n\n unlock forging for ' + (item.forge.length * 5 + 5) + 'g'
            })

            if(item.forge.length < item.max_forgings){
                img.addEventListener('click', () => {
                    this.socket.emit('unlock_forging', item.name)
                })

                this.applyTitle(img, {
                    main_title: item.name,
                    text: item.description + '\n\n unlock forging for ' + (item.forge.length * 5 + 5) + 'g'
                })
            }
            else{
                this.applyTitle(img, {
                    main_title: item.name,
                    text: item.description + '\n\n maximum forgings'
                })
            }
    
            wrap.appendChild(img)
        
            item.forge.forEach((forge, index) =>{
                let p = this.createParagraph(forge.name)

                this.applyTitle(p, {
                    main_title: forge.stat,
                    text: 'cost: ' + forge.cost 
                })

                if(forge.can){
                     p.addEventListener('click', () => {
                        this.socket.emit('forge_item', {
                            item_name: item.name,
                            forge: index
                        })
                    })

                    p.style.cursor = 'pointer'
                }
                else{
                    p.style.color = 'red'
                }
               
                wrap.appendChild(p)
            })

            parrent.appendChild(wrap)
        })

        document.getElementsByTagName('body')[0].appendChild(parrent)
    }

    closeForgings(){
        let exist = document.getElementById('forge')

        if(exist){
            exist.parentNode?.removeChild(exist)
        }

        this.closeTitle()
    }

    showUpgrades(data: any){
        let exist = document.getElementById('upgrades')

        if(exist){
            return
        }
        
        let parrent = document.createElement('div')
        let wrap = document.createElement('div')
        wrap.id = 'upgrades_list'
        parrent.id = 'upgrades'
       
        data.upgrades.forEach(elem => {
            let div =  document.createElement('div')
            div.style.minWidth = '130px'
            let under_div = document.createElement('div')
            under_div.className = 'underdiv'

            let img = this.createImage('./icons/' + elem.name + '.png', 80, 80)
            img.addEventListener('click', () => {
                this.socket.emit('select_upgrade', elem.name)
            })
            this.applyTitle(img, {
                main_title: elem.name + (elem.type ? '(' + elem.type + ')' : ''),
                text: elem.desc
            })
            
            under_div.appendChild(img)

            let cost_and_name = document.createElement('div')
            let p_name = this.createParagraph(elem.name)
            let p_cost = this.createParagraph(elem.cost)

            cost_and_name.appendChild(p_name)
            cost_and_name.appendChild(p_cost)
        
            div.appendChild(under_div)
            div.appendChild(cost_and_name)

            wrap.appendChild(div)
        })

        parrent.appendChild(wrap)

        let wrap2 = document.createElement('div')

        let grace_count = this.createParagraph('grace: ' + data.grace)
        grace_count.style.fontSize = '18px'

        wrap2.appendChild(grace_count)
        
        if(data.can_hold){
            let hold = this.createParagraph('hold')
            hold.id = 'hold_grace'
            hold.addEventListener('click', () => {
                this.socket.emit('hold_grace')
            })
            wrap2.appendChild(hold)
            this.applyTitle(hold, {
                main_title: 'hold grace',
                text: 'if you haven nott spent any grace, you can cancel this one and get 3 grace'
            })
        }

        parrent.appendChild(wrap2)

        document.getElementsByTagName('body')[0].appendChild(parrent)
    }

    clsoeUpgrades(){
        let exist = document.getElementById('upgrades')

        if(exist){
            exist.parentNode?.removeChild(exist)
        }

        this.closeTitle()
    }
}