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
        let p = this.createParagraph(title)
        div.appendChild(p)
        
        let div_wrap = document.createElement('div')

        skills.forEach(elem => {
            let image = this.createImage('./icons/' + elem.name + '.png')
            image.style.margin = '2px'
            image.addEventListener('click', () => {
                Sound.setSound('taunt')
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
    createParagraphAppend(text: string, parent: HTMLElement): void{
        let p = this.createParagraph(text)
        parent.appendChild(p)
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

    applyTitle(elem, info){
        elem.addEventListener('mouseover', (e) => {
            this.createTitle(info, e)
            e.stopPropagation()
        })
        elem.addEventListener('mouseleave' , () => {
            this.closeTitle()
        })
    }

    createStats(item: any){
        let wrap = document.createElement('div')
        wrap.className = 'stat_wrap'
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
    createBlock(item: any){
        
        let wrap = document.createElement('div')

        let left = this.createDiv('left_block')
        let right = this.createDiv('right_block')

        let stats = this.createStats(item)
        left.appendChild(stats)

        let select = this.createSelect(item.template)
        let preview = this.createImage('./preview/' + item.template.name + '.gif', 160, 160)

        let right_top = this.createDiv('right_top')
    
        let select_preview = this.createDiv('select_and_preview')

        let ready = this.createParagraph('ready')

        if(item.ready){
            ready.style.backgroundColor = 'green'
        }
        else{
            ready.style.backgroundColor = 'red'
        }

        ready.addEventListener('click', () => {
            this.socket.emit('player_ready')
        })
        ready.style.width = '100%'

        select_preview.appendChild(preview)
       
        right_top.appendChild(select_preview)

        let select_ready_equip = this.createDiv('select_ready_equip')

        select_ready_equip.appendChild(select)

        let div = this.createDiv('equip_and_image')
        let e_p = this.createParagraph("equip: ")
        div.appendChild(e_p)
        console.log(item)
        if(item.template.item){
            let image = this.createImage('./icons/' + item.template.item + '.png')
            this.applyTitle(image, {
                main_title: item.template.item,
                text: item.template.item_decription
            })
            image.addEventListener('click', () => {
                Sound.setSound('menu item drop')
                this.socket.emit('unpick_item', item.template.item)
            })
            
            div.appendChild(image)        
        }

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
        // fill a lobby
        let lobby = document.getElementById('lobby')
        
        if(!lobby) return
        
        lobby.innerHTML = ''

        //create cap(items and abilities)

        let players_items = data.map(elem => elem.template.item)

        // let lobby_cap = this.createDiv('lobby_cap')

        // items
        let items_div = this.createDiv('item_pull')

        items.forEach(item => {
            if(!players_items.includes(item.name)){
            
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
            }
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
            let block = this.createBlock(item)
            block.classList += 'player player' + (index + 1)
            lobby.appendChild(block)
        });
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
            text: status.description
        })
        
        div.appendChild(img)

        wrap?.appendChild(div)

        setTimeout(() => {
            if(div){
                div.parentNode?.removeChild(div)
                this.closeTitle()
            }
        }, status.duration)
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
            let under_div = document.createElement('div')
            under_div.className = 'underdiv'

            let img = this.createImage('./icons/' + elem.name + '.png', 80, 80)
            img.addEventListener('click', () => {
                this.socket.emit('select_upgrade', elem.name)
            })
            this.applyTitle(img, {
                main_title: elem.name,
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

        let grace_count = this.createParagraph(data.grace)

        wrap2.appendChild(grace_count)
        
        if(data.can_hold){
            let hold = this.createParagraph('hold')
            hold.addEventListener('click', () => {
                this.socket.emit('hold_grace')
            })
            wrap2.appendChild(hold)
        }

        let exit = this.createParagraph('exit')
        exit.addEventListener('click', () => {
            this.socket.emit('exit_grace')
        })

        wrap2.appendChild(exit)

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