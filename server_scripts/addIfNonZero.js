const addIfNonZero = (color, name, value) => {
    if (value !== 0) {
        return `${color}${name}§7${value}`;
    }
    return null;
};
ItemEvents.rightClicked(event => {
    const player = event.player;
    if (player.shiftKeyDown && player.mainHandItem.id == "kubejs:magnifying_glass") {
        (() => {
            const lines = [
                "==便携性胃镜==",
                addIfNonZero("", "每分钟消化数", Math.floor(6000 / (30000 / ((PPSZG + PJFZS + PXHRL + PSLMY + PJHXY + PXKHX) * (100 - FXSX*1.5) / 100))) / 100),
                addIfNonZero("§8", "磐石之根", PPSZG),
                addIfNonZero("§b", "风之轻语", PJFZS),
                addIfNonZero("§c", "星火熔炉", PXHRL),
                addIfNonZero("§2", "森灵秘语", PSLMY),
                addIfNonZero("§6", "匠魂飨宴", PJHXY),
                addIfNonZero("§5", "虚空遗尘", PXKHX),
                addIfNonZero("§a", "果香织梦", PGXZM),
                addIfNonZero("§4", "莓酿离歌", MNLG),
                addIfNonZero("§9", "餮魇归一", PTYGY),
                addIfNonZero("§6", "腐嗅噬心", FXSX),,
                addIfNonZero("§3", "潜渊共鸣", FSNJ),
            ];

            const filtered = lines.filter(line => line !== null);
            if (filtered.length > 1) {
                player.tell(filtered.join("\n"));
            }else{
                player.setStatusMessage("§6胃里空空如也");
            }
        })();
    }
    if(!player.shiftKeyDown && player.mainHandItem.id == "kubejs:magnifying_glass"){
        player.openInventoryGUI(event.player.enderChestInventory,Component.translatable("胃"))
    }
});

BlockEvents.rightClicked("ender_chest",event=>{
    event.cancel()
})