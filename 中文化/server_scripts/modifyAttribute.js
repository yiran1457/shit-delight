let 上次胃中物品 = []
let 生命类属性 = 0
let 防御类属性 = 0
let 速度类属性 = 0
let 攻击类属性 = 0
let 恢复类属性 = 0
let 采掘类属性 = 0
let 磐石之根总值 = 0
let 风之轻语总值 = 0
let 星火熔炉总值 = 0
let 森灵秘语总值 = 0
let 匠魂飨宴总值 = 0
let 虚空遗尘总值 = 0
let 果香织梦总值 = 0
let 莓酿离歌总值 = 0
let 上一次莓酿离歌总值 = 0
let 餮魇归一总值 = 0
let 腐嗅噬心总值 = 0
let 潜渊共鸣总值 = 0
//果香织梦
PlayerEvents.tick(event => {
    if (果香织梦总值 !== 0 && event.player.age % 20 === 0) {
        //恢复饥饿值饱和度
        event.player.addFood(Math.max(果香织梦总值 * 0.1, 1), Math.max(果香织梦总值 * 0.2, 1))
        //修复武器
        let M = event.player.mainHandItem.damageValue
        let O = event.player.offHandItem.damageValue
        if (M !== 0 && WEA.includes(event.player.mainHandItem.id)) {
            event.player.mainHandItem.damageValue -= 果香织梦总值
            event.player.USE.damageValue -= 果香织梦总值
        }
        if (O !== 0 && WEA.includes(event.player.offHandItem.id)) {
            event.player.offHandItem.damageValue -= 果香织梦总值
        }
    }
})
//潜渊共鸣
EntityEvents.hurt(event => {
    let attacker = event.source.getActual();
    if (attacker && attacker.isPlayer()) {
        if (潜渊共鸣总值 == 0) return
        let { x, y, z } = event.entity
        let entity = event.entity
        let damage = event.damage * 潜渊共鸣总值 * 0.05//计算伤害
        let R = Math.floor(潜渊共鸣总值 * 0.05) + 1//计算范围
        let aabb = AABB.of(
            x - R,
            y - R,
            z - R,
            x + R,
            y + R,
            z + R
        )
        Utils.server.scheduleInTicks(4, () => {
            let EntitiesWithin = entity.getLevel().getEntitiesWithin(aabb)
            EntitiesWithin.forEach(entity => {
                if (entity.isPlayer() || !entity.isLiving()) return
                entity.invulnerableTime = 0
                entity.attack(damage)
                消化进度 += Math.floor(damage)
                Utils.server.scheduleInTicks(4, () => {
                    entity.invulnerableTime = 0
                    entity.attack(damage)
                    消化进度 += Math.floor(damage)
                })
            })
        })
    }
});

