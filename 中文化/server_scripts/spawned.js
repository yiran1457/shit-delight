EntityEvents.spawned(event => {
    if (event.entity.level.isOverworld()) {
        if (Math.random() < 0.1) {
            let WE = Math.floor(Math.random() * A.length)
            let selectedItem = A[WE]
            event.entity.setItemSlot("mainhand", selectedItem)
        }
        if (Math.random() < 0.1) {
            let WE = Math.floor(Math.random() * A.length)
            let selectedItem = A[WE]
            event.entity.setItemSlot("offhand", selectedItem)
        }
    }
    if (event.entity.level.dimension.getPath() == "twilight_forest"
        && event.entity.level.dimension.getPath() == "the_nether"
    ) {
        if (Math.random() < 0.1) {
            let WE = Math.floor(Math.random() * AA.length)
            let selectedItem = AA[WE]
            event.entity.setItemSlot("mainhand", selectedItem)
        }
        if (Math.random() < 0.1) {
            let WE = Math.floor(Math.random() * AA.length)
            let selectedItem = AA[WE]
            event.entity.setItemSlot("offhand", selectedItem)
        }
    }
    if (event.entity.level.dimension.getPath() == "the_end") {
        if (Math.random() < 0.1) {
            let WE = Math.floor(Math.random() * AAA.length)
            let selectedItem = AAA[WE]
            event.entity.setItemSlot("mainhand", selectedItem)
        }
        if (Math.random() < 0.1) {
            let WE = Math.floor(Math.random() * AAA.length)
            let selectedItem = AAA[WE]
            event.entity.setItemSlot("offhand", selectedItem)
        }
    }
})
const A = [
    "farmersdelight:diamond_knife", "farmersdelight:netherite_knife", "farmersdelight:iron_knife", "farmersdelight:golden_knife", "farmersdelight:skillet", "farmersdelight:flint_knife"
]
const AA = [
    "twilightdelight:fiery_knife", "twilightdelight:knightmetal_knife", "twilightdelight:ironwood_knife", "twilightdelight:steeleaf_knife"
]
const AAA = [
    "ends_delight:dragon_tooth_knife", "ends_delight:end_stone_knife", "ends_delight:dragon_egg_shell_knife", "ends_delight:purpur_knife"
]

