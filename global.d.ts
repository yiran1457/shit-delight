declare const global: MyGlobal
declare const NativeEvents: MyNativeEvents

class MyGlobal {
    jeiRuntime: Internal.JeiRuntime
    createNewScreen(screen:Internal.Screen,id: number,name:string): Internal.Screen
    drawLine(guiGraphics:Internal.GuiGraphics, poseStack:Internal.PoseStack, x1:number, y1:number, x2:number, y2:number, w:number, color:number):void
    hello(): string
}

class MyNativeEvents {
    onEvent: <T extends typeof $Event<(any) >>(eventClass: T, consumer: (event: InstanceType<(T)>) => void) => void;


    onGenericEvent(genericClassFilter: Internal.ClassConvertible_, priority: Internal.EventPriority_, receiveCancelled: boolean, type: Internal.ClassConvertible_, handler: Internal.WrappedGenericEventHandler_): void;
    onGenericEvent(genericClassFilter: Internal.ClassConvertible_, type: Internal.ClassConvertible_, handler: Internal.WrappedGenericEventHandler_): void;
    onGenericEventTyped<T extends Internal.GenericEvent<any>, F>(genericClassFilter: F, priority: Internal.EventPriority_, receiveCancelled: boolean, eventType: T, handler: Internal.Consumer_<T>): void;
    onEventTyped<T extends Internal.Event>(priority: Internal.EventPriority_, receiveCancelled: boolean, eventType: T, handler: Internal.Consumer_<T>): void;
    onEvent(priority: Internal.EventPriority_, receiveCancelled: boolean, type: Internal.ClassConvertible_, handler: Internal.WrappedEventHandler_): void;
}
