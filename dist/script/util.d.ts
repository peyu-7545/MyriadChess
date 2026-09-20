export declare class ObjectKeyMap<Key_t, Val_t> extends Map<unknown, Val_t> {
    #private;
    constructor(serializer: (obj: Key_t) => unknown);
    set(key: Key_t, value: Val_t): this;
    get(key: Key_t): Val_t | undefined;
    has(key: Key_t): boolean;
    delete(key: Key_t): boolean;
}
//# sourceMappingURL=util.d.ts.map