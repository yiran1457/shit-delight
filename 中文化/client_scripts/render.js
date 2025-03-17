ItemEvents.tooltip(event => {
    const TAG_CONFIGS = [
        { tag: 'GXZM', color: '§a', name: '果香织梦', counts: false },
        { tag: 'brewinandchewin:fermented_drinks', color: '§4', name: '莓酿离歌', counts: false },
        { tag: 'XKHX', color: '§5', name: '虚空遗尘', counts: true },
        { tag: 'JHXY', color: '§6', name: '匠魂飨宴', counts: true },
        { tag: 'SLMY', color: '§2', name: '森灵秘语', counts: true },
        { tag: 'XHRL', color: '§c', name: '星火熔炉', counts: true },
        { tag: 'JFZS', color: '§b', name: '风之轻语', counts: true },
        { tag: 'PSZG', color: '§8', name: '磐石之根', counts: true },
        { tag: 'TYGY', color: '§9', name: '餮魇归一', counts: false },
        { tag: 'shit', color: '§6', name: '腐嗅噬心', counts: false },
        { tag: 'FSNJ', color: '§3', name: '潜渊共鸣', counts: false }
    ];

    Ingredient.all.getItemIds().forEach(itemId => {
        let itemStack = Item.of(itemId);
        if (!itemStack.edible) return;

        let foodProps = itemStack.getFoodProperties(null);
        if (!foodProps) return;

        let effectiveFM = TAG_CONFIGS.reduce((count, config) =>
            (config.counts && itemStack.hasTag(config.tag)) ? count + 1 : count, 0);

        let baseValue = Math.floor(
            (foodProps.getNutrition() + foodProps.getSaturationModifier() * 0.5) /
            Math.max(effectiveFM, 1) + 1
        );

        TAG_CONFIGS.forEach(config => {
            if (itemStack.hasTag(config.tag)) {
                event.add(itemId, `${config.color}${config.name} §7${baseValue}`);
            }
        });
    });



    event.add('kubejs:magnifying_glass',"§6使用查看胃袋空间，潜行获取总属性")
});
