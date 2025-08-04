import Sound from "./Sound.js";
export default class UI {
    socket;
    constructor(socket) {
        this.socket = socket;
    }
    createImage(path, width = 50, height = 50) {
        let image = new Image();
        image.width = width;
        image.height = height;
        image.src = path;
        return image;
    }
    updateSkill(data) {
        let skill_icons = document.getElementById('skill_icons');
        skill_icons.innerHTML = '';
        data.forEach(elem => {
            let img = this.createImage('./icons/' + elem.name + '.png');
            img.id = elem.type;
            skill_icons.appendChild(img);
        });
    }
    createParagraph(text) {
        let p = document.createElement('p');
        p.innerText = text;
        return p;
    }
    createAvailableSkillsBlock(skills, title) {
        let div = document.createElement('div');
        let p = this.createParagraph(title);
        div.appendChild(p);
        let div_wrap = document.createElement('div');
        skills.forEach(elem => {
            let image = this.createImage('./icons/' + elem.name + '.png');
            image.style.margin = '2px';
            image.addEventListener('click', () => {
                Sound.setSound('taunt');
                this.socket.emit('select_skill', elem.name);
            });
            image.title = elem.desc;
            div.appendChild(image);
            div_wrap.appendChild(div);
        });
        return div_wrap;
    }
    createDiv(classes) {
        let div = document.createElement('div');
        div.className += classes;
        return div;
    }
    getSelectedSkillByType(abilities, type) {
        return abilities.find(elem => elem.type === type && elem.selected);
    }
    createParagraphAppend(text, parent) {
        let p = this.createParagraph(text);
        parent.appendChild(p);
    }
    createSelect(item) {
        let select = document.getElementById('select_template').cloneNode(true);
        select.style.visibility = 'visible';
        select.addEventListener('change', (e) => {
            this.socket.emit('change_class', e.target.value);
        });
        select.value = item.name;
        return select;
    }
    createStats(item) {
        let wrap = document.createElement('div');
        wrap.className = 'stat_wrap';
        this.createParagraphAppend(item.template.stat_count, wrap);
        for (let stat in item.template.stats) {
            let dec = this.createParagraph('-');
            dec.className = 'pointer';
            dec.addEventListener('click', () => {
                if (item.template.stats[stat] <= 0)
                    return;
                Sound.setSound('menu button');
                this.socket.emit('decrease_stat', stat);
            });
            let stat_name = this.createParagraph(stat + ' : ' + item.template.stats[stat]);
            stat_name.title = item.template.stats_description[stat];
            let inc = this.createParagraph('+');
            inc.className = 'pointer';
            inc.addEventListener('click', () => {
                if (item.template.stat_count <= 0)
                    return;
                Sound.setSound('menu button 2');
                this.socket.emit('increase_stat', stat);
            });
            let div = document.createElement('div');
            div.className = 'stat';
            if (item.id === this.socket.id) {
                div.append(dec);
            }
            div.append(stat_name);
            if (item.id === this.socket.id) {
                div.append(inc);
            }
            wrap?.appendChild(div);
        }
        return wrap;
    }
    createBlock(item) {
        let wrap = document.createElement('div');
        let left = this.createDiv('left_block');
        let right = this.createDiv('right_block');
        let stats = this.createStats(item);
        left.appendChild(stats);
        let select = this.createSelect(item.template);
        let preview = this.createImage('./preview/' + item.template.name + '.gif', 160, 160);
        let right_top = this.createDiv('right_top');
        let select_preview = this.createDiv('select_and_preview');
        let ready = this.createParagraph('ready');
        if (item.ready) {
            ready.style.backgroundColor = 'green';
        }
        else {
            ready.style.backgroundColor = 'red';
        }
        ready.addEventListener('click', () => {
            this.socket.emit('player_ready');
        });
        select_preview.appendChild(select);
        select_preview.appendChild(preview);
        select_preview.appendChild(ready);
        right_top.appendChild(select_preview);
        if (item.template.item) {
            let image = this.createImage('./icons/' + item.template.item + '.png');
            image.addEventListener('click', () => {
                Sound.setSound('menu item drop');
                this.socket.emit('unpick_item', item.template.item);
            });
            right_top.appendChild(image);
        }
        right.appendChild(right_top);
        let skills = this.createDiv('right_bottom');
        let main = this.getSelectedSkillByType(item.template.abilities, 1);
        let second = this.getSelectedSkillByType(item.template.abilities, 2);
        let third = this.getSelectedSkillByType(item.template.abilities, 3);
        let utility = this.getSelectedSkillByType(item.template.abilities, 4);
        let main_div = this.createDiv('selected_skill_div');
        let p = this.createParagraph('main: ' + main.name);
        let image = this.createImage('./icons/' + main.name + '.png');
        image.title = main.desc;
        main_div.appendChild(p);
        main_div.appendChild(image);
        skills.appendChild(main_div);
        let second_div = this.createDiv('selected_skill_div');
        p = this.createParagraph('secondary: ' + second.name);
        image = this.createImage('./icons/' + second.name + '.png');
        image.title = second.desc;
        second_div.appendChild(p);
        second_div.appendChild(image);
        skills.appendChild(second_div);
        let third_div = this.createDiv('selected_skill_div');
        p = this.createParagraph('finisher: ' + third.name);
        image = this.createImage('./icons/' + third.name + '.png');
        image.title = third.desc;
        third_div.appendChild(p);
        third_div.appendChild(image);
        skills.appendChild(third_div);
        let utility_div = this.createDiv('selected_skill_div');
        p = this.createParagraph('utility: ' + utility.name);
        image = this.createImage('./icons/' + utility.name + '.png');
        image.title = utility.desc;
        utility_div.appendChild(p);
        utility_div.appendChild(image);
        skills.appendChild(utility_div);
        right.appendChild(skills);
        wrap.append(left);
        wrap.append(right);
        return wrap;
    }
    showGameCanvas(players_data) {
        let section = document.getElementById('lobby');
        section?.parentNode?.removeChild(section);
        let players_skills = players_data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => elem.selected);
        let skill_icons = document.getElementById('skill_icons');
        skill_icons.innerHTML = '';
        players_skills.forEach(elem => {
            let img = this.createImage('./icons/' + elem.name + '.png');
            if (elem.type === 1) {
                img.id = 'first';
            }
            if (elem.type === 2) {
                img.id = 'secondary';
            }
            if (elem.type === 3) {
                img.id = 'finisher';
            }
            if (elem.type === 4) {
                img.id = 'utility';
            }
            skill_icons.appendChild(img);
        });
        section = document.getElementById('canvas-wrap');
        section.style.visibility = 'visible';
    }
    updateStats(data, items) {
        let parent = document.getElementById('lobby');
        parent.innerHTML = '';
        data.sort((a, b) => {
            return a.id === this.socket.id ? -1 : 1;
        });
        data.forEach((item, index) => {
            let block = this.createBlock(item);
            block.classList += 'player player' + (index + 1);
            parent?.appendChild(block);
        });
        let players_items = data.map(elem => elem.template.item);
        let item_div = document.createElement('div');
        item_div.className += 'item_pull';
        let available_items = this.createDiv('items');
        let p = this.createParagraph('available items: ');
        items.forEach(item => {
            if (!players_items.includes(item.name)) {
                let image = this.createImage('./icons/' + item.name + '.png');
                image.title = item.description;
                image.style.margin = '2px';
                image.addEventListener('click', () => {
                    Sound.setSound('menu item take');
                    this.socket.emit('pick_item', item.name);
                });
                available_items.appendChild(image);
            }
        });
        item_div.appendChild(p);
        item_div.appendChild(available_items);
        let avalable_main_skills = data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => !elem.selected && elem.type === 1);
        let avalable_secondary_skills = data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => !elem.selected && elem.type === 2);
        let avalable_finishers_skills = data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => !elem.selected && elem.type === 3);
        let avalable_utility_skills = data.find(elem => elem.id === this.socket.id).template.abilities.filter(elem => !elem.selected && elem.type === 4);
        let wrap = this.createDiv('');
        wrap.appendChild(this.createAvailableSkillsBlock(avalable_main_skills, 'available main skills: '));
        wrap.appendChild(this.createAvailableSkillsBlock(avalable_secondary_skills, 'available secondary skills: '));
        wrap.appendChild(this.createAvailableSkillsBlock(avalable_finishers_skills, 'available finishers skills: '));
        wrap.appendChild(this.createAvailableSkillsBlock(avalable_utility_skills, 'available utility skills: '));
        item_div.appendChild(wrap);
        parent?.appendChild(item_div);
    }
    newStatus(status) {
        let exist = document.getElementById('status_' + status.name);
        if (exist) {
            exist.parentNode?.removeChild(exist);
        }
        let wrap = document.getElementById('status');
        let div = document.createElement('div');
        div.id = 'status_' + status.name;
        let img = this.createImage('./icons/' + status.name + '.png');
        img.title = status.desc;
        div.appendChild(img);
        wrap?.appendChild(div);
        setTimeout(() => {
            if (div) {
                div.parentNode?.removeChild(div);
            }
        }, status.duration);
    }
    showUpgrades(data) {
        let exist = document.getElementById('upgrades');
        if (exist) {
            return;
        }
        let parrent = document.createElement('div');
        let wrap = document.createElement('div');
        wrap.id = 'upgrades_list';
        parrent.id = 'upgrades';
        data.upgrades.forEach(elem => {
            let div = document.createElement('div');
            let under_div = document.createElement('div');
            under_div.className = 'underdiv';
            let img = this.createImage('./icons/' + elem.name + '.png', 80, 80);
            img.addEventListener('click', () => {
                this.socket.emit('select_upgrade', elem.name);
            });
            img.title = elem.desc;
            under_div.appendChild(img);
            let cost_and_name = document.createElement('div');
            let p_name = this.createParagraph(elem.name);
            let p_cost = this.createParagraph(elem.cost);
            cost_and_name.appendChild(p_name);
            cost_and_name.appendChild(p_cost);
            div.appendChild(under_div);
            div.appendChild(cost_and_name);
            wrap.appendChild(div);
        });
        parrent.appendChild(wrap);
        let wrap2 = document.createElement('div');
        let grace_count = this.createParagraph(data.grace);
        wrap2.appendChild(grace_count);
        if (data.grace > 0) {
            let hold = this.createParagraph('hold');
            hold.addEventListener('click', () => {
                this.socket.emit('hold_grace');
            });
            wrap2.appendChild(hold);
        }
        parrent.appendChild(wrap2);
        document.getElementsByTagName('body')[0].appendChild(parrent);
    }
    clsoeUpgrades() {
        let exist = document.getElementById('upgrades');
        if (exist) {
            exist.parentNode?.removeChild(exist);
        }
    }
}