PlayerEvents.tick(event => {
    let player = event.player
    let item = player.enderChestInventory.getAllItems()
    let 当前胃中物品 = item.toString()
    //重生登录或胃中食物变动，重新计算属性
    if (当前胃中物品 !== 上次胃中物品 || respawned) {
        上次胃中物品 = 当前胃中物品
        respawned = false
        生命类属性 = 0
        防御类属性 = 0
        速度类属性 = 0
        攻击类属性 = 0
        恢复类属性 = 0
        采掘类属性 = 0
        莓酿离歌总值 = 0
        磐石之根总值 = 0
        风之轻语总值 = 0
        星火熔炉总值 = 0
        森灵秘语总值 = 0
        匠魂飨宴总值 = 0
        虚空遗尘总值 = 0
        果香织梦总值 = 0
        餮魇归一总值 = 0
        腐嗅噬心总值 = 0
        潜渊共鸣总值 = 0
        item.forEach((item) => {
            //让胃中堆叠为1
            let count = item.count
            if (count > 1) {
                item.shrink(count - 1)
                player.give(Item.of(item, count - 1))
            }
            //食物属性值计算
            let FM = 0;
            const tags = ["XKHX", "JHXY", "SLMY", "XHRL", "JFZS", "PSZG"];
            tags.forEach(tag => {
                if (item.hasTag(tag)) FM++;
            });
            let foodProps = item.getFoodProperties(player)
            if (!foodProps) return
            let 食物营养总价值 = Math.floor((foodProps.getNutrition() + foodProps.getSaturationModifier() * 0.5) / Math.max(FM, 1) + 1);

            //食物属性值权重分配
            const 食物属性配置 = [
                { 标签: "PSZG", 属性名称: "磐石之根" },
                { 标签: "JFZS", 属性名称: "风之轻语" },
                { 标签: "XHRL", 属性名称: "星火熔炉" },
                { 标签: "SLMY", 属性名称: "森灵秘语" },
                { 标签: "JHXY", 属性名称: "匠魂飨宴" },
                { 标签: "XKHX", 属性名称: "虚空秘语" },
                { 标签: "GXZM", 属性名称: "果香织梦" },
                { 标签: "brewinandchewin:fermented_drinks", 属性名称: "莓酿离歌" },
                { 标签: "TYGY", 属性名称: "餮魇归一" },
                { 标签: "shit", 属性名称: "腐嗅噬心" },
                { 标签: "QYGM", 属性名称: "潜渊共鸣" }
            ];
            食物属性配置.forEach(配置 => {
                if (item.hasTag(配置.标签)) {
                    配置.属性名称 += 食物营养总价值
                }
            })
        })
        生命类属性 = 磐石之根总值 * 0.3 + 风之轻语总值 * 0.6 + 星火熔炉总值 * 0.4 + 森灵秘语总值 * 0.8 + 匠魂飨宴总值 * 0.2 + 虚空遗尘总值 * 1;
        防御类属性 = 磐石之根总值 * 0.9 + 风之轻语总值 * -0.3 + 星火熔炉总值 * 0 + 森灵秘语总值 * 0.2 + 匠魂飨宴总值 * 0 + 虚空遗尘总值 * 0.2;
        速度类属性 = 磐石之根总值 * -0.2 + 风之轻语总值 * 1.2 + 星火熔炉总值 * -0.8 + 森灵秘语总值 * 0.1 + 匠魂飨宴总值 * 0 + 虚空遗尘总值 * 0.2;
        攻击类属性 = 磐石之根总值 * 0.1 + 风之轻语总值 * -0.5 + 星火熔炉总值 * 1.5 + 森灵秘语总值 * -0.3 + 匠魂飨宴总值 * 0.4 + 虚空遗尘总值 * 0.2;
        恢复类属性 = 磐石之根总值 * 0.4 + 风之轻语总值 * 0.2 + 星火熔炉总值 * 0 + 森灵秘语总值 * 1.2 + 匠魂飨宴总值 * -0.2 + 虚空遗尘总值 * 0.2;
        采掘类属性 = 磐石之根总值 * 0 + 风之轻语总值 * 0 + 星火熔炉总值 * 0.3 + 森灵秘语总值 * 0 + 匠魂飨宴总值 * 1.1 + 虚空遗尘总值 * 0.2;
        //属性加成
        生命类属性 *= 0.02
        防御类属性 *= 0.02
        速度类属性 *= 0.02
        攻击类属性 *= 0.02
        恢复类属性 *= 0.02
        采掘类属性 *= 0.02

        const 属性配置 = {
            生命类属性: [
                "minecraft:generic.max_health",
                "additionalentityattributes:lung_capacity",
                "additionalentityattributes:dig_speed",
                "attributeslib:healing_received"
            ],
            防御类属性: [
                "minecraft:generic.armor",
                "minecraft:generic.armor_toughness",
                "minecraft:generic.knockback_resistance",
                "attributeslib:prot_pierce",
                "additionalentityattributes:magic_protection"
            ],
            速度类属性: [
                "minecraft:generic.movement_speed",
                "additionalentityattributes:water_speed",
                "additionalentityattributes:lava_speed",
                "minecraft:generic.flying_speed",
                "forge:swim_speed"
            ],
            攻击类属性: [
                "minecraft:generic.attack_damage",
                "minecraft:generic.attack_speed",
                "attributeslib:crit_chance",
                "attributeslib:crit_damage",
                "attributeslib:armor_pierce",
                "attributeslib:life_steal"
            ],
            恢复类属性: [
                "attributeslib:overheal",
                "attributeslib:healing_received",
                "zombie.spawn_reinforcements",
                "additionalentityattributes:bonus_loot_count_rolls",
                "minecraft:generic.luck"
            ],
            采掘类属性: [
                "additionalentityattributes:dig_speed",
                "attributeslib:mining_speed",
                "additionalentityattributes:bonus_rare_loot_rolls",
                "attributeslib:experience_gained"
            ]
        };
        属性配置.恢复类属性.forEach(属性 => {
            player.modifyAttribute(属性, "胃", 恢复类属性, "multiply_base")
        })
        属性配置.攻击类属性.forEach(属性 => {
            player.modifyAttribute(属性, "胃", 攻击类属性, "multiply_base")
        })
        属性配置.生命类属性.forEach(属性 => {
            player.modifyAttribute(属性, "胃", 生命类属性, "multiply_base")
        })
        属性配置.速度类属性.forEach(属性 => {
            player.modifyAttribute(属性, "胃", 速度类属性, "multiply_base")
        })
        属性配置.采掘类属性.forEach(属性 => {
            player.modifyAttribute(属性, "胃", 采掘类属性, "multiply_base")
        })
        属性配置.防御类属性.forEach(属性 => {
            player.modifyAttribute(属性, "胃", 防御类属性, "multiply_base")
        })


        player.modifyAttribute("forge:block_reach", "胃", 采掘类属性 * 0.07, "multiply_base")
        player.modifyAttribute("forge:entity_reach", "胃", 采掘类属性 * 0.09, "multiply_base")
        //确保玩家在空中时属性变动不会坠机
        if (莓酿离歌总值 == 0 && 上一次莓酿离歌总值 > 0 || 莓酿离歌总值 > 0 && 上一次莓酿离歌总值 == 0) {
            player.modifyAttribute("attributeslib:creative_flight", "莓酿离歌", 莓酿离歌总值 * 0.01, "addition")
            上一次莓酿离歌总值 = 莓酿离歌总值
        }
    }
})

