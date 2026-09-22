export class ObjectKeyMap<Key_t, Val_t> extends Map<unknown, Val_t> {
    #serializer;

    constructor(serializer: (obj: Key_t) => unknown) {
        super();
        this.#serializer = serializer;
    }

    override set(key: Key_t, value: Val_t) {
        return super.set(this.#serializer(key), value);
    }
    
    override get(key: Key_t) {
        return super.get(this.#serializer(key));
    }

    override has(key: Key_t) {
        return super.has(this.#serializer(key));
    }

    override delete(key: Key_t) {
        return super.delete(this.#serializer(key));
    }
}