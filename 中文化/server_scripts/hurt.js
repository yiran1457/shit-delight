
EntityEvents.hurt(event => {
    let entity = event.entity
    let VA = Math.floor((磐石之根总值 + 风之轻语总值 + 星火熔炉总值 + 森灵秘语总值 + 匠魂飨宴总值 + 虚空遗尘总值) * (100 - 腐嗅噬心总值 * 1.5) / 100)
    if (entity && entity.isPlayer()) {
        let damageValue = event.damage
        if (damageValue !== 0) {
            消化进度 += Math.floor(damageValue * VA)
        }
    }
    if (event.source.actual && event.source.actual.isPlayer()) {
        let damageValue = event.damage
        if (damageValue !== 0) {
            消化进度 += Math.floor(damageValue * VA * 0.1)
        }
    }
});

EntityEvents.hurt(event => {
    let attacker = event.source.getActual();
    if (!attacker) return
    if (!attacker.isPlayer()) return
    if (!attacker.tags.contains("刀") && attacker.isPlayer() || event.source.isIndirect()) {
        event.cancel()
    }
});

EntityEvents.hurt(event => {
    event.entity.invulnerableTime = 0
});

PlayerEvents.tick(event => {
    let player = event.player
    let offhandItem = event.player.offhandItem
    let mainhandItem = event.player.mainHandItem
    player.tags.add("刀")
    if (offhandItem.hasTag('minecraft:tools') || mainhandItem.hasTag('minecraft:tools')) {
        player.tags.remove("刀")
    }
    if (!mainhandItem.hasTag('forge:tools/knives')) {
        player.tags.remove("刀")
    }
})