const 初始化属性表 = [
    "minecraft:generic.attack_knockback",
    "additionalentityattributes:lung_capacity",
    "additionalentityattributes:dig_speed",
    "additionalentityattributes:bonus_loot_count_rolls",
    "additionalentityattributes:dropped_experience",
    "additionalentityattributes:magic_protection",
    "attributeslib:life_steal",
    "attributeslib:overheal",
    "attributeslib:prot_pierce"
];
//在重生和登录时使用，为玩家提供可以被加成的基础数值，同时检测一次玩家的胃
let respawned = false
PlayerEvents.respawned(event => {
    初始化属性(event)
})
PlayerEvents.loggedIn(event => {
    初始化属性(event)
})

function 初始化属性(event) {
    初始化属性表.forEach(attribute => {
        event.player.modifyAttribute(attribute, "基础值", 0.05, "addition");
    });
    event.player.modifyAttribute("attributeslib:prot_pierce", "基础值", 4, "addition");
    event.player.modifyAttribute("attributeslib:armor_pierce", "基础值", 4, "addition");
    event.player.modifyAttribute("minecraft:generic.luck", "基础值", 4, "addition");
    event.player.modifyAttribute("minecraft:generic.armor", "基础值", 4, "addition");
    event.player.modifyAttribute("minecraft:generic.armor_toughness", "基础值", 2, "addition");
    respawned = true
}















