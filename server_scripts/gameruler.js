BlockEvents.broken(event => {
    let block = event.block.blockState
    if (!event.player.hasCorrectToolForDrops(block)) {
        let drops = event.block.getDrops()
        drops.forEach(item => {
            event.block.popItem(item)
        })
        time += Math.floor((PPSZG + PJFZS + PXHRL + PSLMY + PJHXY + PXKHX) * (100 - FXSX * 1.5) / 100) * 0.1
    }
})

PlayerEvents.tick(event => {
    event.player.damageEquipment("chest", 1)
    event.player.damageEquipment("feet", 1)
    event.player.damageEquipment("head", 1)
    event.player.damageEquipment("legs", 1)
})

const WEA = [
    "farmersdelight:diamond_knife", "farmersdelight:netherite_knife",
    "farmersdelight:iron_knife", "farmersdelight:golden_knife",
    "farmersdelight:skillet", "farmersdelight:flint_knife",
    "twilightdelight:fiery_knife", "twilightdelight:knightmetal_knife",
    "twilightdelight:ironwood_knife", "twilightdelight:steeleaf_knife",
    "ends_delight:dragon_tooth_knife", "ends_delight:end_stone_knife",
    "ends_delight:dragon_egg_shell_knife", "ends_delight:purpur_knife"
];
PlayerEvents.tick(event => {
    let player = event.player;
    let mainHandItem = player.mainHandItem;
    if (mainHandItem.damageValue && !WEA.includes(mainHandItem.id)) {
        mainHandItem.damageValue += mainHandItem.getMaxDamage() - mainHandItem.damageValue
    }
    let offHandItem = player.offHandItem;
    if (offHandItem.damageValue && !WEA.includes(offHandItem.id)) {
        offHandItem.damageValue += offHandItem.getMaxDamage() - offHandItem.damageValue
    }
});
