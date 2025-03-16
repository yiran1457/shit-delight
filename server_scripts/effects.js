PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 119 === 0) {
        let RS = 0
        let item = player.enderChestInventory.getAllItems()
        item.forEach((item) => {
            let foodProps = item.getFoodProperties(player)
            if (!foodProps) return
            let Effects = foodProps.getEffects()
            if (!Effects) return
            Effects.forEach((Effects) => {
                if (RS >= Math.floor(PTYGY / 10) + 2) return
                let effectss = Effects.getFirst()
                let effects = effectss.effect
                let level = effectss.amplifier
                if (!player.hasEffect(effects)) {
                    player.potionEffects.add(effects, 119, level, true, false)
                    RS++
                }
            })
        })
    }
})
