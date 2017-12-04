define(["require", "exports", "core/Ability", "core/Api", "core/Entities", "core/Entity"], function (require, exports, Ability_1, Api_1, Entities_1, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessageType;
    (function (MessageType) {
        MessageType[MessageType["Damage"] = 0] = "Damage";
        MessageType[MessageType["Magic"] = 1] = "Magic";
        MessageType[MessageType["Heal"] = 2] = "Heal";
        MessageType[MessageType["Fight"] = 3] = "Fight";
        MessageType[MessageType["Good"] = 4] = "Good";
        MessageType[MessageType["Bad"] = 5] = "Bad";
    })(MessageType = exports.MessageType || (exports.MessageType = {}));
    function getLetterPosition(letter) {
        if (letter == " ") {
            return undefined;
        }
        let index;
        if (isNaN(+letter)) {
            switch (letter) {
                case "+":
                    index = 36;
                    break;
                case "-":
                    index = 37;
                    break;
                case ".":
                    index = 38;
                    break;
                case "!":
                    index = 39;
                    break;
                default:
                    index = 10 + letter.toLowerCase().charCodeAt(0) - 97;
                    break;
            }
        }
        else {
            index = +letter;
        }
        return {
            x: index % 10,
            y: Math.floor(index / 10),
        };
    }
    function capitalize(text) {
        return text[0].toUpperCase() + text.slice(1);
    }
    class Readout {
        reset() {
            this.setMagic(0);
            this.setHealth(1, 1);
            this.setAbilities([]);
            const messages = document.getElementById("messages");
            messages.innerHTML = "";
            this.messagesEnabled = true;
        }
        setMagic(amt) {
            let lastAmount = 0;
            for (const l in Api_1.magicLevels) {
                const levelAmount = Api_1.magicLevels[l];
                const level = +l;
                const guage = document.querySelector(`guage[level="${Api_1.MagicLevel[level]}"]`);
                guage.style.setProperty("--amt", `${amt === 0 ? amt : Math.min(1, Math.max(0, (amt - lastAmount) / (levelAmount - lastAmount)))}`);
                lastAmount = levelAmount;
            }
        }
        setHealth(health, maxHealth) {
            const guage = document.querySelector("guage[level=\"Health\"]");
            guage.style.setProperty("--amt", `${health === 0 ? health : Math.min(1, Math.max(0, health / maxHealth))}`);
        }
        setAbilities(abilities) {
            const abilitiesElement = document.getElementById("abilities");
            for (let i = 0; i < 4; i++) {
                const slot = abilitiesElement.children[i];
                if (abilities[i]) {
                    slot.setAttribute("ability", Ability_1.AbilityType[abilities[i].type]);
                }
                else {
                    slot.removeAttribute("ability");
                }
            }
        }
        showNumber(type, amt, position) {
            const text = this.getText(type, `${amt > 0 ? "+" : ""}${amt.toFixed(1)}`);
            text.classList.add("slide", "color");
            text.style.top = `${position.y}px`;
            text.style.left = `${position.x}px`;
            document.getElementById("numbers").appendChild(text);
            setTimeout(() => {
                text.remove();
            }, 2000);
        }
        showMessage(type, text) {
            if (this.messagesEnabled) {
                const el = this.getText(type, text);
                const messages = document.getElementById("messages");
                messages.appendChild(el);
                if (messages.children.length > 5) {
                    messages.firstElementChild.remove();
                }
            }
        }
        disableMessages() {
            this.messagesEnabled = false;
        }
        showDamageResult(damageResult, type = MessageType.Damage) {
            const sourceName = this.getName(damageResult.source, true);
            const targetName = this.getName(damageResult.target);
            const sentences = [`${sourceName} hit ${targetName} for ${damageResult.amt.toFixed(1)}`];
            let and;
            if (damageResult.effectiveness != 0) {
                if (damageResult.effectiveness > 0) {
                    sentences.push("was effective");
                    and = true;
                }
                else {
                    sentences.push("was not effective");
                    and = false;
                }
            }
            switch (damageResult.crit) {
                case Entity_1.CritType.Fail:
                    sentences.push("was a critical failure!");
                    and = !and;
                    break;
                case Entity_1.CritType.Success:
                    sentences.push("was a critical success!");
                    break;
            }
            switch (sentences.length) {
                case 1:
                    this.showMessage(type, `${sentences[0]}.`);
                    return;
                case 2:
                    this.showMessage(type, `${sentences[0]}. It ${sentences[1]}${sentences[1].endsWith("!") ? "" : "."}`);
                    return;
                case 3:
                    this.showMessage(type, `${sentences[0]}. It ${sentences[1]} ${and ? "and" : "but"} it ${sentences[2]}`);
                    return;
            }
        }
        getName(entityType, shouldCapitalize = false) {
            if (shouldCapitalize) {
                return capitalize(this.getName(entityType));
            }
            switch (entityType) {
                case Entities_1.EntityType.EvilWizard: return "you";
                default: return `a ${Entities_1.EntityType[entityType]}`;
            }
        }
        getText(type, text) {
            text = text.replace(/\s+/g, " ").trim();
            const result = document.createElement("div");
            result.classList.add("text", MessageType[type].toLowerCase());
            for (const letter of text) {
                const l = document.createElement("div");
                l.classList.add("letter");
                if (letter.toLowerCase() == "i" || letter == "1") {
                    l.classList.add("i");
                }
                const position = getLetterPosition(letter);
                if (position) {
                    l.style.setProperty("--tilex", `${position.x}`);
                    l.style.setProperty("--tiley", `${position.y}`);
                }
                else {
                    l.classList.add("space");
                }
                result.appendChild(l);
            }
            return result;
        }
    }
    exports.Readout = Readout;
});
