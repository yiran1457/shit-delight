let $Screen = Java.loadClass("net.minecraft.client.gui.screens.Screen")
global.XJPM_新建屏幕 = (id,name)=>new JavaAdapter(
    $Screen,
    {
        id :id
    },
    Component.of(name)
)
